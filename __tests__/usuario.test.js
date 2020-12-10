const request = require("supertest");
const assert = require("assert");
const app = require("../index");
const { crearToken } = require("../helpers/components")

const url = "/rentacar/usuarios/";
const token = crearToken({ id_usuario: 777 })



describe("test post /registrar", () => {
    it("devuelve el usuario creado", done => {
        const usuarioTest = {
            userAt: "TEST",
            nombre_usuario: "TEST USER",
            email_usuario: "TEST@TEST.CL",
            clave_usuario: "estoEsLaClave",
            estado_usuario: 2,
            id_rol: 1,
            id_sucursal: 1,
        }
        request(app)
            .post(`${url}registrar`)
            .send(usuarioTest)
            .set('Accept', 'application/json')
            .set("usertoken", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                //pasa y si esto assert se cumplen
                assert(res.body.success === true);
                assert(res.body.msg === "Usuario creado exitosamente");

                done();
            })

    })
})



describe("test post /login", () => {
    it("devuelve el token del usuario logeado", done => {
        const usuarioTest = {
            email_usuario: "TEST@TEST.CL",
            clave_usuario: "estoEsLaClave",
        }
        request(app)
            .post(`${url}login`)
            .send(usuarioTest)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                assert(res.body.success === true);
                assert(res.body.usuario.email_usuario === usuarioTest.email_usuario);
                done();
            })
    })
})




describe("test get /cargarUsuarios", () => {
    it('Devuelve todos los usuarios', done => {
        request(app)
            .get(`${url}cargarUsuarios`)
            .set('usertoken', token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    })
})



describe("test get /buscarUsuario/:id ", () => {

    it("Devuelve el usuario buscado por id", done => {
        request(app)
            .get(`${url}buscarUsuario/1`)
            .set('usertoken', token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

})
