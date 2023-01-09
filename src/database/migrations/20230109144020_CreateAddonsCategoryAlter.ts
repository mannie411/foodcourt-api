import { Knex } from 'knex';

const tableName = 'addons_category';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.foreign('addonId').references('addons.id');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
