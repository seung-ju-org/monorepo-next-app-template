import prisma from '#libs/prisma';
import { FileStatus, FileUploadLocation } from '@prisma/client';
import getS3 from '#aws/s3';
import sizeOf from 'image-size';
import mime from 'mime-types';
import path from 'path';
import dayjs from 'dayjs';
import server from '#libs/server';
import { ResponseEntity } from '@seung-ju/next/server';

const filesUploadsService = server.createService({
  async uploadFile(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const appConfig = await prisma.appConfig.findFirst({
      select: {
        isUseAwsS3: true,
        awsS3Bucket: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    const fileArrayBuffer = await file.arrayBuffer();
    const fileDimension = sizeOf(new Uint8Array(fileArrayBuffer));
    let fileEntity = await prisma.file.create({
      data: {
        name: file.name,
        contentType: mime.lookup(file.name) as string,
        status: FileStatus.READY,
        extension: path.extname(file.name),
        size: file.size,
        width: fileDimension.width,
        height: fileDimension.height,
        bucket: appConfig?.isUseAwsS3 ? appConfig?.awsS3Bucket : null,
        uploadLocation: appConfig?.isUseAwsS3
          ? FileUploadLocation.AWS_S3
          : FileUploadLocation.LOCAL,
        serverPath: dayjs().format('YYYY/MM'),
      },
    });
    if (appConfig?.isUseAwsS3) {
      if (appConfig.awsS3Bucket) {
        const s3 = await getS3();
        try {
          await s3
            .upload({
              Bucket: appConfig.awsS3Bucket,
              Key: `files/${fileEntity.serverPath}/${fileEntity.id}/source.${path.extname(file.name)}`,
              Body: Buffer.from(arrayBuffer),
            })
            .promise();
        } catch (error) {
          fileEntity.status = FileStatus.ERROR;
          await prisma.file.update({
            data: fileEntity,
            where: {
              id: fileEntity.id,
            },
          });
          throw ResponseEntity.error(500, 'Upload Error');
        }
      }
    }
    fileEntity.status = FileStatus.DONE;
    fileEntity = await prisma.file.update({
      data: fileEntity,
      where: {
        id: fileEntity.id,
      },
    });
    return fileEntity;
  },
});

export default filesUploadsService;
