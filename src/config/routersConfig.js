module.exports = (app, pool) => {
    app.use('/', require('../routers/search')(pool));
    app.use('/stats', require('../routers/stats')(pool));
}