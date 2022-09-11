import Sequelize from "sequelize";

const recomResult = async (req, res) => {
  const { habitat, criteria } = req.body;

  try {
    //score habitat
    //list animal habitat with score
    let hab = [];
    let an_hab = [];
    let rec_animals = [];

    for (let i = 0; i < habitat.length; i++) {
      const listHabitat = await req.context.models.habitats.findAll();

      hab = listHabitat.filter((el) => habitat[i] === el.hab_name);

      an_hab = await req.context.models.habitats.findAll({
        attributes: ["hab_id", "hab_name"],
        where: { hab_id: hab[0].hab_id },
        include: [
          {
            model: req.context.models.pets,
            as: "pets",
            attributes: ["pet_id", "pet_name"],
          },
        ],
      });

      const { hab_id, hab_name, pets } = an_hab[0].dataValues;
      const newPets = pets.map((el) => ({ ...el.dataValues, pet_score: '1.00' }));
      rec_animals.push(...newPets);
    }
    //list animal habitat with no score
    const listPets = await req.context.models.pets.findAll({
      attributes: ["pet_id", "pet_name"],
    });
    let listPets2 = listPets.map((el) => el.dataValues);
    listPets2 = listPets2.filter(
      (el) => !rec_animals.map((el2) => el2.pet_id).includes(el.pet_id)
    );

    const listPets3 = listPets2.map((el) => ({ ...el, pet_score: '0.00' }));
    const score_habitat = [];

    //score habitat
    score_habitat.push(...rec_animals);
    score_habitat.push(...listPets3);

    //score criteria
    //list animal criteria with score
    let crite = [];
    let an_crite = [];
    let rec_crite = [];

    //for (let i = 0; i < criteria.length; i++) {
      const listCriteria = await req.context.models.criteria.findAll();

      crite = listCriteria.filter((el) => criteria[0] === el.crite_name);

      an_crite = await req.context.models.criteria.findAll({
        attributes: ["crite_id", "crite_name"],
        where: { crite_id: crite[0].crite_id },
        include: [
          {
            model: req.context.models.crite_lines,
            as: "crite_lines",
            attributes: [
              "critelines_pet_id",
              "critelines_crite_id",
              "critelines_weight",
            ],
          },
        ],
      });

      const { crite_id, crite_name, crite_lines } = an_crite[0].dataValues;
      const newCrite = crite_lines.map((el) => ({ ...el.dataValues }));
      rec_crite.push(...newCrite);
   // }

    //list animal criteria with no score  
    // const listCriteLines= await req.context.models.crite_lines.findAll({
    //   attributes:["critelines_crite_id","critelines_pet_id"]
    // });
    //console.log(listCriteLines);
    // let listCrite2 = listCriteLines.map(el=>el.dataValues);
    // console.log(rec_crite);
    // console.log(listCrite2);

    // listCrite2 = listCrite2.filter(el=>!rec_crite.map(el2=>el2.critelines_crite_id).includes(el.critelines_crite_id))
    // const listCrite4 = listCrite2.map((el) => ({ ...el, critelines_weight: '0.00' }));

    // const score_criteria = [];
    // score_criteria.push(rec_crite);
    // score_criteria.push(listCrite4);
    

    return res.send(rec_crite);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default {
  recomResult,
};
