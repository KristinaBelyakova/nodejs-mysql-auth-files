const dotenv = require('dotenv').config()
const http = require('http') 
const app = require('./app.js') 

const PORT = process.env.APP_PORT ?? 3000;
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
