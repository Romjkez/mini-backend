import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'mini',
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
  },
];
