const { Card } = require('../models');

const cardData = [
  {
    event_name: 'Yard Sale',
    event_description: 'Yard sale happening Sunday! Everything must go!',
    event_location_lat: '47.8209301',
    event_location_lon: '-122.3151313',
    event_city: 'Lynnwood',
    event_state: 'WA',
    event_date: 'August 15, 2021',
    event_time: '06:00',
    category_id: 1,
    user_id: 3,
  },
  {
    event_name: 'Thurston County Food Bank needs volunteers to build fence',
    event_description: 'Thurston County Food Bank lost our fence last week when a car jumped the curb. We need volunteers to assist in rebuilding it next Friday. All comers welcome, water and sodas provided!',
    event_location_lat: '47.755653',
    event_location_lon: '-122.341515',
    event_city: 'Shoreline',
    event_state: 'WA',
    event_date: 'August 20, 2021',
    event_time: '12:00',
    category_id: 3,
    user_id: 5,
  },
  {
    event_name: 'Star Wars Movie Night at Lions Park!',
    event_description: 'Every month, Lions Park holds a movie showing for the community. This month its Star Wars! Bring the kids and grab a spot early. Snacks and drinks will be sold on premesis.',
    event_location_lat: '47.608013',
    event_location_lon: '-122.335167',
    event_city: 'Seattle',
    event_state: 'WA',
    event_date: 'August 29, 2021',
    event_time: '08:00',
    category_id: 2,
    user_id: 2,
  },
  {
    event_name: 'Student offers Lawn Mowing',
    event_description: 'Hi! I am offering a lawn moving service, $30 a lawn. I am trying to earn money for a birthday present for my mom. Available any weekends, or in the evenings by appointment.',
    event_location_lat: '47.037872',
    event_location_lon: '-122.900696',
    event_city: 'Olympia',
    event_state: 'WA',
    event_date: 'August 1,2021',
    event_time: '06:00',
    category_id: 4,
    user_id: 4,
  },
  {
    event_name: 'Will barter knitting for yard work',
    event_description: 'Need help with my garden, as my knees are not what they used to be. Will knit a gift for anyone who helps, keep or give to a friend!',
    event_location_lat: '47.8209301',
    event_location_lon: '-122.3151313',
    event_city: 'Lynnwood',
    event_state: 'WA',
    event_date: 'August 22, 2021',
    event_time: '10:00',
    category_id: 5,
    user_id: 1,
  },
];

const seedCard = () => Card.bulkCreate(cardData);

module.exports = seedCard;
