const express = require('express');
const cors = require('cors');
//?conectar a la base de datos 1/3
const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//!recogemos las rutas de la app
		this.usuariosPath = '/api/usuarios';

		//? 2/3 conectar a la base de datos
		this.conectarDB();

		//!Middlewares

		this.middlewares();

		//!rutas de mi aplicación
		this.routes();
	}
	//? 3/3 conectar a la base de datos
	async conectarDB() {
		await dbConnection();
	}

	//use es la clave para decir que es un middleware
	middlewares() {
		//*CORS
		this.app.use(cors());
		//*lectura y parseo del body--peticiones post

		this.app.use(express.json());
		//*directorio público
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.usuariosPath, require('../routes/usuarios'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('servidor corriendo en puerto', this.port);
		});
	}
}

module.exports = Server;
