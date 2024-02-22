'use client';

import React from 'react';
import { Button, Checkbox, Form as AntdForm, Input, message } from 'antd';
import { signIn } from 'next-auth/react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface FieldType extends Pick<User, 'username' | 'password'> {
  remember?: string;
}

export interface FormProps {
  redirectUrl: string;
}

export default function Form({ redirectUrl }: FormProps) {
  const router = useRouter();
  return (
    <AntdForm
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={async (values) => {
        const signInResponse = await signIn('credentials', {
          ...values,
          redirect: false,
        });
        if (signInResponse) {
          if (signInResponse?.ok) {
            router.push(redirectUrl);
          } else {
            message.error(signInResponse.error);
          }
        }
      }}
      autoComplete="off"
    >
      <AntdForm.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </AntdForm.Item>
      <AntdForm.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </AntdForm.Item>
      <AntdForm.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </AntdForm.Item>
      <AntdForm.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </AntdForm.Item>
    </AntdForm>
  );
}
