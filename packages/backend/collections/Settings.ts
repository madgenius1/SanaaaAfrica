import { GlobalConfig } from 'payload/types';

const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Sanaa African Curios',
    },
    {
      name: 'defaultCurrency',
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
      name: 'socialHandles',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          admin: {
            placeholder: '@sanaaafricancurios',
          },
        },
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'pinterest',
          type: 'text',
        },
        {
          name: 'tiktok',
          type: 'text',
        },
      ],
    },
    {
      name: 'heroContent',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: 'Handcrafted African Treasures',
        },
        {
          name: 'subheadline',
          type: 'text',
          required: true,
          defaultValue: 'Every piece tells a story. Every purchase changes a life.',
        },
        {
          name: 'ctaText',
          type: 'text',
          required: true,
          defaultValue: 'Explore Collection',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featuredCollections',
      type: 'relationship',
      relationTo: 'collections',
      hasMany: true,
      maxRows: 3,
    },
  ],
};

export default Settings;