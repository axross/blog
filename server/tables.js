import Sequelize from 'sequelize';

export const session = {
  name: 'Session',
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    accessToken: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
    },
    expiredAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  options: {
    paranoid: true,
  },
};

export const user = {
  name: 'User',
  attributes: {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
      defaultValue: 'noname',
    },
    imageUrl: {
      type: Sequelize.STRING(255),
    },
    bio: {
      type: Sequelize.TEXT,
    },
  },
  options: {
    paranoid: true,
  },
};
