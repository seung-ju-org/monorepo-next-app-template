import { AdminMenu } from '@prisma/client';
import prisma from '#libs/prisma';
import server from '#libs/server';
import AdminConfigMenuDto from './dto';

const adminConfigMenuService = server.createService({
  async save(data: AdminConfigMenuDto.SaveRequest) {
    await prisma.adminMenu.deleteMany();
    // @ts-ignore
    // eslint-disable-next-line no-inner-declarations
    async function recursive(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      request: AdminConfigMenuDto.SaveRequest,
      parent?: AdminMenu,
    ) {
      return Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        request.map(async ({ children, ...data }, dataIndex) => {
          const adminMenu = await prisma.adminMenu.create({
            data: {
              ...data,
              order: dataIndex + 1,
              parentId: parent?.id,
            },
          });
          if (children) {
            await recursive(children, adminMenu);
          }
        }),
      );
    }
    await recursive(data);
  },
});

export default adminConfigMenuService;
