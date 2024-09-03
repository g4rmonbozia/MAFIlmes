export type FilmeSchema = {
    id: number;
    titulo: string;
    estreia: boolean,
    data?: string,
    elenco?: string[],
    equipe?: object[],
    poster?: string
}
