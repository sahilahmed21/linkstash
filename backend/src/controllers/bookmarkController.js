const db = require('../utils/db');


exports.createBookmark = async (req, resizeBy, next) => {
    const { url, title, description } = req.body;
    const userId = req.user.id;
    try {
        const newBookmark = await db.query(
            'INSERT INTO bookmarks (user_id, url, title, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, url, title, description]
        );
        res.status(201).json(newBookmark.rows[0]);
    } catch (error) {
        next(error);
    }
}

exports.getBookmarks = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const bookmarks = await db.query('SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        res.json(bookmarks.rows);
    } catch (error) {
        next(error)
    }
}

exports.updateBookmark = async (req, res, next) => {
    const { id } = req.params;
    const { url, title, description } = req.body;
    const userId = req.user.id;

    try {
        const updatedBookmark = await db.query(
            'UPDATE bookmarks SET url = $1, title = $2, description = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
            [url, title, description, id, userId]
        );

        if (updatedBookmark.rows.length === 0) {
            return res.status(404).json({ message: 'Bookmark not found or user not authorized.' });
        }
        res.json(updatedBookmark.rows[0]);
    } catch (error) {
        next(error);
    }
};


exports.deleteBookmark = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await db.query('DELETE FROM bookmarks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Bookmark not found or user not authorized.' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
