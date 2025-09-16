const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/processos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
        SELECT p.*, 
               (SELECT COUNT(*) FROM andamentos a WHERE a.processo_id = p.id) AS andamentos
        FROM processos p
        ORDER BY p.id DESC
      `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar novo processo
app.post('/processos', async (req, res) => {
  try {
    const { numero, dataAbertura, descricao, cliente, advogado, uf } = req.body;
    if (!numero || !dataAbertura || !descricao || !cliente || !advogado || !uf)
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

    const msg = uf === 'MG' ? "Processo de MG criado com sucesso" : "Processo fora de MG criado com sucesso";

    const [result] = await pool.query(
      'INSERT INTO processos (numero, dataAbertura, descricao, cliente, advogado, uf) VALUES (?, ?, ?, ?, ?, ?)',
      [numero, dataAbertura, descricao, cliente, advogado, uf]
    );

    res.json({ id: result.insertId, message: msg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar processo
app.put('/processos/:id', async (req, res) => {
  try {
    const { numero, dataAbertura, descricao, cliente, advogado, uf } = req.body;
    await pool.query(
      'UPDATE processos SET numero=?, dataAbertura=?, descricao=?, cliente=?, advogado=?, uf=? WHERE id=?',
      [numero, dataAbertura, descricao, cliente, advogado, uf, req.params.id]
    );
    res.json({ message: 'Processo atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir processo
app.delete('/processos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM processos WHERE id=?', [req.params.id]);
    res.json({ message: 'Processo excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar andamentos
app.get('/processos/:processoId/andamentos', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM andamentos WHERE processo_id=? ORDER BY id DESC',
      [req.params.processoId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar andamento
app.post('/processos/:processoId/andamentos', async (req, res) => {
  try {
    const { data, descricao } = req.body;
    if (!data || !descricao) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

    const [result] = await pool.query(
      'INSERT INTO andamentos (processo_id, data, descricao) VALUES (?, ?, ?)',
      [req.params.processoId, data, descricao]
    );

    res.json({ id: result.insertId, message: 'Andamento criado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar andamento
app.put('/andamentos/:id', async (req, res) => {
  try {
    const { data, descricao } = req.body;
    await pool.query(
      'UPDATE andamentos SET data=?, descricao=? WHERE id=?',
      [data, descricao, req.params.id]
    );
    res.json({ message: 'Andamento atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir andamento
app.delete('/andamentos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM andamentos WHERE id=?', [req.params.id]);
    res.json({ message: 'Andamento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Teste de conexão
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1+1 AS resultado');
    res.send(`API ok! Banco: ${rows[0].resultado}`);
  } catch (err) {
    res.status(500).send('Erro ao conectar com o banco');
  }
});

//Start server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
