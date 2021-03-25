// router
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
	esRoleValido,
	emailExiste,
	existeUsuarioPorId,
} = require('../helpers/db-validators');

const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put(
	'/:id',
	[
		check('id', 'no es un id válido').isMongoId(),
		check('id').custom(existeUsuarioPorId),
		check('rol').custom(esRoleValido),
		validarCampos,
	],
	usuariosPut
);

router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'el password debe de ser de más de 6 letras').isLength({
			min: 6,
		}),
		check('correo').custom(emailExiste),
		// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

		check('rol').custom(esRoleValido),
		validarCampos,
	],
	usuariosPost
);
router.delete('/', usuariosDelete);

module.exports = router;
