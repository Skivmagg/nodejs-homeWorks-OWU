const { errorCodesEnum } = require('../constant');
const {
    constants: {
        DOCS_MIMETYPES,
        FILE_MAX_SIZE,
        PHOTOS_MIMETYPES,
        PHOTO_MAX_SIZE,
        VIDEOS_MIMETYPES,
        VIDEO_MAX_SIZE
    }
} = require('../constant');
const ErrorHandler = require('../error/ErrorHandler');
const { errorMessage } = require('../message');

module.exports = {
    checkFileMiddleware: (req, res, next) => {
        try {
            const { files } = req;
            const docs = [];
            const photos = [];
            const videos = [];

            if (!files) {
                return next();
            }

            const allFiles = Object.values(files);
            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                            errorMessage.FILE_TOO_BIG.customCode,
                            `file ${name} is too big`);
                    }
                    photos.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (FILE_MAX_SIZE < size) {
                        throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                            errorMessage.FILE_TOO_BIG.customCode,
                            `file ${name} is too big`);
                    }

                    docs.push(allFiles[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                            errorMessage.FILE_TOO_BIG.customCode,
                            `file ${name} is too big`);
                    }

                    videos.push(allFiles[i]);
                } else {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                        errorMessage.NOT_VALID_FILE.customCode,
                        `file ${name} is too big`);
                }
            }

            req.docs = docs;
            req.photos = photos;
            req.videos = videos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (req.photos) {
                if (req.photos.length > 1) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                        errorMessage.WRONG_FILE_COUNT.customCode,
                        'You can upload only 1 file');
                }
                [req.avatar] = req.photos;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
