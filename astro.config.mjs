import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [NetlifyCMS({
    config: {
      backend: {
        name: 'git-gateway',
        branch: 'latest',
      },
      publish_mode: 'editorial_workflow',
      logo_url: '/assets/chimeras.png',
      media_folder: 'public/assets/blog',
      public_folder: '/assets/blog',
      collections: [{
        name: 'settings',
        label: 'Настройки',
        files: [{
          label: 'Глобальные настройки',
          name: 'global',
          file: 'src/pages/settings/global.md',
          fields: [{
            label: 'Title',
            name: 'title',
            widget: 'string'
          }, {
            label: 'Main Image',
            name: 'mainImage',
            widget: 'image'
          }, {
            label: 'Cсылка на ВК',
            name: 'vk',
            widget: 'string'
          }, {
            label: 'Cсылка на телеграм',
            name: 'telegram',
            widget: 'string'
          }]
        }]
      }, {
        name: "issues",
        label: "Номера",
        folder: "src/pages/issues",
        create: true,
        delete: true,
        fields: [{
          name: "issueNumber",
          widget: "number",
          label: "№ номера"
        }, {
          name: "title",
          widget: "string",
          label: "Название номера"
        }, {
          name: 'coverImage',
          widget: 'image',
          label: 'Обложка номера'
        }, {
          name: "description",
          widget: "text",
          label: "Описание номера"
        }, {
          name: 'publishDate',
          widget: 'datetime',
          format: 'MM YY',
          date_format: 'MM YY',
          label: 'Дата'
        }, {
          name: "select_categories",
          label: "Категории",
          widget: "relation",
          multiple: true,
          collection: "categories",
          search_fields: ["title"],
          value_field: "title",
          display_fields: ["title"]
        }, {
          name: 'layout',
          widget: 'hidden',
          default: '../../layouts/IssueLayout.astro',
        }]
      }, {
        name: "categories",
        label: "Категории",
        folder: "src/pages/categories",
        create: true,
        delete: true,
        fields: [{
          name: "title",
          widget: "string",
          label: "Название категории"
        }, {
          name: "select_stories",
          label: "Посты",
          widget: "relation",
          multiple: true,
          collection: "posts",
          search_fields: ["title"],
          value_field: "title",
          display_fields: ["title"]
        }]
      }, {
        name: 'posts',
        label: 'Посты',
        label_singular: 'Пост',
        folder: 'src/pages/posts',
        create: true,
        delete: true,
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Название поста'
        }, {
          name: 'coverImage',
          widget: 'image',
          label: 'Обложка поста',
          required: false
        }, {
          name: 'publishDate',
          widget: 'datetime',
          format: 'DD MMM YYYY',
          date_format: 'DD MMM YYYY',
          time_format: false,
          label: 'Дата'
        }, {
          name: "author",
          label: "Автор",
          widget: "relation",
          multiple: true,
          collection: "authors",
          search_fields: ["title"],
          value_field: "title",
          display_fields: ["title"]
        }, {
          name: 'body',
          widget: 'markdown',
          label: 'Материал'
        }, {
          name: 'htmlfile',
          widget: 'file',
          label: 'Материал'
        }, {
          name: 'layout',
          widget: 'hidden',
          default: '../../layouts/BlogPostLayout.astro',
        }]
      }, {
        name: 'authors',
        label: 'Авторы',
        label_singular: 'Автор',
        folder: 'src/pages/authors',
        create: true,
        delete: true,
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Имя автора',
          required: true,
        }, {
          name: 'avatar',
          widget: 'image',
          label: 'Аватарка автора',
          required: false
        }, {
          name: 'description',
          widget: 'text',
          label: 'Описание',
          required: false
        }, {
          name: 'layout',
          widget: 'hidden',
          default: '../../layouts/AuthorLayout.astro',
        }
      ]
      }],
      previewStyles: ['/src/styles/blog.css']
    }
  }), tailwind(), react()]
});