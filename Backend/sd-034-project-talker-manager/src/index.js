const express = require('express');
const fs = require('fs').promises;  
const path = require('path');
const generateToken = require('./utils/generationToken');
const validationEmail = require('./middlewares/validationEmail');
const validationPassword = require('./middlewares/validationPassword');
const authorization = require('./middlewares/authorizationMid');
const validationName = require('./middlewares/validationName');
const validationAge = require('./middlewares/validationAge');
const validationTalk = require('./middlewares/validationTalk');
const validateRate = require('./middlewares/validationRate');
const validateRate1 = require('./middlewares/validationRate1');
// const validateId = require('./middlewares/validationId');

const app = express();
app.use(express.json());
const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
// const readFile = require('./utils/readFileFunction');
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkerFile = path.resolve(__dirname, 'talker.json');
async function readFile() {
  try {
    const data = await fs.readFile(talkerFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  } 
}
app.get('/talker/search', authorization, async (req, res) => {
  const { q } = req.query;
  const talkerData = await readFile();
  if (!q || q.trim() === '') {
    return res.status(200).json(talkerData);
  }
  const searchTalker = talkerData.filter((t) => t.name.includes(q));
  if (searchTalker.length === 0) {
    return res.status(200).json([]);
  }
  res.status(200).json(searchTalker);
});
app.get('/talker', async (_req, res) => {
  try {
    const talkerData = await readFile();
    res.status(200).json(talkerData);
    if (!talkerData) return res.status(200).json([]);
    res.status(200).json(talkerData);
  } catch (err) {
    console.error(err);
  }
});
app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkerData = await readFile();
    const talker = talkerData.find((talk) => talk.id === Number(id));
    if (!talker) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talker);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
app.post('/login', validationEmail, validationPassword, async (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});
app.post('/talker', 
  authorization,
  validationName, 
  validationAge,
  validationTalk, 
  validateRate1,
  validateRate,

  async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const talkerData = await readFile();
      const newTalker = { 
        id: talkerData[talkerData.length - 1].id + 1,
        name, 
        age, 
        talk,
      };
      const allTalker = JSON.stringify([...talkerData, newTalker]);
      await fs.writeFile(talkerFile, allTalker);
      res.status(201).json(newTalker);
    } catch (err) {
      console.error(err);
    }
  });
app.put('/talker/:id', 
  authorization,
  validationName,
  validationAge,
  validationTalk,
  validateRate1,
  validateRate,  
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkerData = await readFile();
    const index = talkerData.findIndex((t) => t.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    talkerData[index] = { id: Number(id), name, age, talk };
    const updateTalker = JSON.stringify(talkerData);
    await fs.writeFile(talkerFile, updateTalker);
    res.status(200).json(talkerData[index]);
  });
app.delete('/talker/:id', authorization, async (req, res) => {
  const { id } = req.params;
  const talkerData = await readFile();
  const filterTalker = talkerData.filter((t) => t.id !== Number(id));
  const updateTalker = JSON.stringify(filterTalker, null, 2);
  await fs.writeFile(talkerFile, updateTalker);
  res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
app.listen(PORT, () => {
  console.log('Online');
});