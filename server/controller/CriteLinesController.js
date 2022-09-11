const createCriteLines = async (req, res, next) => {
  const crite_id = req.crite_id;
  const resultPet = await req.context.models.pets.findAll();
  let crite_line = {
    critelines_hab_id:undefined,
    critelines_crite_id: undefined,
    critelines_pet_id: undefined,
    critelines_weight: undefined,
  };

  const list_critelines = [];

  resultPet.forEach((el) => {
    crite_line = {
      critelines_hab_id:el.pet_hab_id,
      critelines_crite_id: crite_id,
      critelines_pet_id: el.pet_id,
      critelines_weight: parseFloat(0),
    };
    list_critelines.push(crite_line);
  });
  try {
    const result = await req.context.models.crite_lines.bulkCreate(
      list_critelines
    );
    res.send(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const createPetLines = async (req, res) => {
  const { files, fields } = req.fileAttrb;
  const pet_id = req.pet_id;
  const pet_hab_id = req.pet_hab_id
  let crite_data = []

  for (let i = 3; i <fields.length; i++) {
    crite_data.push(fields[i]);
  }

  console.log(crite_data);

  let crite_line = {
    critelines_hab_id:undefined,
    critelines_crite_id: undefined,
    critelines_pet_id: undefined,
    critelines_weight: undefined,
  };

  const list_critelines = [];

  crite_data.forEach((el) => {
    crite_line = {
      critelines_hab_id:pet_hab_id,
      critelines_crite_id: parseInt(el.fieldName),
      critelines_pet_id: pet_id,
      critelines_weight: parseFloat(el.value),
    };
    list_critelines.push(crite_line);
  });

  //console.log(list_critelines);
  try {
    const result = await req.context.models.crite_lines.bulkCreate(
      list_critelines
    );
    return res.send(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updatePetLines = async (req, res) => {
 // const { files, fields } = req.fileAttrb;
  const pet_id = req.pet_id;
  const pet_hab_id = req.pet_hab_id;
  const list_crite_lines = req.crite_lines

  let crite_line = {
    critelines_hab_id:undefined,
    critelines_crite_id: undefined,
    critelines_pet_id: undefined,
    critelines_weight: undefined,
  };

  const list_critelines = [];

  list_crite_lines.forEach((el) => {
    crite_line = {
      critelines_hab_id:pet_hab_id,
      critelines_crite_id: parseInt(el.critelines_crite_id),
      critelines_pet_id: pet_id,
      critelines_weight: parseFloat(el.critelines_weight),
    };
    list_critelines.push(crite_line);
  });

  console.log(list_critelines);
  try {
    const result =  list_critelines.map(el=>{
      req.context.models.crite_lines.update(
        {
          critelines_hab_id:el.critelines_hab_id,
          critelines_weight: el.critelines_weight,
        },
        {
            returning: true,
            where: { 
                critelines_pet_id: pet_id,
                critelines_crite_id: el.critelines_crite_id,
            }
        }
    )
    })
    
    return res.send({message:"pet has been update"});
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


export default {
  createCriteLines,
  createPetLines,
  updatePetLines
};

