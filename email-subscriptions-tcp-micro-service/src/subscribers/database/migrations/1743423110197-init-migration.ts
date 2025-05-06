import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1743423110197 implements MigrationInterface {
    name = 'InitMigration1743423110197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address_entity" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "region" character varying, "city" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_9caf3f954ed5bc66e3fa35eb7e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note_item_entity" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "data" character varying NOT NULL, CONSTRAINT "PK_73ef39b994f01fd1ac062d9e128" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "date" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_664c6fdaf79389734ae737f7d27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "addressId" integer, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "REL_642be2eb65adc0d8bf6ee11e7e" UNIQUE ("addressId"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note_entity_note_items_note_item_entity" ("noteEntityId" integer NOT NULL, "noteItemEntityId" integer NOT NULL, CONSTRAINT "PK_ccd2ce6c6b0213dd8a2a44101c2" PRIMARY KEY ("noteEntityId", "noteItemEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f4142cc360a594de4dbede4254" ON "note_entity_note_items_note_item_entity" ("noteEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_06ad7059f12dad6cd6b35d586b" ON "note_entity_note_items_note_item_entity" ("noteItemEntityId") `);
        await queryRunner.query(`ALTER TABLE "note_entity" ADD CONSTRAINT "FK_b800557212ab58621c2de57964a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_642be2eb65adc0d8bf6ee11e7ec" FOREIGN KEY ("addressId") REFERENCES "address_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_entity_note_items_note_item_entity" ADD CONSTRAINT "FK_f4142cc360a594de4dbede42542" FOREIGN KEY ("noteEntityId") REFERENCES "note_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "note_entity_note_items_note_item_entity" ADD CONSTRAINT "FK_06ad7059f12dad6cd6b35d586bd" FOREIGN KEY ("noteItemEntityId") REFERENCES "note_item_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_entity_note_items_note_item_entity" DROP CONSTRAINT "FK_06ad7059f12dad6cd6b35d586bd"`);
        await queryRunner.query(`ALTER TABLE "note_entity_note_items_note_item_entity" DROP CONSTRAINT "FK_f4142cc360a594de4dbede42542"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_642be2eb65adc0d8bf6ee11e7ec"`);
        await queryRunner.query(`ALTER TABLE "note_entity" DROP CONSTRAINT "FK_b800557212ab58621c2de57964a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06ad7059f12dad6cd6b35d586b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4142cc360a594de4dbede4254"`);
        await queryRunner.query(`DROP TABLE "note_entity_note_items_note_item_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "note_entity"`);
        await queryRunner.query(`DROP TABLE "note_item_entity"`);
        await queryRunner.query(`DROP TABLE "address_entity"`);
    }

}
