import type { CollectionConfig } from 'payload'

const ClinicalTrials: CollectionConfig = {
  slug: 'clinical-trials',
  admin: {
    useAsTitle: 'treatment',
    defaultColumns: ['treatment', 'trial', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'treatment',
      type: 'text',
      required: true,
      label: 'Treatment',
    },
    {
      name: 'trial',
      type: 'text',
      required: true,
      label: 'Trial Number',
    },
    {
      name: 'histology',
      type: 'text',
      required: true,
      label: 'Histology/Population',
    },
    {
      name: 'combination',
      type: 'text',
      required: true,
      label: 'Combination',
    },
    {
      name: 'region',
      type: 'text',
      required: true,
      label: 'Recruitment Region',
    },
    {
      name: 'status',
      type: 'text',
      required: true,
      label: 'Status',
    },
  ],
};

export default ClinicalTrials;