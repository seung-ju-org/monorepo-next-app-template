import { Method } from '@seung-ju/next/server';
import server from '#libs/server';
import AdminConfigAppDto from '#app/api/admin/config/app/dto';
import adminConfigAppService from '#app/api/admin/config/app/service';

const route = server.createRoute({
  async [Method.POST](request) {
    const body: AdminConfigAppDto.SaveRequest = await request.json();
    return adminConfigAppService.save(body);
  },
});

export { route as POST };
