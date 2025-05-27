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
// CREATE pet
app.post('/pets', (req, res) => {
  const { nome, tipo, cliente_id } = req.body;
  db.query(
    'INSERT INTO pets (nome, tipo, cliente_id) VALUES (?, ?, ?)',
    [nome, tipo, cliente_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, nome, tipo, cliente_id });
    }
  );
});

// READ all pets
app.get('/pets', (req, res) => {
  db.query('SELECT * FROM pets', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ pet by id
app.get('/pets/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM pets WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Pet não encontrado' });
    res.json(results[0]);
  });
});

// UPDATE pet
app.put('/pets/:id', (req, res) => {
  const id = req.params.id;
  const { nome, tipo, cliente_id } = req.body;
  db.query(
    'UPDATE pets SET nome = ?, tipo = ?, cliente_id = ? WHERE id = ?',
    [nome, tipo, cliente_id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Pet atualizado com sucesso' });
    }
  );
});

// DELETE pet
app.delete('/pets/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM pets WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Pet deletado com sucesso' });
  });
});
// CREATE produto
app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;
  db.query(
    'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
    [nome, preco],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, nome, preco });
    }
  );
});

// READ all produtos
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ produto by id
app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM produtos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(results[0]);
  });
});

// UPDATE produto
app.put('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const { nome, preco } = req.body;
  db.query(
    'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?',
    [nome, preco, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Produto atualizado com sucesso' });
    }
  );
});

// DELETE produto
app.delete('/produtos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM produtos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Produto deletado com sucesso' });
  });
});
// CREATE serviço
app.post('/servicos', (req, res) => {
  const { descricao, preco } = req.body;
  db.query(
    'INSERT INTO servicos (descricao, preco) VALUES (?, ?)',
    [descricao, preco],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, descricao, preco });
    }
  );
});

// READ all serviços
app.get('/servicos', (req, res) => {
  db.query('SELECT * FROM servicos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ serviço by id
app.get('/servicos/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM servicos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(results[0]);
  });
});

// UPDATE serviço
app.put('/servicos/:id', (req, res) => {
  const id = req.params.id;
  const { descricao, preco } = req.body;
  db.query(
    'UPDATE servicos SET descricao = ?, preco = ? WHERE id = ?',
    [descricao, preco, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Serviço atualizado com sucesso' });
    }
  );
});

// DELETE serviço
app.delete('/servicos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM servicos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Serviço deletado com sucesso' });
  });
});

