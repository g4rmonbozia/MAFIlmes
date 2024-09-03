import { Router, Request, Response } from "express";
import FilmeRepositorio from "./infra/filmeRepositorio";
import { FilmeSchema } from "./infra/filmeSchema";
import { AtualizarFilmeDTO } from "./filme-dto";
import { body, param, validationResult } from "express-validator";
import NotFoundException from "./exceptions/not-found-exception";

class FilmeController {
    private readonly filmeRepositorio: FilmeRepositorio;
    public readonly router: Router = Router();

    constructor(filmeRepositorio: FilmeRepositorio) {
        this.filmeRepositorio = filmeRepositorio;
        this.routes();
    }

    routes() {
        this.router.get('/', this.buscaTodos.bind(this));

        this.router.get('/:id',
            [
                param('id').isNumeric().withMessage('Id deve ser numérico')
            ],
            this.buscarPorId.bind(this));

        this.router.post('/', 
            [
                body('titulo')
                    .exists().withMessage('O campo título é obrigatório')
                    .isString().withMessage('O campo título precisa ser uma string'),
                body('estreia')
                    .exists().withMessage('O campo estreia é obrigatório')
                    .isBoolean().withMessage('O campo título precisa ser um boolean')
            ],
            this.criar.bind(this));

        this.router.patch("/:id",
            [
                param('id').isNumeric().withMessage('Id deve ser numérico')
            ],
            this.atualizar.bind(this));
        this.router.delete("/:id",
            [
                param('id').isNumeric().withMessage('Id deve ser numérico')
            ],
            this.deletar.bind(this));
    }

    buscaTodos(req: Request, res: Response) {
        const filmes = this.filmeRepositorio.buscaTodos();
        res.send(filmes);
    }

    buscarPorId(req: Request, res: Response) {
        const errosValidacao = validationResult(req);

        if(!errosValidacao.isEmpty()){
            return res.status(400).json({erros: errosValidacao.array()})
        }

        const id = req.params.id ?? 1;
        const filme = this.filmeRepositorio.buscaPorId(+id);
        if(!filme){
            throw new NotFoundException("Usuário Não Encontrado");
        }
        res.send(filme);
        
    }

    criar(req: Request, res: Response){
        const errosValidacao = validationResult(req);

        if(!errosValidacao.isEmpty()){
            return res.status(400).json({erros: errosValidacao.array()})
        }

        const dadosfilme: FilmeSchema = req.body;
        this.filmeRepositorio.criar(dadosfilme);
        const filmes = this.filmeRepositorio.buscaTodos();
        res.send(filmes);
    }

    atualizar(req: Request, res: Response){
        const errosValidacao = validationResult(req);

        if(!errosValidacao.isEmpty()){
            return res.status(400).json({erros: errosValidacao.array()})
        }

        const id = req.params.id;
        const dadosNovos: AtualizarFilmeDTO = req.body;
        this.filmeRepositorio.atualizar(+id, dadosNovos);
        res.json("Filme atualizado com sucesso!");
    }

    deletar(req: Request, res: Response){
        const errosValidacao = validationResult(req);

        if(!errosValidacao.isEmpty()){
            return res.status(400).json({erros: errosValidacao.array()})
        }

        const id = req.params.id;
        this.filmeRepositorio.deletar(+id);
        res.json("Filme deletado com sucesso!");
    }
}

export default FilmeController;