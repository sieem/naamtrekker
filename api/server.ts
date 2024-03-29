import { config } from "dotenv";
import express from "express";
import cors from "cors";
import type { AddressInfo } from "net";
import compression from "compression";
import { createReadStream } from "fs";
import { extname } from "path";
import { createServer } from "http";
import { router } from "./routes";
import { initDb, populateDb } from './services/db.service';
import { existsSync } from "fs";

config();
const app = express()
const staticRoot = '../../dist/'

app.use(express.json());
app.use(cors());
app.use(compression());

initDb().then(() => {
  if (!existsSync('./api/naamtrekker.sqlite')) {
    populateDb();
  }
});

app.use('/api', router);

app.use(function (req, res, next) {
  //if the request is not html then move along
  const accept = req.accepts('html', 'json', 'xml');
  if (accept !== 'html') {
    return next();
  }

  // if the request has a '.' assume that it's for a file, move along
  const ext = extname(req.path);
  if (ext !== '') {
    return next();
  }

  createReadStream(`${staticRoot}index.html`).pipe(res);

});

app.use(express.static(staticRoot, { dotfiles: 'allow' }));

const httpServer = createServer(app);
httpServer.listen(process.env.PORT ?? 3002, () => {
  const { port } = httpServer.address() as AddressInfo;
  console.log(`App listening on port ${ port } Non-SSL`);
});