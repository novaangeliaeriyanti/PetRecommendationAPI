import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class habi_images extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    habimg_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    habimg_filename: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    habimg_filesize: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    habimg_filetype: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    habimg_hab_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'habitats',
        key: 'hab_id'
      }
    }
  }, {
    sequelize,
    tableName: 'habi_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "habimg_id_pk",
        unique: true,
        fields: [
          { name: "habimg_id" },
        ]
      },
    ]
  });
  }
}
