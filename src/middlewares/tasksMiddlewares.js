const multer = require('multer');

const validateFieldTitle = (req, res, next) => {
    const { body } = req;

    if (body.title === undefined) {
        return res.status(400).json({ message: 'The field "TITLE" is required' })
    }

    if (body.title === '') {
        return res.status(400).json({ message: 'The field "TITLE" cannot be empty' })
    }

    next();
};

const validateFieldStatus = (req, res, next) => {
    const { body } = req;

    if (body.status === undefined) {
        return res.status(400).json({ message: 'The field "STATUS" is required' })
    }

    if (body.status === '') {
        return res.status(400).json({ message: 'The field "STATUS" cannot be empty' })
    }

    next();
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage });


module.exports = {
    validateFieldTitle,
    validateFieldStatus,
    upload,
}