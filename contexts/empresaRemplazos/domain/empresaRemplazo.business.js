class EmpresaRemplazoBusiness {

    constructor({ EmpresaRemplazoRepository, RemplazoRepository ,TarifasEmpresasReemplazoRepository,SucursalRepository}) {
        this._remplazoRepository = RemplazoRepository;
        this._empresaRemplazoRepository = EmpresaRemplazoRepository;
        this._tarifasEmpresasReemplazoRepository =TarifasEmpresasReemplazoRepository;
        this._sucursalRepository =SucursalRepository;
    }

    async getEmpresasRemplazo() {
        const empresasRemplazo = await this._empresaRemplazoRepository.getFindAll();
        return empresasRemplazo;
    }

    async createRemplazo(remplazo) {
        const remplazoRepo = await this._remplazoRepository.postCreate(remplazo);
        return remplazoRepo;
    }

    async findAll() {

        const tarifa = await this._tarifasEmpresasReemplazoRepository.getFindAll();
        return tarifa;
    }

    async updateTarifasEmpresaReemplazo(ID, DATA) {

      console.log(DATA);
      let Id_Sucursal=0;
        const sucursal = await this._sucursalRepository.getFindAll();

        for (let i = 0; i < sucursal.length; i++) {
            if(sucursal[i].nombre_sucursal==DATA.Sucursal){
                Id_Sucursal=sucursal[i].id_sucursal
            }
        }

     
        const DATA2 = {
            id_sucursal: Id_Sucursal,
            NombreSucursal: DATA.Sucursal,
            codigo_empresaRemplazo: DATA.EmpresaReemplazo,
            categoria: DATA.Categoria,
            valor: DATA.Valor,
            userAt: DATA.userAt
        }


           const tarifa = await this._tarifasEmpresasReemplazoRepository.putUpdate(ID,DATA2); 
           return tarifa;
    }

    async getAllTarifasPorEmpresa(ID) {

        const tarifa = await this._tarifasEmpresasReemplazoRepository.getAllPorEmpresa(ID);
        return tarifa;
    }

    async createTarifaEmpresaReemplazo(tarifa) {

        const sucursal = await this._sucursalRepository.getFindOne(tarifa.Sucursal);
        console.log(sucursal);


        const DATA = {
            id_sucursal: tarifa.Sucursal,
            NombreSucursal: sucursal.nombre_sucursal,
            codigo_empresaRemplazo: tarifa.EmpresaReemplazo,
            categoria: tarifa.Categoria,
            valor: tarifa.Valor,
            userAt: tarifa.UserAt
        }
        const remplazoRepo = await this._tarifasEmpresasReemplazoRepository.postCreate(DATA);
        // return remplazoRepo;
        return
    }




}

module.exports = EmpresaRemplazoBusiness;