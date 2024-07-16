import express from 'express';
import diagnoesesService from '../services/diagnoesesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoesesService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;