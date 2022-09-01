import { DataSource } from 'typeorm';
import { Recipe } from '../entity/recipe';
import { User } from '../entity/user';
import logger from '../utils/logger';

export const Database = new DataSource({
  type: 'mongodb',
  url: `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`,
  entities: [User, Recipe],
  synchronize: true,
  logging: false,
});

Database.initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');
  })
  .catch(() => {
    logger.error('Error during Data Source initialization');
  });
