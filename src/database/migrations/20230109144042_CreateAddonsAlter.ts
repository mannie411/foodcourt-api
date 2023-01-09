import { Knex } from 'knex';

const tableName = 'addons';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.foreign('brandId').references('brands.id');
    t.foreign('categoryId').references('addons_category.id');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
