//crear funciones y exportarlas
const { response, request } = require('express');
//!importamos modelo usuario- U mayúscula para crear instancias de mi modelo
const Usuario = require('../models/usuario');

//!bcrypt

const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
	const { limite = 5, desde = 0 } = req.query;
	//el usuario tiene que estar activo
	const query = { estado: true };
	// const usuarios = await Usuario.find(query)
	// 	.skip(Number(desde))
	// 	.limit(Number(limite));

	// const total = await Usuario.countDocuments(query);

	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({
		total,
		usuarios,
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
	res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {
	const { id } = req.params;

	//borrar físicamente
	// const usuario = await Usuario.findByIdAndDelete(id);

	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json(usuario);
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
};
