'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {
  ExitCode
} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const ANNOUNCE_SENTENCES_LIMIT = 5;
const POST_SENTENCES_LIMIT = 10;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const generateDate = () => {
  // Три месяца
  const lowerLimitDate = 3 * 30 * 24 * 60 * 60 * 1000;
  const currentDate = Date.now();

  return new Date(getRandomInt(currentDate - lowerLimitDate, currentDate));
};

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf8`);
    return content.split(`\r\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generatePosts = (count, titles, sentences, categories) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, getRandomInt(1, ANNOUNCE_SENTENCES_LIMIT)).join(` `),
    fullText: shuffle(sentences).slice(getRandomInt(ANNOUNCE_SENTENCES_LIMIT, POST_SENTENCES_LIMIT)).join(` `),
    createdDate: generateDate().toLocaleString(`ru`),
    сategory: shuffle(categories).slice(0, 3),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    let [count] = args;
    count = count > MAX_COUNT ? MAX_COUNT : count;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generatePosts(countOffer, titles, sentences, categories));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Successful!`));
      process.exit(ExitCode.success);

    } catch (err) {
      console.error(chalk.red(`Error!`));
      process.exit(ExitCode.error);
    }
  }
};
