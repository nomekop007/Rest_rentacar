const request = require("supertest");
const assert = require("assert");
const app = require("../index");
const { crearToken } = require("../helpers/components");

const token = crearToken({ id_usuario: 777 });
