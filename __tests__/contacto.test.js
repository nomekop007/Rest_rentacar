const request = require("supertest");
const assert = require("assert");
const app = require("../index");
const { crearToken } = require("../helpers/components")

const token = crearToken({ id_usuario: 777 });


const dataContacto = {
    nombre_contacto: "test",
    domicilio_contacto: "test",
    numeroCasa_contacto: "test",
    ciudad_contacto: "test",
    telefono_contacto: "323234",
    id_arriendo: null
}


describe("test POST /registrarContacto", () => {
    it("devuelve el contacto creado", done => {
        request(app)
            .post("/rentacar/contactos/registrarContacto")
            .send(dataContacto)
            .set("Accept", "application/json")
            .set("usertoken", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                assert(res.body.success === true);
                assert(res.body.data.nombre_contacto = dataContacto.nombre_contacto)
                done()
            })
    })


});