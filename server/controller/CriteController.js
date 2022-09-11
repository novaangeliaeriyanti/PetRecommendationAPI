import Sequelize from "sequelize";
const createCrite = async (req, res, next) => {
  const { files, fields } = req.fileAttrb;

  try {
    const result = await req.context.models.criteria.create({
      crite_name: fields[0].value,
      crite_desc: fields[1].value,
      crite_url_image: files[0].file.newFilename,
    });
    const { crite_id, crite_data } = result.dataValues;
    req.crite_id = crite_id;
    next();
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const findAllCriteria = async (req, res) => {
  try {

    const result = await req.context.models.criteria.findAll({
      attributes: ["crite_id", "crite_name"],
      include: [
        {
          model: req.context.models.crite_lines,
          as: "crite_lines",
          attributes: ["critelines_pet_id", "critelines_weight"],
        },
      ],
    });

    
    return res.send(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default {
  createCrite,
  findAllCriteria,
};
