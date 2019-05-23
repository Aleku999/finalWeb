var express = require('express');
var app = express();
var renderMotor = require ('express-handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'handlebars');
app.engine('handlebars', renderMotor());
var fs = require ('fs');
var productos = [];
productos.push({ 
  titulo: 'Perro',
  precio: '20000',
  imagen: "",
  descripcion: '',
}

);
productos.push({
  titulo: 'Gato',
  precio: '19220',
  imagen: "",
  descripcion: '',
});
productos.push({
    titulo: 'Hamster',
    precio: '2000',
    imagen: "",
    descripcion: '',
  });