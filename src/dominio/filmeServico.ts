/* eslint-disable no-unused-vars */
import FilmeRepositorio from '../infra/filmeRepositorio';
import { FilmeSchema } from '../infra/filmeSchema';

export function buscarFilmePorId (id: number): FilmeSchema | undefined {
  const filmeRepositorio = new FilmeRepositorio();
  const Filme = filmeRepositorio.buscaPorId(id);
  if (Filme) {
    return Filme;
  }
  throw new Error('Filme nao encontrado');
}

export function buscarFilmes (): FilmeSchema[] {
  const filmeRepositorio = new FilmeRepositorio();
  const filmes = filmeRepositorio.buscaTodos();
  return filmes;
}

export function criarFilme (filme: FilmeSchema): void {
  const filmeRepositorio = new FilmeRepositorio();
  filmeRepositorio.criar(filme);
}
