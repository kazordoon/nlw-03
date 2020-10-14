import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrphanages1602618720062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orphanages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'geolocation',
            type: 'point',
            isNullable: false,
          },
          {
            name: 'about',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'instructions',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'opening_hours',
            type: 'time without time zone',
          },
          {
            name: 'open_on_weekends',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }
}
