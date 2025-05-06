import { MigrationInterface, QueryRunner } from "typeorm";

export class PrecisionLattidueMigration1743424589634 implements MigrationInterface {
    name = 'PrecisionLattidueMigration1743424589634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_entity" ADD "precision" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_entity" DROP COLUMN "precision"`);
    }

}
