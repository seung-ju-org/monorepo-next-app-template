import prisma from '#libs/prisma';
import filesDetailService from '#app/api/files/[id]/service';

export default async function Icon() {
  const appConfig = await prisma.appConfig.findFirst({
    select: {
      faviconFile: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  if (!appConfig?.faviconFile) {
    return null;
  }

  return filesDetailService.getFile(appConfig.faviconFile.id);
}
