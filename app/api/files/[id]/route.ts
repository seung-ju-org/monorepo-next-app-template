import { Method } from '@seung-ju/next/server';
import server from '#libs/server';
import filesDetailService from './service';

const route = server.createRoute({
  async [Method.GET](request, context) {
    return filesDetailService.getFile(context.params.id);
  },
});

export { route as GET };
