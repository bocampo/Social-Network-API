const router = require('express').Router();
const { User } = require('../../models');
const Thought = require('../../models/Thought');

router.get('/', async (req, res) => {
    // find all thoughts
    try {
        const thoughtData = await Thought.find();
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findById(req.params.id);

        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:userId', async (req, res) => {
    // 
    try {
        const thoughtData = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { thoughts: thoughtData._id } }, { new: true })
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

router.put('/:thoughtId', async (req, res) => {
    // update a thought by its `id` value
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            req.body, { new: true }
        )
        res.json(thought)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete on thought by its `id` value
    try {
        const thoughtData = await Thought.findOneAndDelete({
            _id: req.params.id
        });

        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }

        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });

        res.json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;