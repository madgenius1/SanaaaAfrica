import { CollectionConfig } from 'payload/types';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'artisan', 'price_cents', 'stock', 'public'],
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'price_cents',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in cents (e.g., 4500 = $45.00)',
      },
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      defaultValue: 'USD',
      options: [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' },
        { label: 'KES', value: 'KES' },
      ],
    },
    {
      name: 'hero_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      maxRows: 6,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 500,
    },
    {
      name: 'backstory',
      type: 'richText',
      required: true,
      admin: {
        description: 'The detailed story behind this piece',
      },
    },
    {
      name: 'materials',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., Glass beads, leather, brass',
      },
    },
    {
      name: 'dimensions',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., 18" length, 2" width',
      },
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'artisan',
      type: 'relationship',
      relationTo: 'artisans',
      required: true,
      hasMany: false,
    },
    {
      name: 'collections',
      type: 'relationship',
      relationTo: 'collections',
      hasMany: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'public',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Show this product on the website',
      },
    },
    {
      name: 'stripePriceId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Stripe Price ID (optional, for advanced usage)',
      },
    },
    // SEO Fields
    {
      name: 'seoTitle',
      type: 'text',
      admin: {
        description: 'Override default SEO title',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'Meta description for search engines',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Custom Open Graph image (1200x630px recommended)',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // TODO: Trigger ISR revalidation on the frontend
        // This would call a revalidation endpoint on the Next.js app
        if (operation === 'create' || operation === 'update') {
          console.log(`Product ${doc.slug} was ${operation}d`);
          // Example: await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=/product/${doc.slug}`);
        }
      },
    ],
  },
};