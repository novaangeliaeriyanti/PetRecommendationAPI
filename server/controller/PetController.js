import UpDonwloadHelper from "../middleware/UploadDonwloadHelper";

const createPet = async (req, res, next) => {
  const { files, fields } = req.fileAttrb;

  try {
    const result = await req.context.models.pets.create({
      pet_name: fields[0].value,
      pet_desc: fields[1].value,
      pet_url_image: files[0].file.newFilename,
    });

    const { pet_id, pet_name, pet_desc } = result.dataValues;
    req.pet_id = pet_id;
    next();
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const addPet = async (req, res, next) => {
  try {
    const result = await req.context.models.pets.create({
      pet_name: req.body.pet_name,
      pet_desc: req.body.req_desc,
      pet_url_image: "aaaaa",
    });

    const { pet_id, pet_name, pet_desc } = result.dataValues;
    req.pet_id = pet_id;
    next();
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const findPet = async (req, res) => {
  try {
    const result = await req.context.models.pets.findAll({
      attributes: ["pet_name", "pet_desc", "pet_url_image"],
      where: { pet_id: req.params.id },
      include: [
        {
          model: req.context.models.hab_lines,
          as: "hab_lines",
          attributes: ["hablines_hab_id", "hablines_weight"],
        },
        {
          model: req.context.models.crite_lines,
          as: "crite_lines",
          attributes: ["critelines_crite_id", "critelines_weight"],
        },
      ],
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updatePet = async (req, res, next) => {
  const { pet_name, pet_desc, pet_hab_id, pet_url_image, crite_lines } =
    req.body;

  try {
    const result = await req.context.models.pets.update(
      {
        pet_name: pet_name,
        pet_desc: pet_desc,
        pet_hab_id: pet_hab_id,
        pet_url_image: pet_url_image,
      },
      {
        returning: true,
        where: { pet_id: parseInt(req.params.id) },
      }
    );
    req.pet_id = parseInt(req.params.id);
    req.pet_hab_id = pet_hab_id;
    req.crite_lines = crite_lines;
    next();
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export default {
  createPet,
  findPet,
  updatePet,
  addPet
};
