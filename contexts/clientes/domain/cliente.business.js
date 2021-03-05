class ClienteBusiness {

    constructor({ ClienteRepository, DocumentoClienteRepository, ConductorRepository, DocumentoConductorRepository, EmpresaRepository, DocumentoEmpresaRepository }) {
        this._clienteRepository = ClienteRepository;
        this._docClienteRepository = DocumentoClienteRepository;
        this._conductorRepository = ConductorRepository;
        this._docConductorRepository = DocumentoConductorRepository;
        this._empresaRepository = EmpresaRepository;
        this._docEmpresaRepository = DocumentoEmpresaRepository;
    }

    async getClientes() {
        const cliente = await this._clienteRepository.getFindAll();
        return cliente;
    }


    async findCliente(rut_cliente) {
        const cliente = await this._clienteRepository.getFindOne(rut_cliente);
        return cliente;
    }


    async createCliente(cliente) {
        //si es extranjero
        if (cliente.nacionalidad_cliente != "CHILENO/A") cliente.rut_cliente = "@" + cliente.rut_cliente;
        //si no existe lo crea
        const [clienteRepo, created] = await this._clienteRepository.postFindOrCreate(cliente, cliente.rut_cliente);
        //si existia lo modifica
        if (!created) await this._clienteRepository.putUpdate(cliente, clienteRepo.rut_cliente);
        //se buscar el cliente
        const newCliente = await this._clienteRepository.getFindByPk(clienteRepo.rut_cliente);
        return newCliente;
    }


    async putCliente(cliente, rut_cliente) {
        await this._clienteRepository.putUpdate(cliente, rut_cliente);
        return true;
    }


    async getConductores() {
        const conductores = await this._conductorRepository.getFindAll();
        return conductores;
    }


    async findConductor(rut_conductor) {
        const conductor = await this._conductorRepository.getFindOne(rut_conductor);
        return conductor;
    }


    async createConductor(conductor) {
        if (conductor.nacionalidad_conductor != "CHILENO/A") conductor.rut_conductor = "@" + conductor.rut_conductor;
        //si no existe lo crea
        const [conductorRepo, created] = await this._conductorRepository.postFindOrCreate(conductor, conductor.rut_conductor);
        //si existe conductor lo actualiza
        if (!created) await this._conductorRepository.putUpdate(conductor, conductorRepo.rut_conductor);
        // se busca el conductor
        const newConductor = await this._conductorRepository.getFindByPK(conductorRepo.rut_conductor);
        return newConductor;
    }


    async putConductor(conductor, rut_conductor) {
        await this._conductorRepository.putUpdate(conductor, rut_conductor);
        return true;
    }


    async getEmpresas() {
        const empresas = await this._empresaRepository.getFindAll();
        return empresas;
    }


    async findEmpresa(rut_empresa) {
        const empresa = await this._empresaRepository.getFindOne(rut_empresa);
        return empresa;
    }


    async createEmpresa(empresa) {
        const [empresaRepo, created] = await this._empresaRepository.postfindOrCreate(empresa, empresa.rut_empresa);
        if (!created) await this._empresaRepository.putUpdate(empresa, empresaRepo.rut_empresa);
        const newEmpresa = await this._empresaRepository.getFindByPk(empresaRepo.rut_empresa);
        return newEmpresa;
    }


    async putEmpresa(empresa, rut_empresa) {
        await this._empresaRepository.putUpdate(empresa, rut_empresa);
        return true;
    }


    async updateFileCliente(rut_cliente, payload) {
        const [cliente, created] = await this._docClienteRepository.postFindOrCreate(payload, rut_cliente);
        if (!created) await this._docClienteRepository.putUpdate(payload, rut_cliente);
        return true;
    }


    async updateFileConductor(rut_conductor, payload) {
        const [conductor, created] = await this._docConductorRepository.postFindOrCreate(payload, rut_conductor);
        if (!created) await this._docConductorRepository.putUpdate(payload, rut_conductor);
        return true;
    }


    async updateFileEmpresa(rut_empresa, payload) {
        const [empresa, created] = await this._docEmpresaRepository.postFindOrCreate(payload, rut_empresa);
        if (!created) await this._docEmpresaRepository.putUpdate(payload, rut_empresa);
        return true;
    }

}

module.exports = ClienteBusiness;