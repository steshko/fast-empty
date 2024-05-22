const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
if (componentName === undefined) {
  throw Error('Component Name Required');
}

const pascalToDash = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const dashComponentName = pascalToDash(componentName);
const folderPath = path.join(process.env.INIT_CWD, dashComponentName);

if (fs.existsSync(folderPath)) {
  console.error(`${dashComponentName} Direcotry already exists`);
}

const tsFile = `import { FASTElement, customElement } from '@microsoft/fast-element';
import template from './${dashComponentName}.template';
import styles from './${dashComponentName}.styles';

const name = '${dashComponentName}';

@customElement({ name, template, styles })
export default class ${componentName} extends FASTElement {}
`;

const templateFile = `import { html } from '@microsoft/fast-element';
import ${componentName} from './${dashComponentName}';

const ${componentName}Template = html<${componentName}>\`\`;

export default ${componentName}Template;
`;

const stylesFile = `import { css } from '@microsoft/fast-element';

const ${componentName}Styles = css\`\`;

export default ${componentName}Styles;
`;

const indexFile = `export * from './${dashComponentName}';
`;

const fsWriteCallback = str => err =>
  err ? console.error(`Error writing file ${str}:`, err) : console.log(`${str} created`);

const promises = [];
const writeFile = (fileName, fileContent) =>
  promises.push(
    fs.writeFile(path.join(folderPath, fileName), fileContent, fsWriteCallback(fileName))
  );

try {
  fs.mkdirSync(folderPath);

  writeFile(`${dashComponentName}.ts`, tsFile);
  writeFile(`${dashComponentName}.template.ts`, templateFile);
  writeFile(`${dashComponentName}.styles.ts`, stylesFile);
  writeFile('index.ts', indexFile);
  const cwdIndexPath = path.join(process.env.INIT_CWD, 'index.ts');
  fs.readFile(cwdIndexPath, 'utf8', (err, data) => {
    if (err || !data) {
      return;
    }
    promises.push(
      fs.writeFile(
        cwdIndexPath,
        `${data.trim()}\n${indexFile}`,
        fsWriteCallback(cwdIndexPath)
      )
    );
  });

  Promise.all(promises);
} catch (e) {
  console.error(e);
}
