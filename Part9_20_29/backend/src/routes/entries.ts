import express from 'express';
import entryService from '../services/entryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(entryService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;