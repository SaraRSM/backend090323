let mongo = require('mongoose');

//mongo tiene id autoincremental

const productSchema = new mongo.Schema ({
    id: Number,
    name: {type: String, required:true},
    description: {type: String, required: true},
    //validacion {}
    price: {type: Number, min:0},
    stock: Number,
    images: [String],
});

module.exports = mongo.model('Producto',productSchema);