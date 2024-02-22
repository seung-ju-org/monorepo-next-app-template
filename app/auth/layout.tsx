import React from 'react';
import { redirect } from 'next/navigation';
import { createPage } from '#libs/server';

export default createPage(function Layout({ children, session, searchParams }) {
  if (session?.user) {
    redirect(searchParams.get('redirectUrl') ?? '/');
  }
  return children as React.JSX.Element;
});
