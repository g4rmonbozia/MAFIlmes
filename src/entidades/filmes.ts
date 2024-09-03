export class FilmeModel {
  id: number;
  titulo: string;
  estreia: boolean;

  constructor (
    id: number,
    titulo: string,
    estreia: boolean
  ) {
    this.id = id;
    this.titulo = titulo;
    this.estreia = estreia;
  }
}
