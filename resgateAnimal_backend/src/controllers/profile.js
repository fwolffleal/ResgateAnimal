const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const { ong_id } = request.headers;
        
        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');
    
        return response.json(incidents);
    }
};
