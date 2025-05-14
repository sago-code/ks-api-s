import express, { Application } from "express";
import chalk from 'chalk';
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { AppDataSource } from "./db/db";

export class App {

    private app: Application;
    
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3002);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use('/users', userRoutes);
    }

    async listen() {
        await AppDataSource.initialize();
        await this.app.listen(this.app.get('port'));
        const port = this.app.get('port');
        console.log(chalk.blue.bold(`
            ******************************************
            *                                        *
            *      Bienvenido a Kabod-Style API S    *
            *                                        *
            * `) + chalk.green.bold(`    🚀 Servidor en puerto: ${port} 🚀            `) + chalk.blue.bold(`*
            *                                        *
            ******************************************`
        ));
    }
}
