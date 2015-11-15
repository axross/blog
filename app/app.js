import Sequelize from 'sequelize';
import { createServer } from './Server';
import * as tables from './tables';
import { User } from '../models';

const config = require('./configs/' + (process.env.NODE_ENV || 'local'));

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  {
    dialect: 'mysql',
    host: config.DATABASE_HOST,
    pool: config.DATABASE_POOL,
  }
);

const models = {
  User,
};

Object.keys(tables).map(key => tables[key]).forEach(table => {
  sequelize.define(table.name, table.attributes, table.options);
});

Promise.all([
  sequelize.models.Session.sync(),
  sequelize.models.User.sync(),
])
  .then(() => {
    const app = createServer({
      config,
      sequelize,
      models,
    });

    app.listen(3000);
  })
  .catch(err => console.error(err));
