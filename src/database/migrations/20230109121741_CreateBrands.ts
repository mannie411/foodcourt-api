import { Knex } from 'knex';

const tableName = 'brands';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments().primary();
    t.text('name').unique();
    t.text('desc');

    t.integer('addonId').unsigned();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
