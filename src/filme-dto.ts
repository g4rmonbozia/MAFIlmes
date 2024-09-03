/* eslint-disable no-unused-vars */
// DTO Data Tranfer object
import { FilmeModel } from './entidades/filmes';

export type CriarFilmeDTO = Omit<FilmeModel, 'id' >

export type AtualizarFilmeDTO = Partial<CriarFilmeDTO>


