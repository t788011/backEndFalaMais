const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const cadastrofono = require('./routes/cadastrofono');
const cadastropaciente = require('./routes/cadastropaciente');
const login = require('./routes/login'); 
const pictogramsRouter = require('./routes/pictograms');
const alimentosRouter = require('./routes/alimentos');
const brincarRouter = require('./routes/brincar');


const app = express();
const PORT = 3302;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/cadastrofono', cadastrofono);
console.log("Rota /cadastrofono registrada.");
app.use('/cadastropaciente', cadastropaciente);
console.log("Rota /cadastropaciente registrada.");
app.use('/login', login); 
console.log("Rota /login registrada.");
app.use('/pictograms', pictogramsRouter); 
console.log("Rota /pictograms registrada.");
app.use('/alimentos', alimentosRouter); 
console.log("Rota /alimentos registrada.");
app.use('/brincar', brincarRouter); 
console.log("Rota /brincar registrada.");


app.listen(PORT, () => {
    console.log(`Executando a aplicação na porta ${PORT}`);
});