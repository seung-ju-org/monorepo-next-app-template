import AWS from 'aws-sdk';
import prisma from '#libs/prisma';

async function getAWS() {
  const appConfig = await prisma.appConfig.findFirstOrThrow({
    select: { awsRegion: true },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  if (appConfig.awsRegion) {
    AWS.config.update({ region: appConfig.awsRegion });
  }
  return AWS;
}

export default getAWS;
