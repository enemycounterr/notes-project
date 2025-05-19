import { MigrationInterface, QueryRunner } from "typeorm";

export class LattitudeMigration1743423192738 implements MigrationInterface {
    name = 'LattitudeMigration1743423192738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_entity" ADD "lattitude" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_entity" DROP COLUMN "lattitude"`);
    }

}
