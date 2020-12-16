const request = require("supertest");
const assert = require("assert");
const app = require("../index");
const { crearToken } = require("../helpers/components");

const token = crearToken({ id_usuario: 777 });

const dataArriendo = {
    estado_arriendo: "PENDIENTE",
    kilometrosEntrada_arriendo: 11,
    kilometrosSalida_arriendo: 11,
    ciudadEntrega_arriendo: "TALCA",
    fechaEntrega_arriendo: new Date(),
    ciudadRecepcion_arriendo: "TALCA",
    fechaRecepcion_arriendo: new Date(),
    diasActuales_arriendo: 11,
    diasAcumulados_arriendo: 11,
    tipo_arriendo: "PARTICULAR",
    rut_conductor2: null,
    rut_conductor3: null,
}

describe(" tests POST /registrarArriendo", () => {
    it("devuelve el arriendo creado ", done => {
        request(app)
            .post("/rentacar/arriendos/registrarArriendo")
            .send(dataArriendo)
            .set("Accept", "application/json")
            .set("usertoken", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                assert(res.body.success === true);
                done();
            })

    })

})
