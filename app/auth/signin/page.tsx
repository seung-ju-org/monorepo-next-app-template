import React from 'react';
import { createPage } from '#libs/server';
import Form from './form';

export default createPage(function Page({ searchParams }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form redirectUrl={searchParams?.get('redirectUrl') ?? '/'} />
    </div>
  );
});
