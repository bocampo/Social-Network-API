const router = require('express').Router();
const { User } = require('../../models');
const Thought = require('../../models/Thought');

router.get('/', async (req, res) => {
    // find all thoughts
    try {
        const thoughtData = await Thought.findAll();
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findByPk(req.params.id);

        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // 
    try {
        const thoughtData = await Thought.create(req.body);
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true });

        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:id', async (req, res) => {
    // update a thought by its `id` value
    try {
        const thought = await Thought.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete on thought by its `id` value
    try {
        const thoughtData = await Thought.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!thoughtData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.params.reactionId } }, { new: true });

        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;