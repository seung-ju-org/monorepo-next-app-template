import { Method } from '@seung-ju/next/server';
import server from '#libs/server';
import AuthSignupDto from '#app/api/auth/signup/dto';
import authSignupService from '#app/api/auth/signup/service';

const route = server.createRoute({
  async [Method.POST](request) {
    const body: AuthSignupDto.SignupRequest = await request.json();
    return authSignupService.signUp(body);
  },
});

export { route as POST };
