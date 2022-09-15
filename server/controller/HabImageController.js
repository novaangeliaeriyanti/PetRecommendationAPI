
const createHabImage = async (req, res,next) => {
    const { files, fields } = req.fileAttrb;
    const hab_id = req.hab_id;

    let hab_image = {
        habimg_filename: undefined,
        habimg_filesize: undefined,
        habimg_filetype: undefined,
        habimg_hab_id: undefined
    }

    const list_images = [];

    files.forEach(el => {
        hab_image = {
            habimg_filename: el.file.newFilename,
            habimg_filesize: el.file.size,
            habimg_filetype: el.file.mimetype,
            habimg_hab_id: hab_id
        }
        list_images.push(hab_image)
    });
    //insert into pet_images
    //next();
    try {
        const result = await req.context.models.habi_images.bulkCreate(
            list_images
        );
        req.hab_id = hab_id;
        next();
    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}


export default {
    createHabImage
}