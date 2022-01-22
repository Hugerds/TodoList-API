import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import cors from "cors";
import { taskRouter } from "./App/Controllers/TaskController";
import { userRouter } from "./App/Controllers/UserController";
import { errorHandler } from "./App/middlewares/errorHandler";

const port = process.env.PORT || 3001;
Application();
async function Application() {
    createConnection().then(async connection => {
        console.log("Banco de Dados conectado");
    });

    const app = express();
	app.use(cors());
	app.use(express.json());
	app.use(taskRouter);
	app.use(userRouter);
	app.use(errorHandler);

	app.listen(port, function(){
		console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
	});
    

}