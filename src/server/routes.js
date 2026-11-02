const postPredictHandler = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000, // 1MB limit
            },
        },
    },
];

module.exports = routes;
