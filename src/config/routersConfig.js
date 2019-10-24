module.exports = (app, pool) => {
    app.use('/', require('../routers/search')(pool));
    app.use('/selishta', require('../routers/selishta')(pool));
}