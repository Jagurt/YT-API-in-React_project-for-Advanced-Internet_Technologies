import React from 'react';
import './CommentItem.css';

const CommentItem = ({ comment }) => {
    return (
        <div className="ui comments">
            <div className="ui segment">
                <a href={comment.snippet.topLevelComment.snippet.authorChannelUrl} >
                <img
                    className="avatar"
                    alt="Loading"
                    src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                />
                </a>
                <div className="content">
                    <a
                        className="author"
                        href={comment.snippet.topLevelComment.snippet.authorChannelUrl}
                    >
                        {comment.snippet.topLevelComment.snippet.authorDisplayName}
                    </a>
                    <div className="metadata">
                        <div className="date">
                            {comment.snippet.topLevelComment.snippet.publishedAt}
                        </div>
                        <div className="rating">
                            <i className="thumbs up outline icon"></i>
                            {comment.snippet.topLevelComment.snippet.likeCount}
                        </div>
                    </div>
                    <div className="text">
                        {comment.snippet.topLevelComment.snippet.textOriginal}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;