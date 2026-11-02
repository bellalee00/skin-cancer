const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const InputError = require('../exceptions/InputError');

async function postPredictHandler(request, h) {
    const { image } = request.payload;

    if (!image || image.hapi.bytes > 1000000) {
        throw new InputError('Payload content length greater than maximum allowed: 1000000');
    }

    const { model } = request.server.app;

    try {
        const { confidenceScore, label, suggestion } = await predictClassification(model, image._data);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            id,
            result: label === 'Cancer' ? 'Cancer' : 'Non-cancer',
            suggestion: suggestion,
            createdAt,
        };

        await storeData(id, data);

        const response = h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data,
        });
        response.code(201);
        return response;
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

module.exports = postPredictHandler;
