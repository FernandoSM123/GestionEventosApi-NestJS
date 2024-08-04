import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1722737190517 implements MigrationInterface {
  name = 'InitialMigration1722737190517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`lastname\` varchar(50) NOT NULL, \`cellphone\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`user_type_id\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_types\` (\`user_type_id\` int NOT NULL AUTO_INCREMENT, \`user_type_name\` varchar(50) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`user_type_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`role_id\` int NOT NULL AUTO_INCREMENT, \`role_name\` varchar(50) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_cd9740f36970d326b3f65bd5e99\` FOREIGN KEY (\`user_type_id\`) REFERENCES \`user_types\`(\`user_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_cd9740f36970d326b3f65bd5e99\``,
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(`DROP TABLE \`user_types\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
