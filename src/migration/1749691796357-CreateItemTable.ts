import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateItemTable1749691796357 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "item",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "size",
                        type: "varchar",
                    },
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: "entity_character_items_item",
                columns: [
                    {
                        name: "entityCharacterId",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "itemId",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKeys("entity_character_items_item", [
            new TableForeignKey({
                columnNames: ["entityCharacterId"],
                referencedTableName: "entity_character",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
            new TableForeignKey({
                columnNames: ["itemId"],
                referencedTableName: "item",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("entity_character_items_item");
        await queryRunner.dropTable("item");
    }

}
