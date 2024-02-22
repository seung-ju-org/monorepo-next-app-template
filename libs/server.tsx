import React from 'react';
import Server from '@seung-ju/next/server';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
import { getServerSession } from '#libs/next-auth';

export interface Options {
  auth?: boolean;
  redirectUrl?: string;
}

export interface PageProps<P = Record<any, string>> {
  params?: P;
  searchParams: URLSearchParams;
  children?: React.ReactNode;
  url: URL;
}
export interface PageComponentProps<P = Record<any, string>>
  extends PageProps<P> {
  session: Session | null;
}

export type PageComponentType<P = Record<any, string>> = (
  props: PageComponentProps<P>,
) => React.ReactNode | Promise<React.ReactNode>;

export function createPage<P = Record<any, string>>(
  Component: PageComponentType<P>,
  options?: Options,
) {
  return async function Page(props: any) {
    const session = await getServerSession();
    const url = new URL(headers().get('x-url') ?? '');

    if (options?.auth) {
      if (!session?.user) {
        const redirectUrl = options.redirectUrl ?? url ?? '/';
        redirect(`/auth/signin?redirectUrl=${redirectUrl}`);
      }
    }

    return (
      <Component
        {...props}
        searchParams={url.searchParams}
        session={session}
        url={url}
      />
    );
  };
}

const server = Server.createInstance({
  debug: true,
  middlewares: [],
});

export default server;
