import React from 'react';
import BookmarkCard from './BookmarkCard';

function BookmarkList({ bookmarks, onBookmarkDeleted }) {
    if (bookmarks.length === 0) {
        return <p>No bookmarks yet. Add one!</p>;
    }

    return (
        <div>
            {bookmarks.map(bookmark => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} onBookmarkDeleted={onBookmarkDeleted} />
            ))}
        </div>
    );
}

export default BookmarkList;