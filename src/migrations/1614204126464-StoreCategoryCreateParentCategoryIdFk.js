module.exports = class StoreCategoryCreateParentCategoryIdFk1614204126464 {
  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE store_categories add constraint store_categories_parentCategoryId_to_store_categories_id_fk foreign key (parentCategoryId) references store_categories(id);`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE store_categories drop constraint store_categories_parentCategoryId_to_store_categories_id_fk;`,
    );
  }
};
