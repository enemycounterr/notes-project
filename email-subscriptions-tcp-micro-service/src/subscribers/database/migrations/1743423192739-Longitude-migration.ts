import { MigrationInterface, QueryRunner } from "typeorm";

export class LongitudeMigration1743423192739 implements MigrationInterface {
    name = 'LongitudeMigration1743423192739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_entity" ADD "longitude" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_entity" DROP COLUMN "longitude"`);
    }

}
