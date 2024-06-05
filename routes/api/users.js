const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    // find all users
    try {
        const userData = await User.find();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:userId', async (req, res) => {
    // update a user by its `id` value
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId },
            req.body, { new: true }
        )
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete on user by its `id` value
    try {
        const userData = await User.findOneAndDelete({
            _id: req.params.id
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        res.status(200).json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;