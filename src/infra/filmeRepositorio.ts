import path from 'path';
import fs from 'fs';
import DBSchema from './dbSchema';
import { FilmeSchema as FilmeSchema } from './filmeSchema';
import { AtualizarFilmeDTO, CriarFilmeDTO } from '../filme-dto';
import { FilmeModel } from '../entidades/filmes';
import NotFoundException from '../exceptions/not-found-exception';

class FilmeRepositorio {
  private readonly caminhoArquivo: string;

  constructor () {
    this.caminhoArquivo = path.join(__dirname, 'fakeDB.json');
  }

  private acessoBD (): DBSchema {
    const bdPuro = fs.readFileSync(this.caminhoArquivo, 'utf-8');
    return JSON.parse(bdPuro);
  }

  private reescreverFilmesNoArquivo (filmes: Array<FilmeSchema>):boolean {
    const bd = this.acessoBD();
    bd.filmes = filmes;
    try {
      fs.writeFileSync(this.caminhoArquivo, JSON.stringify(bd));
      return true;
    } catch {
      return false;
    }
  }

  public buscaTodos (): FilmeSchema[] {
    const bd = this.acessoBD();
    return bd.filmes;
  }

  public buscaPorId (id: number): FilmeSchema | undefined {
    const bd = this.acessoBD();
    const filme = bd.filmes.find((filme) => filme.id === id);
    return filme;
  }

  public criar (filme: CriarFilmeDTO) {
    const filmes = this.buscaTodos();

    const filmeMaiorId = filmes.reduce(
      (max, filme) => filme.id > max.id ? filme : max, filmes[0]
    );

    const novoFilme = new FilmeModel(
      filmeMaiorId.id + 1,
      filme.titulo,
      filme.estreia
    );
    filmes.push(novoFilme);
    this.reescreverFilmesNoArquivo(filmes);
  }

  public atualizar (id:number, dadosNovos: AtualizarFilmeDTO) {
    const filmes = this.buscaTodos();
    const posicaoFilme = filmes.findIndex(filme => filme.id === id);
    if (posicaoFilme !== -1) {
      if (dadosNovos.titulo) {
        filmes[posicaoFilme].titulo = dadosNovos.titulo;
      }
      if (dadosNovos.estreia !== undefined) {
        filmes[posicaoFilme].estreia = dadosNovos.estreia;
      }
      this.reescreverFilmesNoArquivo(filmes);
    } else {
      throw new NotFoundException("Usuário Não Encontrado");
    }
  }

  public deletar (id: number) {
    const filmes = this.buscaTodos();
    const posicaoFilme = filmes.findIndex(filme => filme.id === id);
    if (posicaoFilme !== -1) {
      filmes.splice(posicaoFilme, 1);
      this.reescreverFilmesNoArquivo(filmes);
    } else {
      throw new NotFoundException("Usuário Não Encontrado");
    }
  }
}

export default FilmeRepositorio;

