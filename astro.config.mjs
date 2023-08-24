import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [NetlifyCMS({
    config: {
      // Use Netlify’s “Git Gateway” authentication and target our default branch
      backend: {
        name: 'git-gateway',
        branch: 'latest'
      },
      // Configure where our media assets are stored & served from
      media_folder: 'public/assets/blog',
      public_folder: '/assets/blog',
      // Configure the content collections
      collections: [{
        name: 'posts',
        label: 'Blog Posts',
        label_singular: 'Blog Post',
        folder: 'src/pages/posts',
        create: true,
        delete: true,
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Post Title'
        }, {
          name: 'coverImage',
          widget: 'image',
          label: 'Cover Image',
          required: false
        }, {
          name: 'publishDate',
          widget: 'datetime',
          format: 'DD MMM YYYY',
          date_format: 'DD MMM YYYY',
          time_format: false,
          label: 'Publish Date'
        }, {
          name: 'author',
          widget: 'string',
          label: 'Author Name',
          required: false
        }, {
          name: 'authorURL',
          widget: 'string',
          label: 'Author URL',
          required: false
        }, {
          name: 'description',
          widget: 'string',
          label: 'Description',
          required: false
        }, {
          name: 'body',
          widget: 'markdown',
          label: 'Post Body'
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
        name: 'settings',
        label: 'Settings',
        files: [
          {
            label: 'Global Settings',
            name: 'global',
            file: 'src/pages/settings/global.json',
            fields: [
              {
                label: 'Title',
                name: 'title',
                widget: 'string'
              },
              {
                label: 'Main Image',
                name: 'mainImage',
                widget: 'image'
              }
            ]
          }
        ]
      }, {
        name: 'categories',
        label: 'Categories',
        label_singular: 'Category',
        folder: 'src/pages/categories',
        create: true,
        delete: true,
        fields: [
          {
            name: 'title',
            widget: 'string',
            label: 'Title'
          },
          {
            name: 'select_stories',
            label: 'Select Stories',
            label_singular: 'Select Story',
            widget: 'relation',
            multiple: true,
            collection: 'posts', // Specify the collection to relate to (posts)
            search_fields: ['title'], // Search posts by their title
            value_field: 'title', // Use the title as the value
            display_fields: ['title'] // Display the title in the select box
          }
        ]
      }
      ],
    },
    previewStyles: ['/src/styles/blog.css']
  }), tailwind()]
});