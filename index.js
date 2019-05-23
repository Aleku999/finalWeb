var express = require('express');

var app = express();

var renderMotor = require ('express-handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');

app.engine('handlebars', renderMotor());

var fs = require ('fs');

var visitas = {};

visitas.general = [];

visitas.registro = [];

fs.readFile(__dirname + '/registro.txt', (err, data) => {
    if (err) {

    } else {
        visitas = JSON.parse(data);
    }

});


app.get('/', function (request, response) {
    response.render('index', { layout: false });
    contarVisitas("index");
});

app.get('/contacto', function (request, response) {
    response.render('page', { layout: false });
    contarVisitas("page");
});
app.get('/info', function (request, response) {
    response.render('info', { layout: false });
    contarVisitas("info");
});
app.get('/admin', function (request, response) {
    response.render('admin', { layout: false, visitas:visitas});
});


function contarVisitas(url) {
    if (visitas.general.length != 0) {
        let encontrado = false;
        visitas.general.forEach((vis, index) => {
            if (vis.url == url) {
                vis.visitas++;
                let vist = vis.visitas;
                encontrado = true;
                visitas.registro.push({ url: url, visitas: vist, fecha: new Date() });
            }
        });


        if (encontrado == false) {
            visitas.general.push({ url: url, visitas: 1, fecha: new Date() });
            visitas.registro.push({ url: url, visitas: 1, fecha: new Date() });
        }

    } else {
        visitas.general.push({ url: url, visitas: 1, fecha: new Date() });
        visitas.registro.push({ url: url, visitas: 1, fecha: new Date() });
    }

    fs.writeFile('registro.txt', JSON.stringify(visitas), 'utf8', function () { });
}

  
app.listen(4000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
  });