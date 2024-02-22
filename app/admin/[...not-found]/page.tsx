'use client';

import React from 'react';
import { Button, Col, Result, Row } from 'antd';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <Row justify="center" align="middle" style={{ height: '100%' }}>
      <Col>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              onClick={() => {
                router.push('/admin');
              }}
            >
              Back Home
            </Button>
          }
        />
      </Col>
    </Row>
  );
}
