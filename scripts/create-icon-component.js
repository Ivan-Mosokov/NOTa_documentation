#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Скрипт для автоматического создания React компонентов иконок
 * Использование: node scripts/create-icon-component.js <имя-иконки>
 * Пример: node scripts/create-icon-component.js Duplicate24
 */

const iconName = process.argv[2];

if (!iconName) {
    console.error('Пожалуйста, укажите имя иконки');
    console.error('Использование: node scripts/create-icon-component.js <имя-иконки>');
    process.exit(1);
}

// Проверяем, существует ли SVG файл
const svgPath = path.join(__dirname, '../public', `${iconName}.svg`);
if (!fs.existsSync(svgPath)) {
    console.error(`SVG файл не найден: ${svgPath}`);
    process.exit(1);
}

// Создаем имя компонента (PascalCase)
const componentName = iconName
    .replace(/^[a-z]/, (match) => match.toUpperCase())
    .replace(/[A-Z]/g, (match, index) => {
        if (index === 0) return match;
        return match;
    });

// Создаем содержимое компонента
const componentContent = `import React from 'react';
import Icon from './Icon';

/**
 * Компонент иконки ${componentName}
 * @param {Object} props - Свойства компонента
 * @param {number} props.width - Ширина иконки (по умолчанию 24)
 * @param {number} props.height - Высота иконки (по умолчанию 24)
 * @param {string} props.className - CSS классы
 * @param {Object} props.style - Инлайн стили
 */
const ${componentName}Icon = ({ 
  width = 24, 
  height = 24, 
  className = '', 
  style = {}, 
  ...props 
}) => {
  return (
    <Icon
      name="${iconName}"
      width={width}
      height={height}
      className={className}
      style={style}
      alt="${componentName} icon"
      {...props}
    />
  );
};

export default ${componentName}Icon;
`;

// Создаем файл компонента
const componentPath = path.join(__dirname, '../components', `${componentName}Icon.jsx`);
fs.writeFileSync(componentPath, componentContent);

// Обновляем index.js
const indexPath = path.join(__dirname, '../components/index.js');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Добавляем новый экспорт
const newExport = `export { default as ${componentName}Icon } from './${componentName}Icon';`;
if (!indexContent.includes(newExport)) {
    indexContent = indexContent.replace(
        /export { default as PlusIcon } from '\.\/PlusIcon';/,
        `export { default as PlusIcon } from './PlusIcon';\nexport { default as ${componentName}Icon } from './${componentName}Icon';`
    );
    fs.writeFileSync(indexPath, indexContent);
}

// Обновляем mdx-components.jsx
const mdxPath = path.join(__dirname, '../mdx-components.jsx');
let mdxContent = fs.readFileSync(mdxPath, 'utf8');

// Добавляем импорт
if (!mdxContent.includes(`${componentName}Icon`)) {
    mdxContent = mdxContent.replace(
        /import \{ DuplicateIcon, Icon, PlusIcon \} from '\.\/components';/,
        `import { DuplicateIcon, Icon, PlusIcon, ${componentName}Icon } from './components';`
    );

    // Добавляем в объект компонентов
    mdxContent = mdxContent.replace(
        /export const mdxComponents = \{[\s\S]*?PlusIcon,[\s\S]*?\};/,
        `export const mdxComponents = {\n  DuplicateIcon,\n  Icon,\n  PlusIcon,\n  ${componentName}Icon,\n  // Можно добавить другие компоненты здесь\n};`
    );

    fs.writeFileSync(mdxPath, mdxContent);
}

console.log(`✅ Компонент ${componentName}Icon создан успешно!`);
console.log(`📁 Файл: ${componentPath}`);
console.log(`📝 Использование в MDX: <${componentName}Icon />`);
