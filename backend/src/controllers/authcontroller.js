const db = reqire('../utils/db')
const bcrypt = require('bcypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const result = await db.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, passwordHash]
        )
        res.status(201).json({
            message: 'User registered successfully!',
            user: result.rows[0],
        });


    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'Email already in use.' });
        }
        next(error);
    }
}


exports.login = async (req, res, next) => {
    const { user, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const payload = {
            user: {
                id: user.id
            }

        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });

            }
        )

    } catch (err) {
        next(err);
    }
}