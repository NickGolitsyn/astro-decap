import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
// import { Widget as IdWidget } from '@ncwidgets/id'

// NetlifyCMS.registerWidget(IdWidget)
// NetlifyCMS.init()

// https://astro.build/config
export default defineConfig({
  integrations: [NetlifyCMS({
    config: {
      // Use Netlify’s “Git Gateway” authentication and target our default branch
      backend: {
        name: 'git-gateway',
        // name: 'github',
        // repo: 'nickgolitsyn/astro-decap',
        branch: 'latest',
      },
      // Configure where our media assets are stored & served from
      media_folder: 'public/assets/blog',
      public_folder: '/assets/blog',
      // Configure the content collections
      collections: [{
        name: 'settings',
        label: 'Настройки',
        files: [{
          label: 'Global Settings',
          name: 'global',
          file: 'src/pages/settings/global.json',
          fields: [{
            label: 'Title',
            name: 'title',
            widget: 'string'
          }, {
            label: 'Main Image',
            name: 'mainImage',
            widget: 'image'
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
          label: "Номер №"
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
          name: "body",
          widget: "markdown",
          label: "Описание номера",
          required: false
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
          name: 'author',
          widget: 'string',
          label: 'Автор',
          required: false
        }, {
          name: 'authorURL',
          widget: 'string',
          label: 'Автор URL',
          required: false
        }, {
          name: 'description',
          widget: 'string',
          label: 'Описание',
          required: false
        }, {
          name: 'body',
          widget: 'markdown',
          label: 'Материал'
        }, {
          name: 'layout',
          widget: 'select',
          default: '../../layouts/BlogPostLayout.astro',
          options: [{
            label: 'Blog Post',
            value: '../../layouts/BlogPostLayout.astro'
          }]
        }]
      }, {
        name: 'authors',
        label: 'Авторы',
        label_singular: 'Автор',
        folder: 'src/pages/authors',
        create: true,
        delete: true,
        fields: [{
          name: 'author_name',
          label: 'Имя автора',
          widget: 'string',
          required: true,
        }, 
        // {
        //   label: 'ID',
        //   name: 'id',
        //   widget: 'ncw-id',
        //   prefix: 'author',
        //   timestamp: true,
        //   hint: 'This widget generate an unique read-only id'
        // }
      ]
      }],
      previewStyles: ['/src/styles/blog.css']
    }
  }), tailwind(), react()]
});