const { Segments, Joi } = require('celebrate');

module.exports = {
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().uuid().required(),
    })
};