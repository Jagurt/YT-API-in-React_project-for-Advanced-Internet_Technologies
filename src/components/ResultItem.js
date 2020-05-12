import React from 'react';
import "./ResultItem.css";

const ResultItem = ({ video, onResultSelect }) => {
    return (
        <div
            className="video-item item"
            onClick={() => onResultSelect(video)}
        >
            <img
                className="ui image"
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
            />
            <div className="content">
                <div className="header">
                    {video.snippet.title}
                </div>
            </div>
        </div>
    );
};

export default ResultItem;