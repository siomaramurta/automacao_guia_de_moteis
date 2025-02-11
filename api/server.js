const jsonServer = require('json-server');
const { handleError, handleCreateUser } = require('./routes');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/error', handleError);

server.post("/users", (req, res) => handleCreateUser(req, res, router));

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server rodando em http://localhost:3000");
}).on('error', (err) => {
  console.error('Erro ao iniciar o servidor:', err);
});
