
const createCriteImage = async (req, res,next) => {
    const { files, fields } = req.fileAttrb;
    const crite_id = req.crite_id;

    let crite_image = {
        criteimg_filename: undefined,
        criteimg_filesize: undefined,
        criteimg_filetype: undefined,
        criteimg_crite_id: undefined
    }

    const list_images = [];

    files.forEach(el => {
        crite_image = {
            criteimg_filename: el.file.newFilename,
            criteimg_filesize: el.file.size,
            criteimg_filetype: el.file.mimetype,
            criteimg_crite_id: crite_id
        }
        list_images.push(crite_image)
    });
    //insert into pet_images
    //next();
    try {
        const result = await req.context.models.crite_images.bulkCreate(
            list_images
        );
        req.crite_id = crite_id;
        next();
    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}


export default {
    createCriteImage
}