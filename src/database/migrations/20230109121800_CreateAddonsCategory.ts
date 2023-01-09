import { Knex } from 'knex';

const tableName = 'addons_category';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments().primary();
    t.text('name').unique();

    t.integer('addonId').unsigned();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
