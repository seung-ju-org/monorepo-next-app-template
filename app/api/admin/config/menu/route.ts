import { Method } from '@seung-ju/next/server';
import server from '#libs/server';
import AdminConfigMenuDto from '#app/api/admin/config/menu/dto';
import adminConfigMenuService from '#app/api/admin/config/menu/service';

const route = server.createRoute({
  async [Method.POST](request) {
    const body: AdminConfigMenuDto.SaveRequest = await request.json();
    return adminConfigMenuService.save(body);
  },
});

export { route as POST };
