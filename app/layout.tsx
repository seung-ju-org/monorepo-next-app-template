import '#styles/globals.css';

import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '#app/providers';
import prisma from '#libs/prisma';
import { createPage } from '#libs/server';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const appConfig = await prisma.appConfig.findFirst({
    select: {
      faviconFileId: true,
      title: true,
      description: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return {
    title: appConfig?.title,
    description: appConfig?.description,
  };
}

export default createPage(function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
});
