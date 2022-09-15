const createHabLines = async (req, res, next) => {
  const hab_id = req.hab_id;
  const resultPet = await req.context.models.pets.findAll();
  let hab_line = {
    hablines_hab_id: undefined,
    hablines_pet_id: undefined,
    hablines_weight: undefined,
  };

  const list_hablines = [];

  resultPet.forEach((el) => {
    hab_line = {
      hablines_hab_id: hab_id,
      hablines_pet_id: el.pet_id,
      hablines_weight: parseFloat(0),
    };
    list_hablines.push(hab_line);
  });
  try {
    const result = await req.context.models.hab_lines.bulkCreate(
      list_hablines
    );
    res.send(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const createPetLines = async (req, res) => {
  const { files, fields } = req.fileAttrb;
  const pet_id = req.pet_id;
  let crite_data = []

  for (let i = 3; i <fields.length; i++) {
    crite_data.push(fields[i]);
  }

  console.log(crite_data);

  let crite_line = {
    critelines_crite_id: undefined,
    critelines_pet_id: undefined,
    critelines_weight: undefined,
  };

  const list_critelines = [];

  crite_data.forEach((el) => {
    crite_line = {
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

const addPetLines = async (req, res, next) => {
  const { pet_name, pet_desc, pet_hab, pet_crite } = req.body;
  const pet_id = req.pet_id;
 
  let hab_data = []

  for (let i = 0; i < pet_hab.length; i++) {
    hab_data.push(pet_hab[i]);
  }

  let hab_line = {
    hablines_hab_id: undefined,
    hablines_pet_id: undefined,
    hablines_weight: undefined,
  };

  const list_hablines = [];
 
  hab_data.forEach((el) => {
    hab_line = {
      hablines_hab_id: parseInt(el.hab_id),
      hablines_pet_id: pet_id,
      hablines_weight: parseFloat(el.hab_weight),
    };
    list_hablines.push(hab_line);
  });

  const listHabitat = await req.context.models.habitats.findAll();

  let hab_zero =[];
  for (let i = 0; i < listHabitat.length; i++) { 
    hab_zero.push(listHabitat[i].dataValues);
  }

  const hab_data2 = hab_zero.filter(({ hab_id: hab_id1 }) => !hab_data.some(({ hab_id: hab_id }) => hab_id === hab_id1));

  let hab_line1 = {
    hablines_hab_id: undefined,
    hablines_pet_id: undefined,
    hablines_weight: undefined,
  };

  const list_hablines1 = [];
  hab_data2.forEach((el) => {
    hab_line1 = {
      hablines_hab_id: parseInt(el.hab_id),
      hablines_pet_id: pet_id,
      hablines_weight: parseFloat(0),
    };
    list_hablines1.push(hab_line1); 
  });

  try {
    const result = await req.context.models.hab_lines.bulkCreate(
      list_hablines
    );
    const result1 = await req.context.models.hab_lines.bulkCreate(
      list_hablines1
    );
    next();
    //return res.send(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// const updatePetLines = async (req, res) => {
//  // const { files, fields } = req.fileAttrb;
//   const pet_id = req.pet_id;
//   const list_crite_lines = req.crite_lines

//   let crite_line = {
//     critelines_crite_id: undefined,
//     critelines_pet_id: undefined,
//     critelines_weight: undefined,
//   };

//   const list_critelines = [];

//   list_crite_lines.forEach((el) => {
//     crite_line = {
//       critelines_crite_id: parseInt(el.critelines_crite_id),
//       critelines_pet_id: pet_id,
//       critelines_weight: parseFloat(el.critelines_weight),
//     };
//     list_critelines.push(crite_line);
//   });

//   console.log(list_critelines);
//   try {
//     const result =  list_critelines.map(el=>{
//       req.context.models.crite_lines.update(
//         {
//           critelines_weight: el.critelines_weight,
//         },
//         {
//             returning: true,
//             where: { 
//                 critelines_pet_id: pet_id,
//                 critelines_crite_id: el.critelines_crite_id,
//             }
//         }
//     )
//     })
    
//     return res.send({message:"pet has been update"});
//   } catch (error) {
//     return res.status(404).json({ message: error.message });
//   }
// };


export default {
  createHabLines,
  addPetLines
};

