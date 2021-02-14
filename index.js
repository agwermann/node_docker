const http = require('http');
const getId = require('docker-container-id');

let containerMessage = null;
async function getContainerID() {
  let id = await getId();
  if (!id) {
    console.error("Woah, you need to containerize this application!");
  } else {
    containerMessage = 'Container ID: ' + id + '\n';
  }
}

getContainerID();
const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello World!\n');
  res.end(containerMessage);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});