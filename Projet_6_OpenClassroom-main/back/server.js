//importation du pack http et la l' application (app)
const http = require("http");
const app = require("./app");
const port = 3000;

//parametrage du port
app.set("Port", process.env.PORT_SERVER)
//création du server
const server = http.createServer(app);

//
server.listen(process.env.PORT_SERVER)
console.log("Server listening on PORT", process.env.PORT_SERVER);