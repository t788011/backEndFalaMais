const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Certifique-se de importar body-parser
const cadastrofono = require('./routes/cadastrofono');
const cadastropaciente = require('./routes/cadastropaciente');
const login = require('./routes/login'); 

const app = express();
const PORT = 3302;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/cadastrofono', cadastrofono);
console.log("Rota /cadastrofono registrada.");
app.use('/cadastropaciente', cadastropaciente);
console.log("Rota /cadastropaciente registrada.");
app.use('/login', login); // Use a rota '/login' para loginRouter
console.log("Rota /login registrada.");

app.listen(PORT, () => {
    console.log(`Executando a aplicação na porta ${PORT}`);
});
