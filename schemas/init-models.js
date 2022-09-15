import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _crite_images from  "./crite_images.js";
import _crite_lines from  "./crite_lines.js";
import _criteria from  "./criteria.js";
import _hab_lines from  "./hab_lines.js";
import _habi_images from  "./habi_images.js";
import _habitats from  "./habitats.js";
import _pet_images from  "./pet_images.js";
import _pets from  "./pets.js";
import _recomendation_results from  "./recomendation_results.js";

export default function initModels(sequelize) {
  const crite_images = _crite_images.init(sequelize, DataTypes);
  const crite_lines = _crite_lines.init(sequelize, DataTypes);
  const criteria = _criteria.init(sequelize, DataTypes);
  const hab_lines = _hab_lines.init(sequelize, DataTypes);
  const habi_images = _habi_images.init(sequelize, DataTypes);
  const habitats = _habitats.init(sequelize, DataTypes);
  const pet_images = _pet_images.init(sequelize, DataTypes);
  const pets = _pets.init(sequelize, DataTypes);
  const recomendation_results = _recomendation_results.init(sequelize, DataTypes);

  crite_images.belongsTo(criteria, { as: "criteimg_crite", foreignKey: "criteimg_crite_id"});
  criteria.hasMany(crite_images, { as: "crite_images", foreignKey: "criteimg_crite_id"});
  crite_lines.belongsTo(criteria, { as: "critelines_crite", foreignKey: "critelines_crite_id"});
  criteria.hasMany(crite_lines, { as: "crite_lines", foreignKey: "critelines_crite_id"});
  hab_lines.belongsTo(habitats, { as: "hablines_hab", foreignKey: "hablines_hab_id"});
  habitats.hasMany(hab_lines, { as: "hab_lines", foreignKey: "hablines_hab_id"});
  habi_images.belongsTo(habitats, { as: "habimg_hab", foreignKey: "habimg_hab_id"});
  habitats.hasMany(habi_images, { as: "habi_images", foreignKey: "habimg_hab_id"});
  crite_lines.belongsTo(pets, { as: "critelines_pet", foreignKey: "critelines_pet_id"});
  pets.hasMany(crite_lines, { as: "crite_lines", foreignKey: "critelines_pet_id"});
  hab_lines.belongsTo(pets, { as: "hablines_pet", foreignKey: "hablines_pet_id"});
  pets.hasMany(hab_lines, { as: "hab_lines", foreignKey: "hablines_pet_id"});
  pet_images.belongsTo(pets, { as: "petimg_pet", foreignKey: "petimg_pet_id"});
  pets.hasMany(pet_images, { as: "pet_images", foreignKey: "petimg_pet_id"});
  recomendation_results.belongsTo(pets, { as: "res_pet", foreignKey: "res_pet_id"});
  pets.hasMany(recomendation_results, { as: "recomendation_results", foreignKey: "res_pet_id"});

  return {
    crite_images,
    crite_lines,
    criteria,
    hab_lines,
    habi_images,
    habitats,
    pet_images,
    pets,
    recomendation_results,
  };
}
