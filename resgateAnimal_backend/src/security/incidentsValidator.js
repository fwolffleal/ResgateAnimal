const { Segments, Joi } = require('celebrate');

module.exports = {
    getAllIncidents: {
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number().required().min(1),
        }),
    },
    deleteIncidentValidator: {
        [Segments.HEADERS]: Joi.object({
            ong_id: Joi.string().required(),
        }).unknown(),
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
    },
    
    deleteAllIncidentsValidator: {
        [Segments.HEADERS]: Joi.object({
            ong_id: Joi.string().required(),
        }).unknown(),
    }
};