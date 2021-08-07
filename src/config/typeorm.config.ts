import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export function normalizePort(val: any) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: normalizePort(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};
