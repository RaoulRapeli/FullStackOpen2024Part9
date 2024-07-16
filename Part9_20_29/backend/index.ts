import express from 'express';
import diagnosesRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';
import entryRouter from './src/routes/entries';
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/entries', entryRouter);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});