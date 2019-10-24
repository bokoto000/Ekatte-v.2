const express = require("express");
const app = express();
const hbs = require("express-handlebars");

app.set("view engine", "hbs");
app.engine("hbs", hbs({
    extname:'hbs',
    defaultView:'default',
    layoutsDir: __dirname+'/views/pages/',
    partialsDit: __dirname+ '/views/partials'
}));

const port = process.env.PORT || 5000;
require(`./src/config/config.js`)(app);

app.listen(port,()=> console.log(`Listening on port ${port}`));

