// Streams
/*
used to process (read & write) data piece by piece (chunks), without completing
the whole read or write operation, abd therefore without keeping all the data in mermory
*/
// TYPES of stream -> Readable, writeable, Duplex, Transform stram
/*
Readable
stream from which we can read (consome data)
eg -> http requests, fs read stream
important events -> data, end
important function -> pipe(), read()

Writeable ->
stream to which we can write data
eg -> http response
important events -> drain, finish
important function -> write(), end()

Duplex ->
stream that are both readable and writeable
eg -> net web socket

Transform ->
Duplex stream that transform data as it is written or read
eg -> zlib gzip creation
*/

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) return console.log(err);
  //   res.end(data);
  // });
  // Solution 2: Streams
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   res.statusCode = 500;
  //   res.end(err);
  // });
  // Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server listing.........");
});
