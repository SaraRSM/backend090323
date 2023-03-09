var express = require('express');
var router = express.Router();
const productModel = require('../models/productModel');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const resultado = await productModel.find();
  res.json(resultado);
});

//POST - Agregar un producto
router.post('/', async function(req, res, next) {
  //envia el nombre que se le asigno
  let datos = {
    id: req.body.id, 
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    images: req.body.images
  };
let product = new productModel(datos);
let resultado = await product.save();

  res.send('Registro agregado exitosamente');
});

//PUT - Editar un producto
  router.put("/", async function (req, res, next) {
    const filter = {id: req.query.id}; //Condición de Query
    const update = {name: req.query.name}; //Campos a modificar
  
    const resultado = await productModel.findOneAndUpdate(filter, update, {
      new:true,
      upsert: true
    });
  
    res.json("Se actualiza el producto");
  });

//DELETE 
  router.delete('/:id', async function(req, res, next) {
    const resul = await productModel.find({id: req.params.id}).exec();
    if (resul.length > 0) {
      await productModel.deleteOne({id: req.params.id});
      res.json("Se ha eliminado el producto");
    } else {
      res.json({error: "No se encontró el producto con ID: " + req.params.id})
    }
  });


module.exports = router;
