import prisma from '#libs/prisma';
import server from '#libs/server';
import AdminConfigAppDto from './dto';

const adminConfigAppService = server.createService({
  async save(data: AdminConfigAppDto.SaveRequest) {
    await prisma.appConfig.create({
      data,
    });
  },
});

export default adminConfigAppService;
