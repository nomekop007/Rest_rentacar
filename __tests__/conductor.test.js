const request = require("supertest");
const assert = require("assert");
const app = require("../index")
const { crearToken, } = require("../helpers/components")


const token = crearToken({ id_usuario: 777 });

const dataConductor = {
    rut_conductor: "22.222.222-2",
    nombre_conductor: "conductor test",
    telefono_conductor: "323243434",
    clase_conductor: "clase b",
    numero_conductor: "3232323",
    nacionalidad_conductor: "CHILENO/A",
    vcto_conductor: new Date(),
    municipalidad_conductor: "TALCA",
    direccion_conductor: "30 oriente",
}

describe("tests POST /registrarConductor", () => {
    it("devuelve el conductor creado o existente", done => {
        request(app)
            .post("/rentacar/conductores/registrarConductor")
            .send(dataConductor)
            .set("Accept", "application/json")
            .set("usertoken", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                assert(res.body.success === true);
                assert(res.body.data.rut_conductor === dataConductor.rut_conductor);
                done();
            })
    })
})
