import React, { useState, useEffect } from 'react';
import api from '../services/api';
import BookmarkList from '../components/BookmarkList';
import AddBookmarkForm from '../components/AddBookmarkForm';

function Dashboard() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBookmarks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/bookmarks');
            setBookmarks(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch bookmarks.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const handleBookmarkAdded = (newBookmark) => {
        setBookmarks([newBookmark, ...bookmarks]);
    };

    const handleBookmarkDeleted = (deletedId) => {
        setBookmarks(bookmarks.filter(b => b.id !== deletedId));
    }

    if (loading) return <p>Loading bookmarks...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>My Bookmarks</h2>
            <AddBookmarkForm onBookmarkAdded={handleBookmarkAdded} />
            <BookmarkList bookmarks={bookmarks} onBookmarkDeleted={handleBookmarkDeleted} />
        </div>
    );
}

export default Dashboard;