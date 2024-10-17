import 'dotenv/config';
// import minimist from 'minimist';
import fs from 'fs';
import { pageTemplate } from './templates';

// const args = minimist(process.argv.slice(2));

const resource = process.argv[2];
const basePath = 'src/app/admin';

if (!resource) {
  console.error('Please provide a resource name as an argument.');
  process.exit(1);
}

console.log(`Creating resource: ${resource}`);
const resourcePath = `${basePath}/${resource}`;
fs.mkdirSync(resourcePath, { recursive: true });

const createPage = async (resource: string) => {
  const pagePath = `${resourcePath}/page.tsx`;
  fs.writeFileSync(pagePath, pageTemplate(resource));
  console.log(`File created: ${pagePath}`);
};

createPage(resource);
