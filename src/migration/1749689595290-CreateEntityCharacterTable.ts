import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEntityCharacterTable1749689595290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "entity_character",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "nameId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "surnameId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "rational",
                        type: "boolean",
                    },
                    {
                        name: "created_at",
                        type: "int",
                    },
                    {
                        name: "modified_at",
                        type: "int",
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("entity_character");
    }

}
