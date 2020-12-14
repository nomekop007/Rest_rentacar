const request = require("supertest");
const assert = require("assert");
const app = require("../index")
const { crearToken, } = require("../helpers/components")


const token = crearToken({ id_usuario: 777 });


const dataCliente = {
    rut_cliente: "11.111.111-1",
    nombre_cliente: "cliente test",
    direccion_cliente: "calle test",
    estadoCivil_cliente: "SOLTERO",
    ciudad_cliente: "TALCA",
    comuna_cliente: "MAULE",
    nacionalidad_cliente: "CHILENO/A",
    telefono_cliente: "945404543",
    correo_cliente: "xxxxxxxx@xxxx.cl",
    fechaNacimiento_cliente: new Date(),
}


describe("tests POST /registrarCliente", () => {
    it(" devuelve el cliente creado o existente", done => {
        request(app)
            .post("/rentacar/clientes/registrarCliente")
            .send(dataCliente)
            .set("Accept", "application/json")
            .set("usertoken", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                assert(res.body.success === true);
                assert(res.body.data.rut_cliente === dataCliente.rut_cliente);
                done();
            })
    })

    it("cambia la direccion y el correo del cliente", done => {
        request(app)
            .post("/rentacar/clientes/registrarCliente")
            .send({
                rut_cliente: dataCliente.rut_cliente,
                nacionalidad_cliente: dataCliente.nacionalidad_cliente,
                direccion_cliente: "calle cambiada",
                correo_cliente: "cambiado@cambiado.cl"
            })
            .set("Accept", "application/json")
            .set("usertoken", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                assert(res.body.success === true)
                assert(res.body.data.direccion_cliente == "calle cambiada");
                assert(res.body.data.correo_cliente == "cambiado@cambiado.cl");
                done();
            })
    })



})
