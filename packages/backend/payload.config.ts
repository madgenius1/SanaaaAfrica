import { buildConfig } from 'payload/config';
import path from 'path';
import Products from './collections/Products';
import Artisans from './collections/Artisans';
import Collections from './collections/Collections';
import Testimonials from './collections/Testimonials';
import Settings from './collections/Settings';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Sanaa African Curios',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  collections: [
    Products,
    Artisans,
    Collections,
    Testimonials,
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(__dirname, './uploads'),
        staticURL: '/media',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 400,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 768,
            position: 'centre',
          },
          {
            name: 'tablet',
            width: 1024,
            height: undefined,
            position: 'centre',
          },
        ],
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  globals: [Settings],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ].filter(Boolean),
});