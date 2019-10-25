const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");

app.set("view engine", "hbs");
app.engine("hbs", hbs({
    extname:'hbs',
    defaultView:'null',
    layoutsDir: path.join(__dirname, '/src/views/pages/'),
    partialsDit:  path.join(__dirname, '/src/views/partials')
}));
app.set('views',path.join(__dirname,'src/views'))

console.log(__dirname+'/src/views/pages/');

const port = process.env.PORT || 5000;
require(`./src/config/config.js`)(app);

app.listen(port,()=> console.log(`Listening on port ${port}`));

