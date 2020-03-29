'use strict';

const express = require(`express`);
const app = express();
const path = require(`path`);

const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту ${DEFAULT_PORT}`));
