//crear funciones y exportarlas
const { response, request } = require('express');
//!importamos modelo usuario- U mayúscula para crear instancias de mi modelo
const Usuario = require('../models/usuario');

//!bcrypt

const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {
	const query = req.query;
	//another way
	// const{q,nombre='No name', apiKey,page=1,limit}=req.query
	res.json({
		msg: 'get API-controlador',
		//q
		//nombre
		//apikey
		//page
		//limit
		query,
	});
};

const usuariosPost = async (req, res = response) => {
	// const body = req.body;
	// const usuario = new Usuario(body);

	//!grabar solo los campos obligatorios
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	//?verificar si correo existe

	//? encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	//?guardar en base de datos

	await usuario.save();

	//another way
	// const {nombre,edad}=req.body

	res.json({
		usuario,
	});
};

const usuariosPut = async (req, res = response) => {
	const { id } = req.params;
	//extraigo la info que voy a utilizar Desestructuración +rest
	const { _id, password, google, correo, ...resto } = req.body;

	//todo validar contra base de datos

	if (password) {
		//encriptar contraseña
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	//la respuesta de postman
	res.json({
		msg: 'get API-put',
		usuario,
	});
};

const usuariosDelete = (req, res = response) => {
	res.json({
		msg: 'get API-del',
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
};
