import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEntityNameTable1749691784633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "entity_name",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "value",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "varchar",
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKeys("entity_character", [
            new TableForeignKey({
                name: "FK_entity_character_nameId",
                columnNames: ["nameId"],
                referencedTableName: "entity_name",
                referencedColumnNames: ["id"],
            }),
            new TableForeignKey({
                name: "FK_entity_character_surnameId",
                columnNames: ["surnameId"],
                referencedTableName: "entity_name",
                referencedColumnNames: ["id"],
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys("entity_character", [
            new TableForeignKey({
                name: "FK_entity_character_nameId",
                columnNames: ["nameId"],
                referencedTableName: "entity_name",
                referencedColumnNames: ["id"],
            }),
            new TableForeignKey({
                name: "FK_entity_character_surnameId",
                columnNames: ["surnameId"],
                referencedTableName: "entity_name",
                referencedColumnNames: ["id"],
            }),
        ]);
        await queryRunner.dropTable("entity_name");
    }

}
