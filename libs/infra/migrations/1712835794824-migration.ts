import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712835794824 implements MigrationInterface {
    name = 'Migration1712835794824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, "username" character varying NOT NULL, "email" character varying NOT NULL, "emailConfirmed" boolean NOT NULL DEFAULT false, "confirmationCode" character varying, "passwordSalt" character varying NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, "title" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_a75e1d635b3b07412a2ab3eb000" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "device_entity" ADD CONSTRAINT "FK_989ec753ea7c52ee5cabbf4b67a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_entity" DROP CONSTRAINT "FK_989ec753ea7c52ee5cabbf4b67a"`);
        await queryRunner.query(`DROP TABLE "device_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
