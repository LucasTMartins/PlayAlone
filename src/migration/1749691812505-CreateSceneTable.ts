import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSceneTable1749691812505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "scene",
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
                        name: "placeId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "scene",
            new TableForeignKey({
                columnNames: ["placeId"],
                referencedTableName: "place",
                referencedColumnNames: ["id"],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "entity_character_scenes_scene",
                columns: [
                    {
                        name: "entityCharacterId",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "sceneId",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKeys("entity_character_scenes_scene", [
            new TableForeignKey({
                columnNames: ["entityCharacterId"],
                referencedTableName: "entity_character",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
            new TableForeignKey({
                columnNames: ["sceneId"],
                referencedTableName: "scene",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("entity_character_scenes_scene");
        await queryRunner.dropTable("scene");
    }

}
