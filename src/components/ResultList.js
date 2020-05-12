import React from 'react';
import ResultItem from './ResultItem';

const ResultList = ({ videos, onResultSelect }) => {
    const renderedList = videos.map((video) => {

        var key = video.id.videoId;
        if (!key)
            key = video.id.playlistId;
        if (!key)
            key = video.id.channelId;
        if (!key)
            key = video.snippet.resourceId.videoId;

        return (
            <ResultItem
                key={key}
                onResultSelect={onResultSelect}
                video={video} />
        );
    })

    return (
        <div className="ui relaxied divided list" >
            {renderedList}
        </div>
    )
};

export default ResultList;