import Sequelize from "sequelize";

const recomResult = async (req, res) => {
  const { habitat, criteria } = req.body;

  try {
    //score habitat
    //list animal habitat with score
    let hab = [];
    let an_hab = [];
    let final_score_hab = [];
    let pet_id = [];

    for (let i = 0; i < habitat.length; i++) {

      const listHabitat = await req.context.models.habitats.findAll();
      hab = listHabitat.filter((el) => habitat[i] === el.hab_name);
      an_hab = await req.context.models.habitats.findAll({
        attributes: ["hab_id", "hab_name"],
        where: { hab_id: hab[0].hab_id },
        include: [
          {
            model: req.context.models.hab_lines,
            as: "hab_lines",
            attributes: [
              "hablines_pet_id",
              "hablines_hab_id",
              "hablines_weight",
            ],
          },
        ],
      });

      const { hab_id, hab_name, hab_lines } = an_hab[0].dataValues;

      const newHab = hab_lines.map((el) => ({ ...el.dataValues }));
      // get biggest weight habitat
      newHab.sort((a, b) => {
        return a.hablines_weight - b.hablines_weight;
      });
      //final score
      const weight_hab = 0.4 / habitat.length;

      for (let j = 0; j < newHab.length; j++) {
        if (
          parseFloat(newHab[newHab.length - 1].hablines_weight) ===
          parseFloat(0)
        ) {
          const score_habitat =
            parseFloat(weight_hab) *
            (parseFloat(newHab[j].hablines_weight) / 1);
          const score_pet = {
            pet_id: newHab[j].hablines_pet_id,
            hab_score: parseFloat(score_habitat),
          };
          final_score_hab.push(score_pet);
          pet_id.push(newHab[j].hablines_pet_id);
        } else {
          const score_habitat =
            parseFloat(weight_hab) *
            (parseFloat(newHab[j].hablines_weight) /
              parseFloat(newHab[newHab.length - 1].hablines_weight));
          const score_pet = {
            pet_id: newHab[j].hablines_pet_id,
            hab_score: parseFloat(score_habitat),
          };
          final_score_hab.push(score_pet);
          pet_id.push(newHab[j].hablines_pet_id);
        }
      }
    }

    //final score habitat per animal
    let final_score_habitat = [];
    let pet_id1 = [...new Set(pet_id)];

    for (let k = 0; k < pet_id1.length; k++) {
      let total_score = 0;
      for (let l = 0; l < final_score_hab.length; l++) {
        if (pet_id1[k] === final_score_hab[l].pet_id) {
          total_score = total_score + final_score_hab[l].hab_score;
        } else {
          total_score = total_score;
        }
      }
      const score_habitat = {
        pet_id: pet_id1[k],
        hab_score: total_score,
      };
      final_score_habitat.push(score_habitat);
    }

    //sort descending
    final_score_habitat.sort((a, b) => {
      return a.pet_id - b.pet_id;
    });

    console.log("final score habitat: ", final_score_habitat);

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //score habitat
    //list animal habitat with score
    let crite = [];
    let an_crite = [];
    let final_score_crite = [];
    let an_pet_id = [];

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
      console.log("newcrite : ", newCrite[newCrite.length - 1].critelines_weight);

      // get biggest weight habitat
      newCrite.sort((a, b) => {
        return a.critelines_weight - b.critelines_weight;
      });

      //final score
      const weight_crite = 0.6 / criteria.length;

      for (let j = 0; j < newCrite.length; j++) {
        if (
          parseFloat(newCrite[newCrite.length - 1].critelines_weight) ===
          parseFloat(0)
        ) {
          const score_criteria =
            parseFloat(weight_crite) *
            (parseFloat(newCrite[j].critelines_weight) / 1);
          const score_pet = {
            pet_id: newCrite[j].critelines_pet_id,
            crite_score: parseFloat(score_criteria),
          };
          final_score_crite.push(score_pet);
          an_pet_id.push(newCrite[j].critelines_pet_id);
        } else {
          const score_habitat =
            parseFloat(weight_crite) *
            (parseFloat(newCrite[j].critelines_weight) /
              parseFloat(newCrite[newCrite.length - 1].critelines_weight));
          const score_pet = {
            pet_id: newCrite[j].critelines_pet_id,
            crite_score: parseFloat(score_habitat),
          };
          final_score_crite.push(score_pet);
          an_pet_id.push(newCrite[j].critelines_pet_id);
        }
      }
    }
    console.log("final score hab per criteriaa: ", final_score_crite);
    //final score habitat per animal
    let final_score_criteria = [];
    let pet_id2 = [...new Set(an_pet_id)];
 

    for (let k = 0; k < pet_id2.length; k++) {
      let total_score = 0;
      for (let l = 0; l < final_score_crite.length; l++) {
        if (pet_id1[k] === final_score_crite[l].pet_id) {
          total_score = total_score + final_score_crite[l].crite_score;
        } else {
          total_score = total_score;
        }
      }
      const score_criteria = {
        pet_id: pet_id1[k],
        crite_score: total_score,
      };
      final_score_criteria.push(score_criteria);
    }

    //sort descending
    final_score_criteria.sort((a, b) => {
      return a.pet_id - b.pet_id;
    });

    console.log("final score criteria: ", final_score_criteria);

    //perankingan
    let final_score = 0;
    let list_final_score=[]
    for (let l = 0; l < final_score_habitat.length; l++) {
      final_score = parseFloat(final_score_habitat[l].hab_score) + final_score_criteria[l].crite_score

      const score_pet = {
        pet_id: final_score_habitat[l].pet_id,
        pet_name:final_score_habitat[l].pet_name,
        crite_score: final_score,
      };
      list_final_score.push(score_pet);
    }

    // get biggest score
    list_final_score.sort((a, b) => {
      return a.crite_score - b.crite_score;
    });

    //get result recommendation
    

    const result_pet = await req.context.models.pets.findOne({
      attributes: ["pet_id", "pet_name","pet_desc","pet_url_image"],
      where: { pet_id: list_final_score[list_final_score.length-1].pet_id },
      include: [
        {
          model: req.context.models.pet_images,
          as: "pet_images",
          attributes: [
            "petimg_filename",
            "petimg_filesize",
            "petimg_filetype",
          ],
        },
      ],
    });

    return res.send(result_pet);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default {
  recomResult,
};
