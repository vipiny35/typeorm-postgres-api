import "reflect-metadata"
import express, { Application, NextFunction, Request, Response } from "express"
import { AppDataSource } from "./data-source"
import cors, { CorsOptions } from "cors"

class App {
    public app: Application
    public port: number

    constructor(controllers: any[], port: number) {
        this.init(controllers, port)
    }

    public async init(controllers: any[], port: number) {
        this.app = express()
        this.port = port
        await this.initDbConnection()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    public authorize(
        req: Request<{ [userId: string]: string }>,
        res: Response,
        next: NextFunction
    ) {
        return next()
        let token = req.headers.authorization
        if (!token) {
            return res.sendStatus(403)
        }
    }

    private async initDbConnection() {
        await AppDataSource.initialize()
            .then(() => console.log('Connected to DB'))
            .catch((error) => console.log(error))
    }

    private initializeMiddlewares() {

        const corsOption: CorsOptions = { origin: "*" }
        this.app.use(cors(corsOption));

        this.app.use(express.json())
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            const controllerInstance = new controller()
            controllerInstance.app = this
            controllerInstance.initializeRoutes()
            this.app.use('/api/', controllerInstance.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}

export default App