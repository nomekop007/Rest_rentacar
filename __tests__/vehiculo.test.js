const request = require("supertest");
const assert = require("assert");
const app = require("../index");
const { crearToken, getRandomInt } = require("../helpers/components")

const token = crearToken({ id_usuario: 777 });
const dataVehiculo = {
    patente_vehiculo: getRandomInt(1000000, 9999999),
    estado_vehiculo: "DISPONIBLE",
    chasis_vehiculo: getRandomInt(1000000, 9999999),
    transmision_vehiculo: getRandomInt(1000000, 9999999),
    numeroMotor_vehiculo: getRandomInt(1000000, 9999999),
    marca_vehiculo: "toyota",
    modelo_vehiculo: "raw4",
    tipo_vehiculo: "AUTOMOVIL",
    color_vehiculo: "ROJO",
    compra_vehiculo: "ROSSELOT",
    fechaCompra_vehiculo: new Date(),
    año_vehiculo: 2020,
    foto_vehiculo: null,
    Tmantencion_vehiculo: 10000,
    kilometraje_vehiculo: 0,
    kilometrosMantencion_vehiculo: 10000,
    id_region: 1,
    rut_propietario: "17.886.328-2"
}




describe("test POST /vehiculo", () => {
    it("devuelve el vehiculo creado", done => {
        request(app)
            .post("/rentacar/vehiculos/registrarVehiculo")
            .send(dataVehiculo)
            .set("Accept", "application/json")
            .set("usertoken", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                assert(res.body.msg === " Vehiculo registrado exitosamente")
                assert(res.body.success === true)
                done();
            })
    })
})


