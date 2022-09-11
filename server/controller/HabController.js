const createHab = async (req, res, next) => {
  const { files, fields } = req.fileAttrb;

  try {
    const result = await req.context.models.habitats.create({
      hab_name: fields[0].value,
      hab_desc: fields[1].value,
      hab_url_image: files[0].file.newFilename,
    });
    const { hab_id, hab_data } = result.dataValues;
    req.hab_id = hab_id;
    next();
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const findAllPet = async (req, res) => {
  try {
    const result = await req.context.models.habitats.findAll({
      attributes: ["hab_id", "hab_name"],
      where:{hab_id: 1},
      include: [
        {
          model: req.context.models.pets,
          as: "pets",
          attributes: ["pet_id", "pet_name"],
        },
      ],
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default {
  createHab,
  findAllPet,
};
