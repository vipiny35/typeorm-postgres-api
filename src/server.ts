import App from './App';
import { UserController } from './controllers/UserController';

const controllers = [UserController]

const PORT = Number(process.env.PORT) || 3000
const app = new App(controllers, PORT)

app.listen()

export default app
