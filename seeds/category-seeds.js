const { Category } = require('../models');

const categoryData = [
  {
    name: 'Yard Sale',
  },
  {
    name: 'Event',
  },
  {
    name: 'Volunteer',
  },
  {
    name: 'Service',
  },
  {
    name: 'Trade',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;