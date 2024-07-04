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
        const [query] = await connection.execute('SELECT * FROM cadastropaciente WHERE cpf = ?', [cpf]);
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar paciente pelo CPF');
    }
};

const createCadastroPaciente = async (first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password) => {
    try {
        const [query] = await connection.execute('INSERT INTO cadastropaciente (first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password]);
        return { id: query.insertId, first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password };
    } catch (error) {
        throw new Error('Erro ao criar cadastro de paciente');
    }
};

const getAllCadastroPaciente = async () => {
    try {
        const [query] = await connection.execute('SELECT * FROM cadastropaciente');
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar cadastros de pacientes');
    }
};

const getCadastroPacienteById = async (id) => {
    try {
        const [query] = await connection.execute('SELECT * FROM cadastropaciente WHERE id = ?', [id]);
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
        const [query] = await connection.execute('UPDATE cadastropaciente SET first_name = ?, birth_date = ?, address = ?, phone = ?, cpf = ?, tipo_deficiencia = ?, email = ?, password = ? WHERE id = ?', [first_name, birth_date, address, phone, cpf, tipo_deficiencia, email, password, id]);
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
        await connection.execute('DELETE FROM cadastropaciente WHERE id = ?', [id]);
        return { message: 'Cadastro deletado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar cadastro de paciente');
    }
};

const getAllPictograms = async () => {
    try {
        const [query] = await connection.execute('SELECT * FROM pictograms');
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar pictogramas');
    }
};

const getPictogramById = async (id) => {
    try {
        const [query] = await connection.execute('SELECT * FROM pictograms WHERE id = ?', [id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar pictograma pelo ID');
    }
};

const getAlimentoById = async (id) => {
    try {
        const [query] = await connection.execute('SELECT * FROM alimentos WHERE id = ?', [id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar alimento pelo ID');
    }
};

const getBrincarById = async (id) => {
    try {
        const [query] = await connection.execute('SELECT * FROM brincar WHERE id = ?', [id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar brincar pelo ID');
    }
};

const getAllBrincar = async () => {
    try {
        const [query] = await connection.execute('SELECT * FROM brincar');
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar brincar');
    }
};

const createPictogram = async (label, image_path, audio_path, ativo) => {
    try {
        const [query] = await connection.execute('INSERT INTO pictograms (label, image_path, audio_path, ativo) VALUES (?, ?, ?, ?)', [label, image_path, audio_path, ativo]);
        return { id: query.insertId, label, image_path, audio_path, ativo };
    } catch (error) {
        throw new Error('Erro ao criar pictograma');
    }
};

const updatePictogram = async (id, label, image_path, audio_path, ativo) => {
    try {
        const item = await getPictogramById(id);
        if (!item) {
            return null;
        }
        const [query] = await connection.execute('UPDATE pictograms SET label = ?, image_path = ?, audio_path = ?, ativo = ? WHERE id = ?', [label, image_path, audio_path, ativo, id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao atualizar pictograma');
    }
};

const updateAlimento = async (id, label, image_path, audio_path, ativo) => {
    try {
        const item = await getAlimentoById(id);
        if (!item) {
            return null;
        }
        const [query] = await connection.execute('UPDATE alimentos SET label = ?, image_path = ?, audio_path = ?, ativo = ? WHERE id = ?', [label, image_path, audio_path, ativo, id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao atualizar alimento');
    }
};

const updateBrincar = async (id, label, image_path, audio_path, ativo) => {
    try {
        const item = await getBrincarById(id);
        if (!item) {
            return null;
        }
        const [query] = await connection.execute('UPDATE brincar SET label = ?, image_path = ?, audio_path = ?, ativo = ? WHERE id = ?', [label, image_path, audio_path, ativo, id]);
        return query;
    } catch (error) {
        throw new Error('Erro ao atualizar brincar');
    }
};


const deletePictogram = async (id) => {
    try {
        const item = await getPictogramById(id);
        if (!item) {
            return null;
        }
        await connection.execute('DELETE FROM pictograms WHERE id = ?', [id]);
        return { message: 'Pictograma deletado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar pictograma');
    }
};

const deleteAlimento = async (id) => {
    try {
        const item = await getAlimentoById(id);
        if (!item) {
            return null;
        }
        await connection.execute('DELETE FROM alimentos WHERE id = ?', [id]);
        return { message: 'Alimento deletado com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar alimento');
    }
};

const getAllAlimentos = async () => {
    try {
        const [query] = await connection.execute('SELECT * FROM alimentos');
        return query;
    } catch (error) {
        throw new Error('Erro ao buscar alimentos');
    }
};



const createAlimento = async (label, image_path, audio_path, ativo) => {
    try {
        const [query] = await connection.execute('INSERT INTO alimentos (label, image_path, audio_path, ativo) VALUES (?, ?, ?, ?)', [label, image_path, audio_path, ativo]);
        return { id: query.insertId, label, image_path, audio_path, ativo };
    } catch (error) {
        throw new Error('Erro ao criar alimento');
    }
};


const createBrincar = async (label, image_path, audio_path, ativo) => {
    try {
        const [query] = await connection.execute('INSERT INTO brincar (label, image_path, audio_path, ativo) VALUES (?, ?, ?, ?)', [label, image_path, audio_path, ativo]);
        return { id: query.insertId, label, image_path, audio_path, ativo };
    } catch (error) {
        throw new Error('Erro ao criar brincar');
    }
};



const deleteBrincar = async (id) => {
    try {
        const item = await getBrincarById(id);
        if (!item) {
            return null;
        }
        await connection.execute('DELETE FROM brincar WHERE id = ?', [id]);
        return { message: 'Brincar deletada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar brincar');
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
    deleteCadastroPaciente,
    
    getAllPictograms,
    getPictogramById,
    createPictogram,
    updatePictogram,
    deletePictogram,

    getAllAlimentos, 
    getAlimentoById, 
    createAlimento, 
    updateAlimento, 
    deleteAlimento,

    getAllBrincar,
    getBrincarById,
    createBrincar,
    updateBrincar,
    deleteBrincar




};