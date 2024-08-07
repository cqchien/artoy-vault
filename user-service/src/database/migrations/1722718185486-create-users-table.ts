import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1722718185486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            avatar VARCHAR,
            email VARCHAR NOT NULL UNIQUE,
            password VARCHAR,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by INTEGER,
            updated_by INTEGER,
            deleted_at TIMESTAMP,
            deleted_by INTEGER,
            CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
            CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
            CONSTRAINT fk_deleted_by FOREIGN KEY (deleted_by) REFERENCES users(id) ON DELETE SET NULL
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
