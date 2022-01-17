import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    user_email: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    user_gender: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    user_avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_id_pk",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
