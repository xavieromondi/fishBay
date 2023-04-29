export const schemaTypes = [
  {
    name: 'Restaurant',
    type: 'document',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
      },
      {name: 'price', type: 'number', title: 'Price'},
      {
        name: 'location',
        type: 'geopoint',
        title: 'Location',
      },
    ],
  },
]
