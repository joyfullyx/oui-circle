const User = require('./User');
const Category = require('./Category');
const Comment = require('./Comment');
const Card = require('./Card');

User.hasMany(Card, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Card.belongsTo(User, {
    foreignKey: 'user_id',
})

Category.hasMany(Card, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

Card.belongsTo(Category, {
    foreignKey: 'category_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

Card.hasMany(Comment, {
    foreignKey: 'card_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Card, {
    foreignKey: 'card_id',
})

module.exports = {
    User,
    Category,
    Comment,
    Card,
};

// card belongs to many users through comment