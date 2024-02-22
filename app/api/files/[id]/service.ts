import { FileStatus, FileUploadLocation } from '@prisma/client';
import { ResponseEntity } from '@seung-ju/next/server';
import getS3 from '#aws/s3';
import prisma from '#libs/prisma';
import server from '#libs/server';

const filesDetailService = server.createService({
  async getFile(id: string) {
    const file = await prisma.file.findFirst({
      where: {
        id,
      },
    });
    if (!file || file.status !== FileStatus.DONE) {
      return new Response('Not found', {
        status: 404,
      });
    }
    switch (file.uploadLocation) {
      case FileUploadLocation.LOCAL:
        break;
      case FileUploadLocation.AWS_S3: {
        const s3 = await getS3();
        const object = await s3
          .getObject({
            Bucket: file.bucket as string,
            Key: `files/${file.serverPath}/${file.id}/source.${file.extension}`,
          })
          .promise();
        return new ResponseEntity(object.Body as BodyInit, {
          status: 200,
        });
      }
      default:
    }
    throw ResponseEntity.error(500, 'No Response');
  },
});

export default filesDetailService;
