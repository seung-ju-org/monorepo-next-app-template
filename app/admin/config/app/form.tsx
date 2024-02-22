'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form as AntdForm,
  Input,
  message,
  Row,
  Upload,
  UploadFile,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Api from '#apis/api';
import AdminConfigAppDto from '#app/api/admin/config/app/dto';

export interface FormProps {
  initialValues: AdminConfigAppDto.SaveRequest;
  defaultFaviconFileList: UploadFile[];
}

export default function Form({
  initialValues,
  defaultFaviconFileList,
}: FormProps) {
  const router = useRouter();
  const saveMutation = Api.Admin.Config.App.Mutation.useSaveMutation();

  return (
    <AntdForm<AdminConfigAppDto.SaveRequest>
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={(values) => {
        saveMutation.mutate(values, {
          onSuccess() {
            router.refresh();
            message.success('Saved !');
          },
          onError(error) {
            message.error(error?.response?.data?.data?.message);
          },
        });
      }}
      autoComplete="off"
    >
      <Collapse
        defaultActiveKey={['Metadata', 'AWS']}
        items={[
          {
            key: 'Metadata',
            label: 'Metadata',
            children: (
              <>
                <AntdForm.Item<AdminConfigAppDto.SaveRequest>
                  label="Favicon"
                  name="faviconFileId"
                  getValueFromEvent={(event) => {
                    return event.fileList[0]?.response?.id;
                  }}
                  valuePropName=""
                >
                  <Upload
                    action="/api/files/uploads"
                    maxCount={1}
                    listType="picture"
                    defaultFileList={defaultFaviconFileList}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </AntdForm.Item>
                <AntdForm.Item<AdminConfigAppDto.SaveRequest>
                  label="Title"
                  name="title"
                >
                  <Input placeholder="Input Title..." />
                </AntdForm.Item>
                <AntdForm.Item<AdminConfigAppDto.SaveRequest>
                  label="Description"
                  name="description"
                >
                  <Input placeholder="Input Description..." />
                </AntdForm.Item>
              </>
            ),
          },
          {
            key: 'AWS',
            label: 'AWS',
            children: (
              <>
                <AntdForm.Item<AdminConfigAppDto.SaveRequest>
                  name="isUseAwsS3"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Use AWS S3</Checkbox>
                </AntdForm.Item>
                <AntdForm.Item<AdminConfigAppDto.SaveRequest>
                  label="AWS Region"
                  name="awsRegion"
                >
                  <Input placeholder="Input AWS Region..." />
                </AntdForm.Item>
                <AntdForm.Item<AdminConfigAppDto.SaveRequest>
                  label="AWS S3 Bucket"
                  name="awsS3Bucket"
                >
                  <Input placeholder="Input AWS S3 Bucket..." />
                </AntdForm.Item>
              </>
            ),
          },
        ]}
      />
      <Row justify="end" style={{ marginTop: 16 }}>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            loading={saveMutation.isPending}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </AntdForm>
  );
}
