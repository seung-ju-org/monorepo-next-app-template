import { AdminMenu } from '@prisma/client';

namespace AdminConfigMenuDto {
  export type SaveRequest = (Pick<AdminMenu, 'name' | 'icon' | 'url'> & {
    children?: SaveRequest;
  })[];

  export type SaveResponse = 'OK';
}

export default AdminConfigMenuDto;
