const express = require("express");
const app = require('express')();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var admin = require("firebase-admin");
var serviceAccount = require("firebase")


// BASE DE DATOS
const mongoose = require("mongoose");
const ecommerceModel = require("./models/ecommerce.js");



const producto = require('./api/producto');

const carrito = require('./api/carrito');
const mensaje = require('.api/mensaje.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = express.Router();
app.use('/productos', routerProductos);

const routerCarrito = express.Router();
app.use('/carrito', routerCarrito);

const routerMensajes = express.Router();
app.use('/mensaje', routerMensajes);

const port = 8080;
const server = app.listen(port, () => {
  console.info(`Servidor listo en el puerto ${port}`);
});

server.on("error", (error) => {
    console.error(error);
  });

// Ejs

app.set("views", "./views");
app.set("view engine", "ejs");

// Administrador 

const youAreAdmin = true;


/////////////////////////////////////////////
// Rutas de Productos
app.get('/', (req, res) => {
  res.render('pages/index')
})

// Trae todo el listado de producto
routerProductos.get("/listar", (req, res) => {
   
CRUD()  
async function CRUD() {
  try {
  const URL = 'mongodb://localhost:27017/ecommerce';
  let rta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Base de datos conectada")

  if(!producto.getArray().length){ 
    res.json({error: 'producto no encontrado'});
  }
  res.json(producto.getArray());
  console.log(producto.getArray())

  let productosListados = await ecommerceModel.productos.find()
  console.log(productosListados)

  mongoose.disconnect(() => {
    console.log("Base de datos desconectada");
  });

  }catch (error){
    console.log(error);
  }
}
});

// Traer producto por id

routerProductos.get("/listar/:id", (req, res) => {
    
  CRUD()  
async function CRUD() {
  try {
  const URL = 'mongodb://localhost:27017/ecommerce';
  let rta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Base de datos conectada")

  const id = req.params.id;
    if(!producto.getProductById(id)){
        res.json({error: 'producto no encontrado'});
    }
    const productoById = producto.getProductById(id);
    console.log(productoById)
    res.json(productoById);
    res.status(200).send()

    let productosListados = await ecommerceModel.productos.find({id: id})
    console.log(productosListados)

  mongoose.disconnect(() => {
    console.log("Base de datos desconectada");
  });

  }catch (error){
    console.log(error);
  }
}
});


// Agregar un producto
routerProductos.post("/agregar", (req, res) => {

CRUD()

async function CRUD() {
  try {
    const URL = 'mongodb://localhost:27017/ecommerce';
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Base de datos conectada")

    if(youAreAdmin){
      const nuevoProducto = req.body;  
      producto.addElement(nuevoProducto);
      res.sendStatus(201);

      const productodb = nuevoProducto;
      const productoSaveModel = new ecommerceModel.productos(productodb);
      let productoSave = await productoSaveModel.save()
      console.log(productoSave)
      
      mongoose.disconnect(() => {
        console.log("Base de datos desconectada");
      });
    }else{
      res.json({error: 'Usted no tiene los permisos para agregar productos'})
    }  

  }catch (error){
    console.log(error);
  }
}
  });


// Actualizar un producto

routerProductos.put("/actualizar/:id", (req, res) => {
    
CRUD()
async function CRUD() {
  try {
    const URL = 'mongodb://localhost:27017/ecommerce';
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Base de datos conectada")

    if(youAreAdmin){
      const id = req.params.id;
      const productUpdt = req.body;
      console.log(productUpdt)
    
      if(!producto.getProductById(id)){
        res.json({error: 'producto no encontrado'});
      }
      res.json(producto.updateElement(id, productUpdt));
      
      let productoUpdate = await ecommerceModel.productos.updateOne({id: id})
      console.log(productoUpdate)
  }else{
    res.json({error: 'Usted no tiene los permisos para modificar productos'})
  }

  }catch (error){
  console.log(error);
}}
  
})
    
// Borrar producto 

routerProductos.delete("/borrar/:id", (req, res) => {
    
CRUD()

async function CRUD() {
  try {
    const URL = 'mongodb://localhost:27017/ecommerce';
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Base de datos conectada")

    if(youAreAdmin){
      const id = req.params.id;
      if(!producto.getProductById(id)){
        res.json({error: 'producto no encontrado'});
      }
      producto.deleteElement(id)
      res.json(producto.getProductById(id));

      let productoDelete = await ecommerceModel.productos.deleteOne({id: id})
      console.log(productoDelete)
  }
  else{
    res.json({error: 'Usted no tiene los permisos para borrar productos'})
  }
  }catch (error){
    console.log(error);
  }
}  
})

////////////////////////////////////////
// Rutas de Carrito

// Trae todo el listado de producto
routerCarrito.get("/listar", (req, res) => {
CRUD()  

async function CRUD() {
try {
const URL = 'mongodb://localhost:27017/ecommerce';
let rta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  console.log("Base de datos conectada")

if(!carrito.getArray().length){ 
    res.json({error: 'producto no encontrado'});
}
res.json(carrito.getArray());
console.log(carrito.getArray())

const productosEnLista = res.json(carrito.getArray());

let productosListados = await ecommerceModel.carrito.find()
console.log(productosListados)

mongoose.disconnect(() => {
    console.log("Base de datos desconectada");
  });

  }catch (error){
    console.log(error);
  }
} 
});


// Traer producto por id
routerCarrito.get("/listar/:id", (req, res) => {
  CRUD()  
async function CRUD() {
  try {
  const URL = 'mongodb://localhost:27017/ecommerce';
  let rta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Base de datos conectada")

  const id = req.params.id;
  if(!carrito.getProductById(id)){
      res.json({error: 'producto no encontrado'});
  }
  const productoById = carrito.getProductById(id);
  console.log(productoById)
  res.json(productoById);
  res.status(200).send()

let productosListados = await ecommerceModel.carrito.find({id: id})
console.log(productosListados)

  mongoose.disconnect(() => {
    console.log("Base de datos desconectada");
  });

  }catch (error){
    console.log(error);
  }
}
});


// Agregar un producto
routerCarrito.post("/agregar/:id", (req, res) => {
  
CRUD()  
async function CRUD() {
  try {
  const URL = 'mongodb://localhost:27017/ecommerce';
  let rta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Base de datos conectada")

  const id = req.params.id;
  const nuevoProducto = producto.getProductById(id);  
  console.log(nuevoProducto)
  carrito.addElement(nuevoProducto);
  res.sendStatus(201);
  const productosEnLista = carrito.getArray();

  const productodb = nuevoProducto;
  const productoSaveModel = new ecommerceModel.carrito(productodb);
  let productoSave = await productoSaveModel.save()
  console.log(productoSave)

  mongoose.disconnect(() => {
    console.log("Base de datos desconectada");
  });

  }catch (error){
    console.log(error);
  }
}
});

// Borrar producto 

routerCarrito.delete("/borrar/:id", (req, res) => {
  
CRUD()  
async function CRUD() {
  try {
  const URL = 'mongodb://localhost:27017/ecommerce';
  let rta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Base de datos conectada")

  const id = req.params.id;
  if(!carrito.getProductById(id)){
    res.json({error: 'producto no encontrado'});
  }
  carrito.deleteElement(id)
  res.json(carrito.getProductById(id));

  let productoDelete = await ecommerceModel.carrito.deleteteOne({id: id})
      console.log(productoDelete)

  mongoose.disconnect(() => {
    console.log("Base de datos desconectada");
  });

  }catch (error){
    console.log(error);
  }
}    
})

// Rutas de mensajes
routerMensajes.post("/enviar", (req, res) => {

  CRUD()
  
  async function CRUD() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Base de datos conectada")
    const db =admin.firestore();
    const query = db.collection("messages")
    try {

        const nuevoMensaje = req.body;  
        res.sendStatus(201);
  
        const mensajedb = nuevoMensaje;
        let doc = query.doc();
        
        await doc.create(mensajeModel)
        console.log(mensajeSave)
        

    }catch (error){
      console.log(error);
    }
  }
    });
  