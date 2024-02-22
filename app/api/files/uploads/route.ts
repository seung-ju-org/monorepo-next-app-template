import server from '#libs/server';
import { Method } from '@seung-ju/next/server';
import filesUploadsService from '#app/api/files/uploads/service';

const route = server.createRoute({
  async [Method.POST](request) {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    return filesUploadsService.uploadFile(file);
  },
});

export { route as POST };
