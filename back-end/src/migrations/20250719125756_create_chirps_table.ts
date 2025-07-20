import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("chirps", table => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE")
        table.text("content").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now())
    })
}



export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('chirps');
}

