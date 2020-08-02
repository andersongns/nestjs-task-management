import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import env from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: env.database.host,
    port: env.database.port,
    username: env.database.username,
    password: env.database.password,
    database: env.database.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}