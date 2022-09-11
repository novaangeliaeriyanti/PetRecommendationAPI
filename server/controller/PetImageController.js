
const createPetImage = async (req, res) => {
    const { files, fields } = req.fileAttrb;
    const pet_id = req.pet_id;

    let pet_image = {
        petimg_filename: undefined,
        petimg_filesize: undefined,
        petimg_filetype: undefined,
        petimg_prod_id: undefined
    }

    const list_images = [];

    files.forEach(el => {
        pet_image = {
            petimg_filename: el.file.newFilename,
            petimg_filesize: el.file.size,
            petimg_filetype: el.file.mimetype,
            petimg_pet_id: pet_id
        }
        list_images.push(pet_image)
    });
    //insert into pet_images
    //next();
    try {
        const result = await req.context.models.pet_images.bulkCreate(
            list_images
        );
        res.send(result);
    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}

const createPetImageV2 = async (req, res,next) => {
    const { files, fields } = req.fileAttrb;
    const pet_id = req.pet_id;
    
    let pet_image = {
        petimg_filename: undefined,
        petimg_filesize: undefined,
        petimg_filetype: undefined,
        petimg_prod_id: undefined
    }

    const list_images = [];

    files.forEach(el => {
        pet_image = {
            petimg_filename: el.file.newFilename,
            petimg_filesize: el.file.size,
            petimg_filetype: el.file.mimetype,
            petimg_pet_id: pet_id
        }
        list_images.push(pet_image)
    });
    //insert into pet_images
    //next();
    try {
        const result = await req.context.models.pet_images.bulkCreate(
            list_images
        );
        //res.send(result);
        next();
    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}


// const findProdImagesById = async (req, res) => {
//     const prodId = req.prodId;
//     try {
//         const result = await req.context.models.products_images.findAll(
//             { where: { prim_prod_id: parseInt(prodId) } }
//         );
//         return res.send(result);
//     } catch (error) {
//         return res.send(404).send(error);
//     }

// }

export default {
    createPetImage,
    createPetImageV2
}