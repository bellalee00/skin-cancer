const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const classes = ['Non-cancer', 'Cancer'];
        const prediction = model.predict(tensor);
        const probabilities = await prediction.data();
        const maxIndex = probabilities.indexOf(Math.max(...probabilities));
        const confidenceScore = probabilities[maxIndex] * 100;
        const label = classes[maxIndex];

        const suggestion = label === 'Cancer'
            ? 'Segera periksa ke dokter!'
            : 'Penyakit kanker tidak terdeteksi.';

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`);
    }
}

module.exports = predictClassification;
