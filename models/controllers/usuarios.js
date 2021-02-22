//crear funciones y exportarlas
const { response, request } = require('express');

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

const usuariosPost = (req, res = response) => {
	const body = req.body;
	//another way
	// const {nombre,edad}=req.body
	res.json({
		msg: 'get API-post',
		body,
	});
};

const usuariosPut = (req, res = response) => {
	const { id } = req.params;
	res.json({
		msg: 'get API-put',
		id,
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
