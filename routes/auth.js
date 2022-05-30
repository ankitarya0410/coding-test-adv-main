const express = require('express');

const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:postgres@postgres:5432/postgres');

const AuthService = require('./services/auth');

const ImageService = require('./services/imageProvider');

const CategoryService = require('./services/categoryProvider');

const router = express.Router();

/* Get an auth token */
router.get('/', async (req, res) => {
  const token = AuthService.getToken();

  res.send(token);
});

router.get('/images', async (req, res) => {
  try {
    const images = await ImageService.getImages(db);
    res.send(images);
  } catch(e) {
    if (e.code === 401) {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Something went wrong');
    }
  }
});

router.post('/category', async (req, res) => {
  const { categories } = req.body;
  try {
    const response = await CategoryService.createCategory(db, categories);
    res.send(response);
  } catch(e) {
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/category', async (req, res) => {
  const { id } = req.body;
  try {
    const response = await CategoryService.removeCategorybyId(db, id);
    res.send(response);
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
