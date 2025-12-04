import { MigrationInterface, QueryRunner } from "typeorm";

export class Firstmigration1763992374906 implements MigrationInterface {
    name = 'Firstmigration1763992374906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "product_order" ("orderId" integer NOT NULL, "productId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "temporary_product_order" ("orderId" integer NOT NULL, "productId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, CONSTRAINT "FK_717057f3f11a007030181422152" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_42291ebe165058deecb017e652b" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product_order"("orderId", "productId", "id") SELECT "orderId", "productId", "id" FROM "product_order"`);
        await queryRunner.query(`DROP TABLE "product_order"`);
        await queryRunner.query(`ALTER TABLE "temporary_product_order" RENAME TO "product_order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "name", "userId") SELECT "id", "name", "userId" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "order"("id", "name", "userId") SELECT "id", "name", "userId" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "product_order" RENAME TO "temporary_product_order"`);
        await queryRunner.query(`CREATE TABLE "product_order" ("orderId" integer NOT NULL, "productId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`INSERT INTO "product_order"("orderId", "productId", "id") SELECT "orderId", "productId", "id" FROM "temporary_product_order"`);
        await queryRunner.query(`DROP TABLE "temporary_product_order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product_order"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
