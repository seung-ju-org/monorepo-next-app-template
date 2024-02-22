declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      DATABASE_URL: string;
      AUTH_SECRET: string;
    }
  }
}
