import React from 'react';
import api from '../services/api';

function BookmarkCard({ bookmark, onBookmarkDeleted }) {
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${bookmark.title}"?`)) {
            try {
                await api.delete(`/bookmarks/${bookmark.id}`);
                onBookmarkDeleted(bookmark.id);
            } catch (err) {
                alert('Failed to delete bookmark.');
            }
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4><a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a></h4>
            <p>{bookmark.url}</p>
            <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
        </div>
    );
}

export default BookmarkCard;