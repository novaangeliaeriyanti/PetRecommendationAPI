import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class crite_images extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    criteimg_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    criteimg_filename: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    criteimg_filesize: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    criteimg_filetype: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    criteimg_crite_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'criteria',
        key: 'crite_id'
      }
    }
  }, {
    sequelize,
    tableName: 'crite_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "criteimg_id_pk",
        unique: true,
        fields: [
          { name: "criteimg_id" },
        ]
      },
    ]
  });
  }
}
