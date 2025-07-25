import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", table => {
        table.increments("id").primary();
        table.string("username", 50).notNullable().unique();
        table.string("hash_password", 255).notNullable();
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users")
}

