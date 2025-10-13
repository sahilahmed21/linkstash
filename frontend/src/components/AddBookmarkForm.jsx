import React, { useState } from 'react';
import api from '../services/api';

// Using the 'controlled component' pattern
function AddBookmarkForm({ onBookmarkAdded }) {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/bookmarks', { url, title, description: '' });
            onBookmarkAdded(response.data); // Pass new bookmark up to parent
            setUrl(''); // Reset form
            setTitle('');
            setError('');
        } catch (err) {
            setError('Failed to add bookmark.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <h3>Add New Bookmark</h3>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
                required
            />
            <button type="submit">Add</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default AddBookmarkForm;