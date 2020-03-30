const { Segments, Joi } = require('celebrate');

module.exports = {
    [Segments.HEADERS]: Joi.object({
        ong_id: Joi.string().uuid().required(),
    }).unknown(),
};