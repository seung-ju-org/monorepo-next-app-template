import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '#libs/prisma';
import { verifyPassword } from '#utils/crypto';
import { getServerSession as nextAuthGetServerSession } from 'next-auth/next';

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          select: {
            id: true,
            avatar: {
              select: {
                id: true,
              },
            },
            email: true,
            name: true,
            password: true,
            salt: true,
          },
          where: {
            username: credentials?.username,
          },
        });
        if (!user) {
          throw new Error('Incorrect Username');
        }
        const isVerify = await verifyPassword(
          credentials?.password as string,
          user.password as string,
          user.salt as string,
        );
        if (!isVerify) {
          throw new Error('Incorrect Password');
        }
        return {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
};

export function getServerSession() {
  return nextAuthGetServerSession(authOptions);
}
