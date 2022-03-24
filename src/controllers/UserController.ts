import { NextFunction, Request, Response, Router } from 'express'
import App from '../App'
import { UserRepository } from '../repository/UserRepository'

export class UserController {
    public path = '/user'
    public router = Router()
    public app: App
    public userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    public initializeRoutes() {
        // Controller middleware
        this.router.use(this.app.authorize, (req: Request, res: Response, next: NextFunction) => next())

        // Controller endpoints
        this.router.post(this.path, this.createUser)
        this.router.get(`${this.path}/:userId`, this.findUser)
    }

    createUser = async (req: Request, res: Response) => {
        const user = await this.userRepository.createUser(req.body)
        return res.send(user)
    }

    findUser = async (req: Request, res: Response) => {
        const user = await this.userRepository.findUser(Number(req.params.userId))
        return res.send(user)
    }

}
