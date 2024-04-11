import { DeviceEntity } from '../../apps/inctagramm/src/modules/device/entities/device.entity';
import { UserEntity } from '../../apps/inctagramm/src/modules/user/entities/user.entity';
import { config } from 'dotenv'
config()
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const allEntities = [
    UserEntity,
    DeviceEntity
]

const isTest = process.env.NODE_ENV === 'test';

console.log(process.env.PG_HOST_TEST)
export const primaryPostgresConnectionOptions: PostgresConnectionOptions = {
    name: "default",
    type: 'postgres',
    host: process.env[
        // isTest ? 
        'PG_HOST_TEST'
        //  : 'PRIMARY_PG_HOST'
    ],
    port: +process.env[
        // isTest ?
        'PG_PORT_TEST'
        //   : 'PRIMARY_PG_PORT'
    ],
    username: process.env[
        // isTest ?
        'PG_USER_TEST'
        //   : 'PRIMARY_PG_USER'
    ],
    password: process.env[
        // isTest ?
        'PG_PASSWORD_TEST'
        //  : 'PRIMARY_PG_PASSWORD'
    ],
    database: process.env[
        // isTest ?
        'PG_DATABASE_TEST'
        //   : 'PRIMARY_DB_NAME'
    ],
    entities: allEntities,
    synchronize: false,
    logging: false,
    extra: {
        max: 50,
        connectionTimeoutMillis: 10000
    },
    // ssl: {
    //     rejectUnauthorized: false,
    // },
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default new DataSource(primaryPostgresConnectionOptions)