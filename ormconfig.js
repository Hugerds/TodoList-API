module.exports = {
	"type": "postgres",
	"host": process.env.TYPEORM_HOST,
	"port": process.env.TYPEORM_PORT,
	"username": process.env.TYPEORM_DATABASE,
	"password": process.env.TYPEORM_PASSWORD,
	"database": process.env.TYPEORM_USERNAME,
	synchronize: true,
	"entities": ["src/App/Models/*.ts"],
	"migrations": ["src/App/Migrations/*.ts"],
};