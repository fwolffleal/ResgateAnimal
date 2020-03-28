const connection = require('../database/connection');
const uuid = require('uuid');

module.exports = {
    async create(request, response) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf
        } = request.body;
    
        const id = uuid.v4().toString();
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
    
        return response.json({ id });
    },

    async list(request, response) {
        const ong = await connection('ongs').select('*');
    
        return response.json(ong);
    },

    async get(request, response) {
        const { id } = request.params;
        
        const ong = await connection('ongs')
        .where('id', id)
        .select('*');
    
        return response.json(ong);
    },
};
