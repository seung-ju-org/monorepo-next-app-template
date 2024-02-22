import React from 'react';
import { createPage } from '#libs/server';
import prisma from '#libs/prisma';
import Form, { DataType } from './form';

export default createPage(async function Page() {
  const adminMenus = await prisma.adminMenu.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: [
      {
        order: 'asc',
      },
    ],
  });

  return (
    <Form
      dataSource={(() => {
        function recursive(
          adminMenu: (typeof adminMenus)[0],
          adminMenuIndex: number,
          parentKey?: string,
        ): DataType {
          return {
            ...adminMenu,
            key: adminMenu.id,
            children: adminMenu.children?.map((child, childIndex) => {
              // @ts-ignore
              return recursive(child, childIndex, adminMenu.id);
            }),
            parentKey,
            order: adminMenuIndex + 1,
          };
        }
        return adminMenus.map((adminMenu, adminMenuIndex) => {
          return recursive(adminMenu, adminMenuIndex);
        });
      })()}
    />
  );
});
