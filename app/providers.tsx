'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>{children}</AntdRegistry>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
