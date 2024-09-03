/* eslint-disable no-unused-vars */
// CRUD - Create Read(Ler) Update Delete
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import Logger from './logger';
import AuthService from './auth-service';
import ErrorHandler from './error-handler';

const app = express();
const port = 3000;

app.use(express.json());
app.use(Logger.init());
app.use(AuthService.protect());
app.use('/api', routes);
app.use(ErrorHandler.init());

// GET - Leitura / Post - Escreve, Criar / PUT - Atualizar / DELETE - Delete
app.get('/', (req: Request, res: Response) => {
  res.send('Bem vindo. Esta é a sua primeira API');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}`);
});
