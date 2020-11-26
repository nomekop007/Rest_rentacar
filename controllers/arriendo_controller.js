const {
	Usuario,
	Arriendo,
	Cliente,
	Conductor,
	Empresa,
	Vehiculo,
	Remplazo,
	Requisito,
	Garantia,
	Sucursal,
	PagoArriendo,
	Despacho,
	ActaEntrega,
	Contrato,
	EmpresaRemplazo,
} = require("../database/db");
const { sendError } = require("../helpers/components");
class ArriendoController {
	async getArriendos(req, res) {
		try {
			//preguntar si el usuario no es administrador
			const where = {};

			if (req.body.id_rol != 1) {
				where.id_sucursal = req.body.id_sucursal;
			}
			if (req.body.filtro) {
				where.estado_arriendo = req.body.filtro;
			}


			const arriendos = await Arriendo.findAll({
				where: where,
				include: [
					{ model: Usuario, attributes: ["nombre_usuario"] },
					{ model: Cliente, attributes: ["nombre_cliente", "rut_cliente"] },
					{ model: Empresa, attributes: ["nombre_empresa", "rut_empresa"] },
					{ model: Vehiculo, attributes: ["patente_vehiculo"] },
					{ model: PagoArriendo },
					{ model: Requisito },
					{ model: Garantia },
					{
						model: Remplazo,
						include: [{ model: EmpresaRemplazo }, { model: Cliente, attributes: ["nombre_cliente", "rut_cliente"] }],
					},
				],
			});
			res.json({
				success: true,
				data: arriendos,
			});
		} catch (error) {
			sendError(error, res);
		}
	}

	async findArriendo(req, res) {
		try {
			const arriendo = await Arriendo.findOne({
				where: { id_arriendo: req.params.id },
				include: [
					{ model: Cliente },
					{ model: Empresa },
					{ model: Vehiculo },
					{ model: Conductor },
					{ model: Requisito },
					{ model: Garantia },
					{ model: PagoArriendo },
					{ model: Sucursal },
					{ model: Usuario, attributes: ["nombre_usuario"] },
					{ model: Remplazo, include: [{ model: Cliente }, { model: EmpresaRemplazo }], },
					{ model: Despacho, include: [{ model: ActaEntrega }] },
					{ model: Contrato }
				],
			});

			if (arriendo) {
				res.json({
					success: true,
					data: arriendo,
				});
			} else {
				res.json({
					success: false,
					msg: "error: " + "arriendo no encontrado",
				});
			}
		} catch (error) {
			sendError(error, res);
		}
	}

	async createArriendo(req, res, next) {
		try {
			const response = req.body;

			switch (response.tipo_arriendo) {
				case "PARTICULAR":
					response.rut_empresa = null;
					response.id_remplazo = null;
					break;
				case "REEMPLAZO":
					response.rut_empresa = null;
					response.rut_cliente = null;
					break;
				case "EMPRESA":
					response.id_remplazo = null;
					response.rut_cliente = null;
					break;
			}


			if (response.rut_conductor2 == "undefined") {
				response.rut_conductor2 = null
			}
			if (response.rut_conductor3 == "undefined") {
				response.rut_conductor3 = null
			}


			//se crea el arriendo
			const arriendo = await Arriendo.create(response);

			res.json({
				success: true,
				msg: ` arriendo Nº${arriendo.id_arriendo} registrado exitosamente`,
				data: arriendo,
			});
			next(arriendo.logging);
		} catch (error) {
			sendError(error, res);
		}
	}

	async updateStateArriendo(req, res, next) {
		try {
			const response = req.body;
			console.log(response);
			const arriendo = await Arriendo.update(response, {
				where: { id_arriendo: req.params.id },
			});

			res.json({
				success: true,
				msg: "actualizacion exitoso",
				data: arriendo,
			});
			next(arriendo.logging);
		} catch (error) {
			sendError(error, res);
		}
	}


}

module.exports = ArriendoController;