const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark,
} = require('../controllers/bookmarkController');

router.use(auth);

router.route('/')
    .get(getBookmarks)
    .post(createBookmark);

router.route('/:id')
    .put(updateBookmark)
    .delete(deleteBookmark);

module.exports = router;