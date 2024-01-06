const { DataTypes } = require('sequelize');
const { sequelize } = require('../configuration/mysql.db');

const Theatre = sequelize.define(
  'theatres',
  {
    theatre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    theatre_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'theatres',
    timestamps: false,
  }
);

const Shows = sequelize.define(
  'shows',
  {
    show_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movies',
        key: 'movie_id',
      },
    },
    theatre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'theatres',
        key: 'theatre_id',
      },
    },
    show_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    tableName: 'shows',
    timestamps: false,
  }
);

const Movie = sequelize.define(
  'movies',
  {
    movie_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    format_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'movies',
    timestamps: false,
  }
);

const Seats = sequelize.define(
  'seats',
  {
    seat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    show_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'shows',
        key: 'show_id',
      },
    },
    seat_row: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'seats',
    timestamps: false,
  }
);

Shows.belongsTo(Theatre, { foreignKey: 'theatre_id' });

Shows.belongsTo(Movie, { foreignKey: 'movie_id' });

Theatre.hasMany(Shows, { foreignKey: 'theatre_id' });

Seats.belongsTo(Shows, { foreignKey: 'show_id' });
Shows.hasMany(Seats, { foreignKey: 'show_id' });

module.exports = { Theatre, Shows, Movie, Seats };
