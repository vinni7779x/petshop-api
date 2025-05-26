const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Configurar conexão com banco MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // seu usuário do MySQL
  password: '',     // sua senha do MySQL
  database: 'petshop_db'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
    return;
  }
  console.log('Conectado ao banco MySQL!');
});

// --- Rotas CRUD para a tabela usuarios ---

// CREATE usuario
app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, nome, email });
  });
});

// READ all usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ usuario by id
app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(results[0]);
  });
});

// UPDATE usuario
app.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const { nome, email, senha } = req.body;
  db.query('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuário atualizado com sucesso' });
  });
});

// DELETE usuario
app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuário deletado com sucesso' });
  });
});

// Repita o mesmo padrão para as outras tabelas (clientes, pets, produtos, servicos)
// Vou te ajudar com uma tabela só para você ver o padrão.

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
// CREATE cliente
app.post('/clientes', (req, res) => {
  const { nome, telefone, usuario_id } = req.body;
  db.query('INSERT INTO clientes (nome, telefone, usuario_id) VALUES (?, ?, ?)', [nome, telefone, usuario_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, nome, telefone, usuario_id });
  });
});

// READ all clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ cliente by id
app.get('/clientes/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(results[0]);
  });
});

// UPDATE cliente
app.put('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const { nome, telefone, usuario_id } = req.body;
  db.query('UPDATE clientes SET nome = ?, telefone = ?, usuario_id = ? WHERE id = ?', [nome, telefone, usuario_id, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente atualizado com sucesso' });
  });
});

// DELETE cliente
app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente deletado com sucesso' });
  });
});
