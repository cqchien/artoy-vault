import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1722718185486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            avatar VARCHAR,
            username VARCHAR NOT NULL UNIQUE,
            email VARCHAR NOT NULL UNIQUE,
            password VARCHAR,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by INTEGER,
            updated_by INTEGER,
            deleted_at TIMESTAMP,
            deleted_by INTEGER
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
