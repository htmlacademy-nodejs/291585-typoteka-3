'use strict';

const express = require(`express`);
const app = express();
const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);

const DEFAULT_PORT = 8080;

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту ${DEFAULT_PORT}`));
