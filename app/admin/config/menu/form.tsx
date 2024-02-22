'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  Form as AntdForm,
  Row,
  Col,
  Button,
  Space,
  Input,
  Select,
  message,
  InputNumber,
} from 'antd';
import * as Icons from '@ant-design/icons';
import { AdminMenu } from '@prisma/client';
import { produce } from 'immer';
import { v4 as uuid } from 'uuid';
import Api from '#apis/api';
import AdminConfigMenuDto from '#app/api/admin/config/menu/dto';

export type DataType = Pick<AdminMenu, 'name' | 'icon' | 'url'> & {
  order: number;
  key: string;
  parentKey?: string;
  children?: DataType[];
};

const iconSelectOptions = Object.entries(Icons).reduce<
  {
    value: string;
    label: React.ReactNode;
    searchValue: string;
  }[]
>((previousValue, [key, Children]) => {
  // @ts-ignore
  if (Children.render) {
    previousValue.push({
      value: key,
      label: (
        <>
          {/* @ts-ignore */}
          <Children /> {key}
        </>
      ),
      searchValue: key,
    });
  }
  return previousValue;
}, []);

export interface FormProps {
  dataSource: DataType[];
}

export default function Form({ dataSource: initialDataSource }: FormProps) {
  const saveMutation = Api.Admin.Config.Menu.Mutation.useSaveMutation();
  const [dataSource, setDataSource] =
    React.useState<DataType[]>(initialDataSource);
  const router = useRouter();

  return (
    <AntdForm
      onFinish={() => {
        function toRequest(
          // eslint-disable-next-line @typescript-eslint/no-shadow
          dataSource: DataType[],
        ): AdminConfigMenuDto.SaveRequest {
          return [...dataSource]
            .sort((a, b) => a.order - b.order)
            .map((data) => {
              return {
                url: data.url,
                name: data.name,
                icon: data.icon,
                children: data.children && toRequest(data.children),
              };
            });
        }
        const request = toRequest(dataSource);
        saveMutation.mutate(request, {
          onSuccess() {
            router.refresh();
            message.success('Saved !');
          },
          onError(error) {
            message.error(error?.response?.data?.data?.message);
          },
        });
      }}
    >
      <Space direction="vertical" style={{ display: 'flex' }} size="middle">
        <Row justify="end" align="middle">
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setDataSource(
                  produce((draft) => {
                    draft.push({
                      key: uuid(),
                      name: '',
                      url: '',
                      icon: null,
                      children: [],
                      order: draft.length + 1,
                    });
                  }),
                );
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Table
          rowKey="key"
          columns={[
            {
              align: 'center',
              width: 50,
            },
            {
              title: 'Name',
              dataIndex: 'name',
              align: 'center',
              width: 250,
              render(value, record, index) {
                return (
                  <Input
                    value={value}
                    onChange={(event) => {
                      setDataSource(
                        produce((draft) => {
                          if (record.parentKey) {
                            const parentIndex = draft.findIndex((data) => {
                              return data.key === record.parentKey;
                            });
                            const child = draft[parentIndex].children?.[index];
                            if (child) {
                              child.name = event.target.value;
                            }
                          } else {
                            draft[index].name = event.target.value;
                          }
                        }),
                      );
                    }}
                    placeholder="Input Name..."
                  />
                );
              },
            },
            {
              title: 'Icon',
              dataIndex: 'icon',
              width: 150,
              align: 'center',
              render(value, record, index) {
                return (
                  <Select
                    value={value}
                    onChange={
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      (value) => {
                        setDataSource(
                          produce((draft) => {
                            if (record.parentKey) {
                              const parentIndex = draft.findIndex((data) => {
                                return data.key === record.parentKey;
                              });
                              const child =
                                draft[parentIndex].children?.[index];
                              if (child) {
                                child.icon = value;
                              }
                            } else {
                              draft[index].icon = value;
                            }
                          }),
                        );
                      }
                    }
                    showSearch
                    style={{ width: 150 }}
                    options={iconSelectOptions}
                    filterOption={(input, option) => {
                      return (
                        (option?.searchValue
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) ?? 0) >= 0
                      );
                    }}
                    placeholder="Input Icon..."
                    allowClear
                  />
                );
              },
            },
            {
              title: 'URL',
              dataIndex: 'url',
              align: 'center',
              render(value, record, index) {
                return (
                  <Input
                    value={value}
                    onChange={(event) => {
                      setDataSource(
                        produce((draft) => {
                          if (record.parentKey) {
                            const parentIndex = draft.findIndex((data) => {
                              return data.key === record.parentKey;
                            });
                            const child = draft[parentIndex].children?.[index];
                            if (child) {
                              child.url = event.target.value;
                            }
                          } else {
                            draft[index].url = event.target.value;
                          }
                        }),
                      );
                    }}
                    placeholder="Input URL..."
                  />
                );
              },
            },
            {
              title: 'Order',
              dataIndex: 'order',
              align: 'center',
              width: 100,
              render(value, record, index) {
                return (
                  <InputNumber
                    value={value}
                    onChange={
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      (value) => {
                        setDataSource(
                          produce((draft) => {
                            if (record.parentKey) {
                              const parentIndex = draft.findIndex((data) => {
                                return data.key === record.parentKey;
                              });
                              const child =
                                draft[parentIndex].children?.[index];
                              if (child) {
                                child.order = value;
                              }
                            } else {
                              draft[index].order = value;
                            }
                          }),
                        );
                      }
                    }
                    placeholder="Input URL..."
                    style={{ width: 100 }}
                  />
                );
              },
            },
            {
              title: 'Action',
              width: 180,
              dataIndex: 'key',
              align: 'center',
              render(value, record, index) {
                return (
                  <Row align="middle" justify="end" gutter={8}>
                    <Col>
                      {!record.parentKey && (
                        <Button
                          type="primary"
                          onClick={() => {
                            setDataSource(
                              produce((draft) => {
                                draft[index].children?.push({
                                  parentKey: value,
                                  key: uuid(),
                                  name: '',
                                  url: '',
                                  icon: null,
                                  order:
                                    (draft[index].children?.length ?? 0) + 1,
                                });
                              }),
                            );
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          setDataSource(
                            produce((draft) => {
                              if (record.parentKey) {
                                const parentIndex = draft.findIndex((data) => {
                                  return data.key === record.parentKey;
                                });
                                draft[parentIndex].children?.splice(index, 1);
                              } else {
                                draft.splice(index, 1);
                              }
                            }),
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                );
              },
            },
          ]}
          dataSource={dataSource}
          expandable={{
            defaultExpandAllRows: true,
          }}
          pagination={false}
        />
        <Row justify="end" align="middle">
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={saveMutation.isPending}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Space>
    </AntdForm>
  );
}
