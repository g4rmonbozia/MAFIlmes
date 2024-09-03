import { NextFunction, Request, Response } from "express";

class AuthService{
    private checkToken(req: Request, res: Response, next:NextFunction): void{
        const apikey = req.headers['api-key'];
        if(apikey){
          if(apikey === 'MAFilmesSegredo'){
            next();
            return;
          }
        }
        res.status(401).json("O usuário não autorizado");
      }
    
    public static protect(){
        const authService = new AuthService();
        return authService.checkToken.bind(authService);
    }
}

AuthService.protect();

export default AuthService;