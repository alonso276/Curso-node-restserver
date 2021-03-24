const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'el nombre es obligatorio'],
	},

	correo: {
		type: String,
		required: [true, 'el correo es obligatorio'],
		unique: true,
	},

	password: {
		type: String,
		required: [true, 'la contraseña es  obligatoria'],
	},
	img: {
		type: String,
	},

	rol: {
		type: String,
		required: true,
		emun: ['ADMIN_ROLE', 'USER_ROLE'],
	},

	estado: {
		type: Boolean,
		default: true,
	},

	google: {
		type: Boolean,
		default: false,
	},
});

//sobreescribir métodos de Mongoose- quitar el password y version de mongo

UsuarioSchema.methods.toJSON = function () {
	const { __v, password, ...usuario } = this.toObject();
	return usuario;
};

//mongoose le pone una S por defecto
module.exports = model('Usuario', UsuarioSchema);
