import { CollectionConfig } from 'payload/types';

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'relation', 'createdAt'],
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
      name: 'relation',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g., Customer, Gallery Owner, Designer',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      maxLength: 500,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export default Testimonials;