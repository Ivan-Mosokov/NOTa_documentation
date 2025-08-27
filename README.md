# Документация NOTa

Этот проект содержит документацию системы NOTa, построенную на EventCatalog.

## 🎯 Система иконок

Проект включает систему для отображения SVG иконок в MDX файлах с поддержкой EventCatalog.

### Быстрый старт

1. **Добавьте SVG файл в папку `public/`**
2. **Используйте в MDX файлах:**

```mdx
<!-- Прямое использование HTML (рекомендуемый) -->
<img src="/icon-name.svg" alt="Icon description" width="24" height="24" style="display: inline-block; vertical-align: middle;" />

<!-- Встроенный SVG -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- SVG содержимое -->
</svg>
```

### Автоматическое создание компонентов

```bash
npm run create-icon <имя-svg-файла>
```

**Пример:**
```bash
npm run create-icon Duplicate24
```

### Доступные иконки

- `Duplicate24.svg` - Иконка дублирования
- `plus24.svg` - Иконка плюса

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка проекта
npm run build

# Предварительный просмотр
npm run preview
```

## 📁 Структура проекта

```
documentation/
├── components/           # React компоненты иконок
├── domains/             # Домены системы
├── public/              # Статические файлы (SVG иконки)
├── scripts/             # Скрипты автоматизации
├── templates/           # Шаблоны для иконок
├── .eventcatalog-core/  # Сгенерированные файлы EventCatalog
└── README.md           # Документация
```

## 📖 Документация

- [Компоненты иконок](./components/README.md) - Подробная документация по системе иконок
- [Шаблон иконок](./templates/icon-template.md) - Шаблон для быстрого добавления иконок

## 🛠️ Технологии

- **EventCatalog** - Платформа для документации
- **React** - Компоненты иконок
- **MDX** - Расширенный Markdown
- **Astro** - Статический генератор сайтов

## 📝 Лицензия

Внутренний проект NOTa.
