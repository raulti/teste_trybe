import 'dotenv/config';

export default {
  port: process.env.PORT,

  logs: {
    level: process.env.LOG_LEVEL || 'prod',
  },

  database: {
    host: process.env.DB_HOST,
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },

  hashJwt: 'c2VjcmV0and0dG9rZW5pbmNvbXBuYXllc2NvbGFjb25xdWVybWFuYWdlbWVudGJmZnNlcnZpY2Vsb2NhbA==',
};
