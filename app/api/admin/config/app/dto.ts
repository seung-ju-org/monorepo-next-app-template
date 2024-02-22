import { AppConfig } from '@prisma/client';

namespace AdminConfigAppDto {
  export type SaveRequest = Pick<
    AppConfig,
    | 'awsRegion'
    | 'awsS3Bucket'
    | 'isUseAwsS3'
    | 'title'
    | 'description'
    | 'faviconFileId'
  >;

  export type SaveResponse = 'OK';
}

export default AdminConfigAppDto;
