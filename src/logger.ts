import { NextFunction, Request, Response } from "express";

type MiddlewareTypeExpress = (req: Request, res: Response, next: NextFunction) => void;

class Logger{
    public static init(): MiddlewareTypeExpress{
        return(req: Request, res: Response, next: NextFunction) => {
            const dateDate = new Date().toISOString();
            console.log(`${dateDate} - Método: ${req.method}, URL: ${req.url}`);
            next();
        }
    }
}

export default Logger;