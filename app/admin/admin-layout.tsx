'use client';

import React from 'react';
import { Layout, Menu, theme } from 'antd';
import * as Icons from '@ant-design/icons';
import { AdminMenu } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface AntdLayoutProps {
  adminMenus: (AdminMenu & { children?: AdminMenu[] })[];
  children?: React.ReactNode;
  defaultSelectedKeys?: string[];
}

function AdminLayout({
  children,
  defaultSelectedKeys,
  adminMenus,
}: AntdLayoutProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();

  return (
    <Layout className="h-screen w-screen">
      <Layout.Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={pathname
            .split('/')
            .reduce<string[]>((previousValue, currentValue, currentIndex) => {
              if (currentIndex > 0) {
                previousValue.push(
                  `${previousValue[previousValue.length - 1] ?? ''}/${currentValue}`,
                );
              }
              return previousValue;
            }, [])}
          defaultOpenKeys={defaultSelectedKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          items={adminMenus.map((adminMenu) => {
            // @ts-ignore
            const Icon = Icons[adminMenu.icon];
            return {
              key: adminMenu.url as string,
              label:
                (adminMenu.children?.length ?? 0) > 0 || !adminMenu.url ? (
                  adminMenu.name
                ) : (
                  <Link href={adminMenu.url}>{adminMenu.name}</Link>
                ),
              icon: Icon && <Icon />,
              children:
                (adminMenu.children?.length ?? 0) > 0
                  ? adminMenu.children?.map((child) => {
                      // @ts-ignore
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      const Icon = Icons[child.icon];
                      return {
                        key: child.url as string,
                        label: child.url ? (
                          <Link href={child.url}>{child.name}</Link>
                        ) : (
                          child.name
                        ),
                        icon: Icon && <Icon />,
                      };
                    })
                  : null,
            };
          })}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ padding: 0, background: colorBgContainer }} />
        <Layout.Content style={{ margin: '16px 24px 0', flex: '1' }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%',
              overflow: 'auto',
            }}
          >
            {children}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
