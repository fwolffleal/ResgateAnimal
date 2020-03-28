const connection = require('../database/connection');
const uuid = require('uuid');

module.exports = {
    async create(request, response) {
        const {
            title,
            description,
            value
        } = request.body;
    
        const incident_id = uuid.v4().toString();

        const { ong_id } = request.headers;
    
        const result = await connection('incidents').insert({
            id: incident_id,
            title,
            description,
            value,
            ong_id,
        });
    
        return response.json({ "id": incident_id});
    },

    async list(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(
            [
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]
        );

        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    async get(request, response) {
        const { id } = request.params;
        
        const incident = await connection('incidents')
        where('id', id)
        .select('*');
    
        return response.json(incident);
    },

    async delete(request, response) {
        const { id } = request.params;
        const { ong_id } = request.headers;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).send();
        }

        await connection('incidents')
        .where('id', id)
        .delete();

        return response.status(204).send();
    },

    async deleteAll(request, response) {
        const { ong_id } = request.headers;

        const incident = await connection('incidents')
        .where('ong_id', ong_id)
        .delete();

        return response.status(204).send();
    },
};
