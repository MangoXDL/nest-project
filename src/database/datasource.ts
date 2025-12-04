import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceConfig);
