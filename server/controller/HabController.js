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


const findAllHabitat = async (req, res) => {
  try {

    const result = await req.context.models.habitats.findAll({
      attributes: ["hab_id", "hab_name"],
      include: [
        {
          model: req.context.models.hab_lines,
          as: "hab_lines",
          attributes: ["hablines_pet_id", "hablines_weight"],
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
  findAllHabitat,
};
