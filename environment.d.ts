declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      SERVER_URL: string;
      SERVER_PORT: string;
      SERVER_USERNAME: string;
      SERVER_PASSWORD: string;
      SERVER_DATABASE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
