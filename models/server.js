const express = require('express');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//!recogemos las rutas de la app
		this.usuariosPath = '/api/usuarios';

		//!Middlewares

		this.middlewares();

		//!rutas de mi aplicación
		this.routes();
	}

	//use es la clave para decir que es un middleware
	middlewares() {
		//CORS
		this.app.use(cors());
		//lectura y parseo del body--peticiones post

		this.app.use(express.json());
		//*directorio público
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.usuariosPath, require('./routes/usuarios'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('servidor corriendo en puerto', this.port);
		});
	}
}

module.exports = Server;
