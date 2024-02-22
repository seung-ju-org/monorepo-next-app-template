import { User } from '@prisma/client';

namespace AuthSignupDto {
  export interface SignupRequest
    extends Pick<
      User,
      'name' | 'nickname' | 'username' | 'email' | 'password'
    > {}

  export interface SignupResponse extends Pick<User, 'id'> {}
}

export default AuthSignupDto;
