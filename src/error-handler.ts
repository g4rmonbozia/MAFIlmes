import { NextFunction, Request, Response } from "express";
import NotFoundException from "./exceptions/not-found-exception";

class ErrorHandler {
    public handleError(error: Error, req: Request, res: Response, next: NextFunction) {
        const status = 500;
        const mensagem = error.message;

        console.error(`[Erro] Status: ${status}, Mensagem: ${mensagem}`);

        if(error instanceof NotFoundException){
            res.status(status).json({
                status: error.statusCode,
                mensagem
            });
        }


        res.status(status).json({
            status,
            mensagem
        });
    }

    public static init(): (error: Error, req: Request, res: Response, next: NextFunction) => void {
        const errorHandler = new ErrorHandler();
        return errorHandler.handleError.bind(errorHandler);
    }
}

export default ErrorHandler;