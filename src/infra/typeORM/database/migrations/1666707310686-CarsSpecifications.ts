import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CarsSpecifications1666707310686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars_specifications",
        columns: [
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "specification_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "cars_specifications",
      new TableForeignKey({
        name: "FKCarCarSpepecification",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
      })
    );
    await queryRunner.createForeignKey(
      "cars_specifications",
      new TableForeignKey({
        name: "FKSpecificationCarSpepecification",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specification_id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars_specifications");
  }
}
