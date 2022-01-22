import { ErrorBase } from "../middlewares/errorBase";


export class UnauthorizedException extends ErrorBase {

	constructor(message: string | unknown){
		const status = 401;

		super({ message, status });
	}
}