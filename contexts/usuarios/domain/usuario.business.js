const Usuario = require('./usuario.model');
const { crearToken } = require("../../../api/helpers/components");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");

class UsuarioBusiness {

    constructor({ UsuarioRepository }) {
        this._usuarioRepository = UsuarioRepository;
    }

    async getUsuarios() {
        const usuarios = await this._usuarioRepository.getFindAll();
        return usuarios;
    }

    async validarUsuario(usertoken) {
        const { usuarioId } = jwt.decode(usertoken, process.env.SECRET_PHRASE);
        const usuario = await this._usuarioRepository.getFindOne(usuarioId);
        return usuario;
    }

    async findUsuario(id) {
        const usuario = await this._usuarioRepository.getFindOne(id);
        return usuario;
    }

    async createUsuario(usuario) {
        usuario.clave_usuario = bcrypt.hashSync(
            usuario.clave_usuario,
            Number(process.env.NUM_BCRYPT)
        );
        const u = await this._usuarioRepository.postCreate(usuario);
        const usuarioRepo = await this._usuarioRepository.getFindOne(u.id_usuario);
        return usuarioRepo;
    }

    async loginUsuario(usuario) {
        const usuarioRepo = await this._usuarioRepository.getFindByEmail(usuario.email_usuario);
        if (usuarioRepo) {
            //compara las password
            if (bcrypt.compareSync(usuario.clave_usuario, usuarioRepo.clave_usuario)) {
                return {
                    id_usuario: usuarioRepo.id_usuario,
                    nombre_usuario: usuarioRepo.nombre_usuario,
                    email_usuario: usuarioRepo.email_usuario,
                    estado_usuario: usuarioRepo.estado_usuario,
                    id_sucursal: usuarioRepo.id_sucursal,
                    id_rol: usuarioRepo.id_rol,
                    userToken: crearToken(usuarioRepo),
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async updateUsuario(usuario, id) {

        const userdata = {
            userAt: usuario.userAt,
            nombre_usuario: usuario.nombre_usuario,
            email_usuario: usuario.email_usuario,
            id_rol: usuario.id_rol,
            id_sucursal: usuario.id_sucursal,
        };

        if (usuario.clave_usuario != "") {
            userdata.clave_usuario = bcrypt.hashSync(
                usuario.clave_usuario,
                Number(process.env.NUM_BCRYPT)
            );
        }
        await this._usuarioRepository.putUpdate(userdata, id);
        const usuarioRepo = await this._usuarioRepository.getFindOne(id);
        return usuarioRepo;
    }


    async stateUsuario(accion, userAt, id) {
        let state = null;
        let msg = "";
        if (accion == "inhabilitar") {
            state = false;
            msg = "usuario Inabilitado exitosamente";
        } else {
            state = true;
            msg = "usuario Habilitado exitosamente";
        }
        const data = { estado_usuario: state, userAt: userAt };
        await this._usuarioRepository.putUpdate(data, id);
        const usuario = await this._usuarioRepository.getFindOne(id);
        return { usuario, msg };
    }


}

module.exports = UsuarioBusiness;