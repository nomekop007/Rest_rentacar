const request = require("supertest");
const assert = require("assert");
const app = require("../index")
const { crearToken } = require("../helpers/components")

const url = "/rentacar/arriendos/";
const token = crearToken({ id_usuario: 777 });


//test proceso del registro de un arriendo