const multer = require("multer");

const multerFilltering = (req, file, cb) => {
    if(
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        throw new Error("Image format is not valid!")
    }
}

const upload = multer({
    fileFilter: multerFilltering,
    // dest: 'public/images/users'
});

module.exports = upload;