import { CollectionConfig } from 'payload/types';

const Artisans: CollectionConfig = {
  slug: 'artisans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
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
            if (!value && data?.name) {
              return data.name
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
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., Nairobi, Kenya',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Short bio for card display',
      },
    },
    {
      name: 'story',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full artisan story and background',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 5,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage',
      },
    },
  ],
};

export default Artisans;