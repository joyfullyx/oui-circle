const router = require("express").Router();
const { User, Category, Card, Comment } = require("../models");
const withAuth = require("../utils/auth");
const geoip = require("geoip-lite");
const sequelize = require("sequelize");
const { getDistanceLatLonToMiles } = require('../utils/geo');

router.get("/", async (req, res) => {
  try {
    let forwardedIpsStr = req.header("x-forwarded-for");
    
    // JOY'S IP ADDRESS
    let ip = '71.231.34.183';
    
    // TEST IP ADDRESS 
    // var ip = "207.97.227.239";
    console.log('ip:', ip);
    // console.log('req.ip:', req.ip);
    const geo = geoip.lookup(forwardedIpsStr);
    const lat = parseFloat(geo.ll[0]);
    const lon = parseFloat(geo.ll[1]);
    const city = geo.city;
    const state = geo.region;
    console.log('city, state: ', city, state, lat, lon);
    console.log('The IP is %s', geoip.pretty(ip));
    // =========================================================
    if (forwardedIpsStr) {
      ip = forwardedIps = forwardedIpsStr.split(",")[0];
    }

    const cardData = await Card.findAll(req.params.id, {
      include: [
        {
          model: User, 
          model: Comment
        }
      ]
    });

    const cards = cardData.filter((card) => {
      console.log('distance between ip and event in miles: ',(getDistanceLatLonToMiles(
        lat,
        lon,
        parseFloat(card.event_location_lat),
        parseFloat(card.event_location_lon),
      )))
      if (
        getDistanceLatLonToMiles(
          lat,
          lon,
          parseFloat(card.event_location_lat),
          parseFloat(card.event_location_lon)
        ) < 30.00
      )
        return card.get({ plain: true });
    });
    const allCards = cards.map((card) => card.get({plain: true}));

//     // Pass serialized data and session flag into template
    if(req.session.logged_in){
      res.redirect('/profile');
    }
    res.render("homepage", { card: allCards});
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/cards/:id', async (req, res) => {
  if(!req.session.logged_in) {
    try {
      const cardData = await Card.findByPk(req.params.id, {
        include: [
          {
            model: User,
            model: Comment,
          },
        ],
      });
      const card = cardData.get({ plain: true });
  
      res.render('viewcard', {card: card});
    } catch (err) {
      res.status(500).json(err);
    } 
  } 
  else {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: {
          exclude: ['password']
        },
      })
  
      const user = await userData.get({ plain: true });

      const cardData = await Card.findByPk(req.params.id, {
        include: [
          {model: User},
          {model: Comment, include: [User]},
        ],
      });
      const card = cardData.get({ plain: true });

        res.render('viewcard', {
          ...user, 
          ...card, 
          card: card, 
          logged_in: req.session.logged_in, 
          currUser: req.session.user_id
        });
 
    } catch (err) {
        res.status(500).json(err);
      }
  }
});
  
router.get('/categories/:id', async (req, res) => {
  if(!req.session.logged_in) {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [
          { 
            model: Card   
          },
        ],
      });
      
      const category = categoryData.get({ plain: true });
      res.render('category', {
        ...category,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } 
  else {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: {
          exclude: ['password']
        },
      })
  
      const user = await userData.get({ plain: true });

      const categoryData = await Category.findByPk(req.params.id, {
        include: [
          { 
            model: Card   
          },
        ],
      });
      
      const category = categoryData.get({ plain: true });
      res.render('category', {
        ...category,
        ...user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  }
);

router.get('/profile', withAuth, async(req, res) => {

  try {
    var forwardedIpsStr = req.header('x-forwarded-for');
    // JOY'S IP ADDRESS
    var ip = '71.231.34.183';
    // TEST IP ADDRESS 
    // var ip = "207.97.227.239";
    console.log('ip:', ip);

    var geo = geoip.lookup(ip);
    var lat = parseFloat(geo.ll[0]);
    var lon = parseFloat(geo.ll[1]);
    var city = geo.city;
    var state = geo.region;

    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
    })

    const user = await userData.get({ plain: true });
    const cardData = await Card.findAll(req.params.id, {
      include: [
        { model: User },
        { model: Comment }
      ]
    })

    const cards = cardData.filter((card) => {
      console.log('distance between ip and event in miles: ', (getDistanceLatLonToMiles(
        lat, 
        lon,
        parseFloat(card.event_location_lat),
        parseFloat(card.event_location_lon),
      )))
      if (
        getDistanceLatLonToMiles(
          lat,
          lon,
          parseFloat(card.event_location_lat),
          parseFloat(card.event_location_lon)
        ) < 30.00
      )
      return card.get({ plain: true });
    });
    const allCards = cards.map((card) => card.get({plain: true}));
    const filterCards = allCards.filter(card => card.user_id == req.session.user_id);
    res.render('profile', {
      card: allCards,
      myCards: filterCards,
      ...user,
      logged_in: true, 
      currUser: req.session.user_id //test line
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
})

router.get('/logout', async (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {

        res.status(204).end();
      });
    if (!req.session) {
      res.redirect(303, '/');
    };
  } else {
      res.status(404).end();
  }
});

module.exports = router
