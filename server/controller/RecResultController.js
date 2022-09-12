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
      const newPets = pets.map((el) => ({
        ...el.dataValues,
        hab_score: "0.00",
      }));
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

    const listPets3 = listPets2.map((el) => ({ ...el, hab_score: "1.00" }));
    const score_habitat = [];

    //score habitat
    score_habitat.push(...rec_animals);
    score_habitat.push(...listPets3);
    score_habitat.sort((a, b) => {
      return a.pet_id - b.pet_id;
    });
    //score criteria
    //list animal criteria with score
    let crite = [];
    let an_crite = [];
    let rec_crite = [];
    let final_score_crite = [];
    let pets_id = [];
    for (let i = 0; i < criteria.length; i++) {
      const listCriteria = await req.context.models.criteria.findAll();

      crite = listCriteria.filter((el) => criteria[i] === el.crite_name);

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
      rec_crite.sort((a, b) => {
        return a.critelines_pet_id - b.critelines_pet_id;
      });

      // get biggest weight criteria
      const big_weight = [...rec_crite];
      big_weight.sort((a, b) => {
        return a.critelines_weight + b.critelines_weight;
      });
      console.log(big_weight);
      //final score
      const weight_crite = 0.6 / criteria.length;
      final_score_crite = [];
      for (let j = 0; j < rec_crite.length; j++) {
        const score_criteria = weight_crite * (rec_crite[j].critelines_weight/parseFloat(big_weight[0].critelines_weight));

        const score_pet = {
          pet_id: rec_crite[j].critelines_pet_id,
          crite_score: score_criteria,
        };
        final_score_crite.push(score_pet);
        pets_id.push(rec_crite[j].critelines_pet_id);
      }
    }
   
   //final score criteria per animal
    let final_score_criteria = [];
    let pets_id1 = [...new Set(pets_id)];
    
    for (let k = 0; k < pets_id1.length; k++) {
      let total_score = 0;
      for (let l = 0; l < final_score_crite.length ; l++) {
        if (pets_id1[k] === final_score_crite[l].pet_id) {
          total_score = total_score + final_score_crite[l].crite_score;
        }else{
          total_score = total_score;
        }
      }
      const score_criteria = {
        pet_id: pets_id1[k],
        crite_score: total_score,
      };
      final_score_criteria.push(score_criteria);
      
    }

    //perankingan
    let final_score = 0;
    let list_final_score=[]
    for (let l = 0; l < score_habitat.length; l++) {
      final_score = parseFloat(score_habitat[l].hab_score) + final_score_criteria[l].crite_score
     
      const score_pet = {
        pet_id: score_habitat[l].pet_id,
        pet_name:score_habitat[l].pet_name,
        crite_score: final_score,
      };
      list_final_score.push(score_pet);
    }


    return res.send(list_final_score);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default {
  recomResult,
};
