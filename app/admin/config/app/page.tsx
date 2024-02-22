import React from 'react';
import Form from '#app/admin/config/app/form';
import prisma from '#libs/prisma';

export default async function Page() {
  const appConfig = await prisma.appConfig.findFirst({
    select: {
      awsRegion: true,
      awsS3Bucket: true,
      isUseAwsS3: true,
      title: true,
      description: true,
      faviconFileId: true,
      faviconFile: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  return (
    <Form
      defaultFaviconFileList={
        appConfig?.faviconFile
          ? [
              {
                uid: appConfig.faviconFile.id,
                fileName: appConfig.faviconFile.name,
                name: appConfig.faviconFile.name,
                response: appConfig.faviconFile,
                status: 'done',
                url: `/api/files/${appConfig.faviconFile.id}`,
                thumbUrl: `/api/files/${appConfig.faviconFile.id}`,
                size: appConfig.faviconFile.size,
              },
            ]
          : []
      }
      initialValues={
        appConfig ?? {
          awsRegion: '',
          awsS3Bucket: '',
          isUseAwsS3: false,
          title: '',
          description: '',
          faviconFileId: null,
        }
      }
    />
  );
}
