import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712835826231 implements MigrationInterface {
    name = 'Migration1712835826231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "passwordRecoveryCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "passwordRecoveryCode"`);
    }

}
