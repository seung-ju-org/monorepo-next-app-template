import React from 'react';
import AdminLayout from '#app/admin/admin-layout';
import { createPage } from '#libs/server';
import prisma from '#libs/prisma';

export default createPage(
  async function Layout({ children, url }) {
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
      <AdminLayout
        // @ts-ignore
        adminMenus={adminMenus}
        defaultSelectedKeys={url.pathname
          .split('/')
          .reduce<string[]>((previousValue, currentValue, currentIndex) => {
            if (currentIndex > 0) {
              previousValue.push(
                `${previousValue[previousValue.length - 1] ?? ''}/${currentValue}`,
              );
            }
            return previousValue;
          }, [])}
      >
        {children}
      </AdminLayout>
    );
  },
  {
    auth: true,
  },
);
