'use client';

import React from 'react';
import { Button, Form as AntdForm, Input, message } from 'antd';
import { redirect } from 'next/navigation';
import Api from '#apis/api';
import AuthSignupDto from '#app/api/auth/signup/dto';

export default function Form() {
  const signupMutation = Api.Auth.Signup.Mutation.useSignupMutation();
  return (
    <AntdForm<AuthSignupDto.SignupRequest>
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={(values) => {
        signupMutation.mutate(values, {
          onSuccess() {
            message.success('Succeeded !');
            redirect('/auth/signin');
          },
          onError(error) {
            message.error(error?.response?.data?.data?.message);
          },
        });
      }}
      autoComplete="off"
    >
      <AntdForm.Item<AuthSignupDto.SignupRequest>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <Input />
      </AntdForm.Item>
      <AntdForm.Item<AuthSignupDto.SignupRequest>
        label="Nickname"
        name="nickname"
        rules={[{ required: true, message: 'Please input your nickname!' }]}
      >
        <Input />
      </AntdForm.Item>
      <AntdForm.Item<AuthSignupDto.SignupRequest>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </AntdForm.Item>
      <AntdForm.Item<AuthSignupDto.SignupRequest>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </AntdForm.Item>
      <AntdForm.Item<AuthSignupDto.SignupRequest>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </AntdForm.Item>
      <AntdForm.Item<AuthSignupDto.SignupRequest>
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={signupMutation.isPending}
        >
          Submit
        </Button>
      </AntdForm.Item>
    </AntdForm>
  );
}
