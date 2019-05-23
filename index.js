var express = require('express');

var app = express();

var renderMotor = require ('express-handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

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

  
app.get('/', function(request,response){
    var contexto = {
        titulo: 'Productos',
        listaProductos: productos,
        layout:false
      };
    response.render('index',contexto);
    
});
app.get('/:producto', function(req,res){
    var contexto={ layout:false};
    productos.forEach(function(producto){
  
      if(producto.titulo == req.params.producto){
        contexto.producto;
      }
    });
 
      res.render('page',contexto);
    
    
  });

  
app.listen(4000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
  });