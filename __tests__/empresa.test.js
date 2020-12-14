const request = require("supertest");
const assert = require("assert");
const app = require("../index");
const { crearToken } = require('../helpers/components');

const token = crearToken({ id_usuario: 777 })

const dataEmpresa = {
    rut_empresa: "33.333.333-3",
    nombre_empresa: "empresa test",
    rol_empresa: "ninguno",
    vigencia_empresa: "2000",
    direccion_empresa: "30 ORIENTE",
    ciudad_empresa: "TALCA",
    comuna_empresa: "Maule",
    telefono_empresa: "4344403",
    correo_empresa: "xxxxxxx@xxxxxx.com",
}

describe(" test POST /registrarEmpresa", () => {
    it("devuelve la empresa creada o existente", done => {
        request(app)
            .post("/rentacar/empresas/registrarEmpresa")
            .send(dataEmpresa)
            .set("Accept", "application/json")
            .set("usertoken", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                assert(res.body.success === true);
                assert(res.body.data.rut_empresa == dataEmpresa.rut_empresa);
                done();
            })
    })
})