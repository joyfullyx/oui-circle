const router = require('express').Router({mergeParams: true});
const { Comment, Card } = require('../../models');
const withAuth = require('../../utils/auth');

//Retrieve Comment Route
router.get('/', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.findAll({
            include: [{ model: Card }],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err);
    }
});

//Post Comment Route
router.post('/:id', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            card_id: req.params.id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Update Comment Route
router.put('/:id', withAuth, async (req, res) => {
    try{
      const editComment = await Comment.findOne(
        { where: {id: req.params.id} }
        )
        const updateComment = await editComment.update(
            { content: req.body.content },
            { new: true },
            { where: {id: req.params.id} },
        )
        
        const plainComment = updateComment.get({ plain: true })

        res.json(200).json(plainComment);
    } catch (err) {
        res.status(400).end();
    }
  });

router.get('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.id,
            },
        });
        const comments = commentData.get({ plain: true });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete Comment Route
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
           where: {
               id: req.params.id,
               user_id: req.session.user_id,
           },
        });
        console.log(req.params.id);
        if(!commentData) {
            res.status(404).json({ message: 'No comment found.'});
            return;
        }

        res.status(200).json(commentData);
        res.redirect('/');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;