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
    const [query] = await connection.execute('SELECT * FROM cadastrofono WHERE id = ?', [id]);
    return query;
};

const createCadastrofono = async (first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password) => {
    const [query] = await connection.execute('INSERT INTO cadastrofono (first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password]);
    return { id: query.insertId, first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password };
};

const updateCadastrofono = async (id, first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password) => {
    const item = await getCadastrofonoById(id);
    if (item.length === 0) {
        return null;
    }
    const [query] = await connection.execute('UPDATE cadastrofono SET first_name = ?, birth_date = ?, address = ?, phone = ?, cpf = ?, crfa = ?, crfa_expiry = ?, email = ?, password = ? WHERE id = ?', [first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password, id]);
    return query;
};

const deleteCadastrofono = async (id) => {
    const item = await getCadastrofonoById(id);
    if (item.length === 0) {
        return null;
    }
    await connection.execute('DELETE FROM cadastrofono WHERE id = ?', [id]);
    return { message: 'Cadastro deletado com sucesso' };
};

const getFonoByCpf = async (cpf) => {
    const [query] = await connection.execute('SELECT * FROM cadastrofono WHERE cpf = ?', [cpf]);
    return query;
};

const getPacienteByCpf = async (cpf) => {
    const [query] = await connection.execute('SELECT * FROM cadastrarpaciente WHERE cpf = ?', [cpf]);
    return query;
};

const createCadastroPaciente = async (first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password) => {
    const [query] = await connection.execute('INSERT INTO cadastrarpaciente (first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password]);
    return { id: query.insertId, first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password };
};

module.exports = { getAllCadastrofono, getCadastrofonoById, createCadastrofono, updateCadastrofono, deleteCadastrofono, getFonoByCpf, getPacienteByCpf, createCadastroPaciente };
