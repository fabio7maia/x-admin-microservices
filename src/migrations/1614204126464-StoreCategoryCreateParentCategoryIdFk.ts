import { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreCategoryCreateParentCategoryIdFk1614204126464
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE store_categories add constraint store_categories_parentCategoryId_to_store_categories_id_fk foreign key (parentCategoryId) references store_categories(id);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE store_categories drop constraint store_categories_parentCategoryId_to_store_categories_id_fk;`,
    );
  }
}
