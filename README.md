# Tienda de ropa
Esta es una aplicación en Node.js utilizando Express con mongoose para crear una tienda de ropa con un catálogo de productos y un dashboard para el administrador. Los productos se guardarán en una base de datos de mongo en Atlas.

## Estructura de archivos

La aplicación 'Tienda de ropa' posee la siguiente estructura de archivos en su proyecto backend. 

├── src
│   ├── config
│   │   ├── config.js
│   │   ├── db.js 
│   │   └── firebase.js
│   ├── controllers
│   │   ├── apiController.js
│   │   ├── authController.js 
│   │   └── productController.js
│   ├── docs.js
│   │   ├── basicInfo.js
│   │   ├── components.js
│   │   ├── index.js
│   │   └── products.js
│   ├── middlewares 
│   │   └── fireMiddleware.js
│   ├── models
│   │   └── Product.js
│   ├── routes
│   │   ├── apiRoutes.js
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   ├── index.js
│   └── test 
│       └── productController.test.js
├── public
│   ├── styles.css
│   └── images 
├── .env
└── package.json


### Características de los archivos


- `config/config.js`: Archivo que contiene la configuración de crypto y bcrypt, para crear encriptaciones y realizar la funcion de hash de estas. 
- `config/db.js`: Archivo que contiene la configuración de la base de datos, y por el que se conecta a esta, a través de mongo en Atlas.
- `config/firebase.js`: Archivo que contiene la configuración de firebase. Inicia la conexión con firebase.

- `controllers/apiController.js`: Archivo que contiene la lógica para manejar las solicitudes CRUD de los productos. Devuelve las respuestas en formato json.
- `controllers/authController.js`: Archivo que contiene la lógica para manejar la autenticación de usuario y la realización del registro, login y logout.
- `controllers/productController.js`: Archivo que contiene la lógica para manejar las solicitudes CRUD de los productos. Devuelve las respuestas en formato HTML.

- `docs/basicInfo.js`: Archivo en el que se encuentra información básica de la Api para la documentación visualizada gracias a Swagger.
- `docs/components.js`: Archivo donde se encuentran los componentes reutilizables para la documentación visualizada gracias a Swagger. 
- `docs/index.js`: Lugar en el que se encuentran los archivos importados y desde el que exportaremos la documentación posteriormente visualizada gracias a Swagger.
- `docs/products.js`: Archivo que contiene los endpoints para la navegación,  funcionamiento y visualización dentro de la especificación de open Api.

- `middlewares/fireMiddleware.js`: Archivo que contiene el middleware para comprobar si el usuario está autenticado. Este busca la sesión del usuario y, si no la encuentra, redirige al formulario de login utilizando Firebase.


- `models/Product.js`: Archivo que contiene la definición del esquema del producto utilizando Mongoose.


- `routes/apiRoutes.js`: Archivo que contiene la definición de las rutas para la Api Rest. Este llama a los métodos del controlador apiController.js.
- `routes/authRoutes.js`: Archivo que contiene la definición de las rutas de autenticación de usuario en sesión. Este llama a los metodos del controlador authController.js.
- `routes/productRoutes.js`: Archivo que contiene la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador productController.js.


- `index.js`: Archivo principal que inicia el servidor Express. Importa las rutas y las usa. También está configurado para servir archivos estáticos y para leer el body de las peticiones de formularios.


- `test/productController.test.js`: Archivo en el que se encuentran todas las pruebas o test del funcionamiento de nuestra aplicación. Algunas de ellas usando 'Mock functions' o funciones simuladas.



- `public/styles.css`: Archivo que contiene los estilos de la aplicación.
- `public/images`: Carpeta que contiene las imágenes de los productos.


- `.env`: Archivo que contiene las variables de entorno. Contiene la uri de la base de datos de Atlas conjunta para los dos usuarios, el puerto de la aplicación y la palabra secreta para la sesión.


- `package.json`: Archivo que contendrá las dependencias del proyecto. Crearemos un script para iniciar el servidor con node y otro para iniciar el servidor con nodemon.("start": "node src/index.js", "dev": "nodemon src/index.js").




## Endpoints de la App

La aplicación 'Tienda de ropa' contiene diferentes rutas según sea para el uso del cliente comprador o ya sea para el uso del administrador/es de la app.

#### - Para el uso del cliente, los endpoints a los cuales puede acceder son:

- `router.get('/products/', productController.showProducts)`: Devuelve todos los productos. Cada uno de ellos dispone de un enlace a su página de detalle.
- `router.get('/products/:productId', productController.showProductById)`: Devuelve el detalle de un producto concreto.

##### Además, el backend dispone de un rutado especifico, el cual devuelve los datos en formato json.

- `router.get('/products', apiController.showProductsApi)`: Devuelve todos los productos. Cada uno de ellos dispone de un enlace a su página de detalle.
- `router.get('/products/:productId', apiController.showProductByIdApi)`: Devuelve el detalle de un producto concreto.

#### - Para el uso del administrador.

La aplicación 'Tienda de ropa' esta especialmente pensada para el uso en el backend de los administradores de esta. Por ello dispone de un sistema de autenticación, la encriptacion y el hash realizado por crypto y bcrypt, mientras que el middleware de sesión autenticada comprobada gracias a la configuración del proyecto en `firebase`. 

- `router.get('/login/',authController.loginUserform)`: Devuelve el formulario para realizar el login al usuario/administrador. La respuesta devuelta viene en formato HTML. Desde aqui tambien podemos acceder a crear un alta como usuario/administrador. 
- `router.post('/login/', authController.loginUser)`: Envia el email y el password aportado por el usuario/administrador, lo autentica y si las credenciales son correctas redirecciona al dashboard de productos de administrador, sino redirecciona de nuevo a login.

- `router.get('/register/', authController.createUser)`: Devuelve el formulario para realizar la creacion de usuario. La respuesta devuelta viene en formato HTML.

- `router.post('/register/', authController.saveUser)`: Guarda la autenticacion mediante email y contraseña del usuario creado y lo redirecciona al dashboard de productos de administrador.

- `router.get('/logout', authController.logout)`: Cierra sesión de usuario autenticada y redirecciona a la pagina principal.

##### Una vez el administrador ha sido autenticado los endpoints a los que puede acceder son:

- `router.get('/dashboard/', productController.showProductsLogin)`: Devuelve todos los productos. Cada uno de ellos dispone de un enlace a su página de detalle. 
- `router.get('/dashboard/:productId', productController.showProductByIdLogin)`: Devuelve el detalle de un producto concreto.
- `router.get('/dashboard/new', productController.showNewProductForm);`: Devuelve el formulario para la creación de un nuevo producto.
- `router.get('/dashboard/:productId/edit',productController.showEditProductForm)`: Devuelve el formulario para la edición de un producto concreto.
- `router.get('/dashboard/:productId/delete',productController.deleteProductById)`: Elimina un producto y devuelve un mensaje.


##### Como en la parte del cliente, el backend dispone de un rutado especifico, cuyas respuestas vienen entregadas en formato json.

- `router.post('/dashboard', apiController.createProductApi)`: Crea un nuevo producto y nos envía un mensaje de confirmación.
- `router.put('/dashboard/:productId', apiController.updateProductByIdApi)`: Modifica y actualiza un producto. También nos devuelve un mensaje de confirmación.
- `router.get('/dashboard/:productId/delete', apiController.deleteProductByIdApi)`: Elimina un producto y nos devuelve un mensaje de confirmación.


## Funcionamiento de la aplicación

La aplicación 'Tienda de ropa' esta desarrollada en Node.js. Para ello se han utilizado varias dependencias que explicaremos a continuación.

-`express`: Es el entorno de trabajo en el que se ha desarrollado la app y por el cual se ha lanzado un servidor el cual está escuchando por variable de entorno en:  http://localhost:${PORT};

-`express-session`: Es un middleware que almacena los datos de sesión en el servidor.

-`mongoose`: Es una librería de Node.js que nos permite realizar consultas y peticiones a bases de datos alojadas en MongoDB Atlas.

-`dotenv`: Es un módulo de dependencia cero que carga las variables de entorno desde un archivo, en nuestro caso, la clave para entrar en MongoDB, la clave o palabra secreta usada como autenticación.

-`crypto`: Herramienta que permite encriptar y desencriptar String en Node.js.

-`bcrypt`: Bcrypt es una función de hash de contraseñas y derivación de claves para contraseñas basada en el cifrado Blowfish.

-`swagger`: Es una infraestructura de visualización que puede analizar la especificación OpenAPI y generar una consola de API para que los usuarios puedan aprender y ejecutar las API REST de forma rápida y sencilla. En nuestro caso solo se ejecutarán las rutas "api".

-`jest`: Es una biblioteca de Node.js para crear, ejecutar y estructurar pruebas o test. En nuestro caso se han realizado los test a las funciones de la aplicación.

-`fl0`: Aunque no es una dependencia utilizamos el implementador de aplicaciones backend y bases de datos llamado `fl0` en el cual hemos creado nuestro proyecto y lo hemos desplegado.

-`firebase`: Es una solución creada por Google para el desarrollo de aplicaciones y mejora de partes de estas. En nuestro caso hemos desarrollado la autenticación del usuario/administrador.
