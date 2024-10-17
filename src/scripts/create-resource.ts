import 'dotenv/config';
// import minimist from 'minimist';
import fs from 'fs';
import inquirer, { Question } from 'inquirer';
import { createPageTemplate, pagePageTemplate } from './templates';

// const args = minimist(process.argv.slice(2));

const resource = process.argv[2];
const basePath = 'src/app/admin';

if (!resource) {
  console.error('Please provide a resource name as an argument.');
  process.exit(1);
}

console.log(`Creating resource: ${resource}`);
const resourcePath = `${basePath}/${resource}`;

const homePage = async (resource: string) => {
  fs.mkdirSync(resourcePath, { recursive: true });
  const pagePath = `${resourcePath}/page.tsx`;
  fs.writeFileSync(pagePath, pagePageTemplate(resource));
  console.log(`File created: ${pagePath}`);
};

const createPage = async (resource: string) => {
  fs.mkdirSync(`${resourcePath}/new`, { recursive: true });
  const pagePath = `${resourcePath}/new/page.tsx`;
  fs.writeFileSync(pagePath, createPageTemplate(resource));
  console.log(`File created: ${pagePath}`);
};

export async function main() {
  const questions: Question[] = [
    {
      type: 'confirm',
      name: 'homePage',
      message: 'Home page?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'createPage',
      message: 'Create page?',
      default: true,
    },
  ];
  const answers = await inquirer.prompt(questions as any);
  if (answers.homePage) {
    await homePage(resource);
  }
  if (answers.createPage) {
    await createPage(resource);
  }
}

main();
