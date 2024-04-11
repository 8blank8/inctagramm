import { TestingModule } from "@nestjs/testing";
import { DataSource, QueryRunner } from "typeorm";

export class TestUtils {

    static async getDbServices(moduleRef: TestingModule) {
        const dataSource = await moduleRef.resolve(DataSource);
        const manager = dataSource.manager;
        const queryRunner = manager.connection.createQueryRunner();

        return {
            manager,
            queryRunner,
        }
    }

    static async dropDb(queryRunner: QueryRunner) {
        // await queryRunner.dropSchema('public', true, true);
        // await queryRunner.createSchema('public', true);
        const connection = queryRunner.connection;
        const tables = await connection.query(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`);

        // Формируем SQL-запрос для очистки данных из всех таблиц
        const truncateQueries = tables.map((table: { tablename: string }) => {
            return `TRUNCATE TABLE ${table.tablename} RESTART IDENTITY CASCADE;`;
        });

        // Выполняем сформированные SQL-запросы
        await queryRunner.query(truncateQueries.join(''));
    }
}