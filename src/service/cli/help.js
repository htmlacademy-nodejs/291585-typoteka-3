'use strict';

module.exports = {
  name: `--help`,
  run() {
    console.info(`
      Программа запускает http-сервер и формирует файл с данными для API.

      Гайд:
      server &lt;command&gt;
      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate &lt;count&gt;    формирует файл mocks.json
    `);
  }
};
