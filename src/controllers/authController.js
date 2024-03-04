const app = require('../config/firebase');
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} = require('firebase/auth');
const auth = getAuth(app);

const authController = {
    //Formulario de regitro de usuario
    createUser(req,res) {
        let html = '';
        res.send(
            `<!DOCTYPE html>
            <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/styles.css">
                    <title>Tienda</title>
                </head>
                <body>
                    <div class ="register">
                        <form action="/register" id="register" method="post" class="form-register">
                            <h1>Registrarse</h1>
                            <label for="user">Email:</label>
                            <input type="email" id="user" name="user" required>
                            <label for="password">Contraseña:<label>
                            <input type="password" id="password" name="password" required>
                        </form> 
                    </div>
                    <div class="buttons">
                        <button type="submit" form="register">Crear</button>
                        <a href="/products"><button>Volver</button></a>
                    </div>
                </body>      
            </html>      
        `)  
    },
    loginUserform(req,res) {
            res.send(`<!DOCTYPE html>
            <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/styles.css">
                    <title>Tienda</title>
                </head>
                <body>
                    <div class ="register">
                        <form action="/login" id="login" method="post" class="form-Login">
                            <h1>Identificarse</h1>
                            <label for="user">Email:</label>
                            <input type="email" id="user" name="user">
                            <label for="password">Contraseña:<label>
                            <input type="password" id="password" name="password">   
                        </form> 
                    </div>
                    <div class="buttons">
                        <button type="submit" form="login">Acceder</button>
                        <a href="/register"><button>Registrarse</button></a>
                        <a href="/products"><button>Volver</button></a>
                    </div>
                </body>      
            </html>
            `)
    },
    // Funcion para guardar el usuario registrado
    async saveUser(req,res) {
        try {
            const { user, password} = req.body;
            console.log(req.body);
            auth().createUserWithEmailAndPassword(user, password)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log(user);
                res.redirect('/dashboard');
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(error);
            })
            
        } catch (err) {
            res.redirect('/register');
        };
    },

    async loginUser(req,res) {
        const {email, password} = req.body;
        app.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
        res.redirect('/dashboard')
    },

    async logout(req,res) {
        await firebase.auth().signOut()
        res.redirect('/products');
    }
}

module.exports = authController;

