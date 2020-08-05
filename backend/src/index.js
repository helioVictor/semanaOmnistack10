const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ienlv.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()); // Vai ser valido para todas as rotas da aplicação (colocando app.nome da rota, se torna único)

// Metódos POST | GET | PUT | DELETE

// POST - CRIAR
// GET - BUSCAR
// PUT - ALTERAR 
// DELETE - DELETAR

// Query Params: request.query (Filtros, Ordenação, Paginação, ...)
// Route Params: request.params (Identificar um recurso na identificação ou remoção)
// Body: request.body (Dados para a alteração ou criação de um registro)

// MongoDB (Não-relacional)

app.use(routes);
app.listen(3333);