const connection = require('./connection');

const getAllCadastrofono = async () => {
    try {
        const [query] = await connection.execute('SELECT * FROM cadastrofono');
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar cadastros');
    }
};

const getCadastrofonoById = async (id) => {
    try {
        const [query] = await connection.execute('SELECT * FROM cadastrofono WHERE id = ?', [id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar cadastro pelo ID');
    }
};

const createCadastrofono = async (first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password) => {
    try {
        const [query] = await connection.execute('INSERT INTO cadastrofono (first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password]);
        return { id: query.insertId, first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password };
    } catch (error) {
        throw new Error('Erro ao criar cadastro de fono');
    }
};

const updateCadastrofono = async (id, first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password) => {
    try {
        const item = await getCadastrofonoById(id);
        if (item.length === 0) {
            return null;
        }
        const [query] = await connection.execute('UPDATE cadastrofono SET first_name = ?, birth_date = ?, address = ?, phone = ?, cpf = ?, crfa = ?, crfa_expiry = ?, email = ?, password = ? WHERE id = ?', [first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password, id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao atualizar cadastro de fono');
    }
};

const deleteCadastrofono = async (id) => {
    try {
        const item = await getCadastrofonoById(id);
        if (item.length === 0) {
            return null;
        }
        await connection.execute('DELETE FROM cadastrofono WHERE id = ?', [id]);
        return { message: 'Cadastro deletado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar cadastro de fono');
    }
};

const getFonoByCpf = async (cpf) => {
    try {
        const [query] = await connection.execute('SELECT * FROM cadastrofono WHERE cpf = ?', [cpf]);
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar fono pelo CPF');
    }
};

const getPacienteByCpf = async (cpf) => {
    try {
        const [query] = await connection.execute('SELECT * FROM cadastrarpaciente WHERE cpf = ?', [cpf]);
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar paciente pelo CPF');
    }
};

const createCadastroPaciente = async (first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password) => {
    try {
        const [query] = await connection.execute('INSERT INTO cadastrarpaciente (first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password]);
        return { id: query.insertId, first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password };
    } catch (error) {
        throw new Error('Erro ao criar cadastro de paciente');
    }
};

const getAllCadastroPaciente = async () => {
    try {
        const [query] = await connection.execute('SELECT * FROM cadastrarpaciente');
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar cadastros de pacientes');
    }
};

const getCadastroPacienteById = async (id) => {
    try {
        const [query] = await connection.execute('SELECT * FROM cadastrarpaciente WHERE id = ?', [id]);
        return query[0];
    } catch (error) {
        throw new Error('Erro ao buscar cadastro de paciente pelo ID');
    }
};

const updateCadastroPaciente = async (id, first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password) => {
    try {
        const item = await getCadastroPacienteById(id);
        if (!item) {
            return null;
        }
        const [query] = await connection.execute('UPDATE cadastrarpaciente SET first_name = ?, birth_date = ?, address = ?, phone = ?, cpf = ?, tipo_deficiencia = ?, email = ?, password = ? WHERE id = ?', [first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password, id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao atualizar cadastro de paciente');
    }
};

const deleteCadastroPaciente = async (id) => {
    try {
        const item = await getCadastroPacienteById(id);
        if (!item) {
            return null;
        }
        await connection.execute('DELETE FROM cadastrarpaciente WHERE id = ?', [id]);
        return { message: 'Cadastro deletado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar cadastro de paciente');
    }
};

module.exports = { 
    getAllCadastrofono, 
    getCadastrofonoById, 
    createCadastrofono, 
    updateCadastrofono, 
    deleteCadastrofono, 
    getFonoByCpf, 
    getPacienteByCpf, 
    createCadastroPaciente,
    getAllCadastroPaciente,
    getCadastroPacienteById,
    updateCadastroPaciente,
    deleteCadastroPaciente
};
