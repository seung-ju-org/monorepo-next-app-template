import server from '#libs/server';
import AuthSignupDto from '#app/api/auth/signup/dto';
import prisma from '#libs/prisma';
import { createHashedPassword } from '#utils/crypto';
import { ResponseEntity } from '@seung-ju/next/server';

const authSignupService = server.createService({
  async signUp(signupRequest: AuthSignupDto.SignupRequest) {
    const alreadyUsername = await prisma.user.findFirst({
      where: {
        username: signupRequest.username,
      },
    });

    if (alreadyUsername) {
      throw ResponseEntity.error(409, 'username already in use.');
    }

    const alreadyEmail = await prisma.user.findFirst({
      where: {
        email: signupRequest.email,
      },
    });

    if (alreadyEmail) {
      throw ResponseEntity.error(409, 'email already in use.');
    }

    const alreadyNickname = await prisma.user.findFirst({
      where: {
        nickname: signupRequest.nickname,
      },
    });

    if (alreadyNickname) {
      throw ResponseEntity.error(409, 'nickname already in use.');
    }

    const hasedPassword = await createHashedPassword(
      signupRequest.password as string,
    );
    const user = await prisma.user.create({
      data: {
        ...signupRequest,
        password: hasedPassword.hashedPassword,
        salt: hasedPassword.salt,
      },
    });

    return ResponseEntity.created({
      id: user.id,
    });
  },
});

export default authSignupService;
