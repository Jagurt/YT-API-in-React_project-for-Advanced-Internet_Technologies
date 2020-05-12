import React from 'react';
import youtube from '../apis/youtube';
import GlobalVariables from './GlobalVariables';
import CommentItem from './CommentItem';

class VideoComments extends React.Component {
    state = { comments: null }

    constructor(props) {
        super(props);

        var videoId = "";
        if (this.props.video && this.props.video.id) videoId = this.props.video.id.videoId; 
        else videoId = this.props.video; // VideoComments w Odtwarzaczu z Playlisty

        youtube.get("/commentThreads", {
            params: {
                videoId: videoId,
                part: "snippet",
                key: GlobalVariables.KEY,
                maxResults: 30
            }
        }).then(results => {
            this.state.comments = results.data.items;
            this.forceUpdate();
        }).catch(err => console.log(err));
    }

    render() {
        if (!this.state || !this.state.comments)
            return <div>Loading Comments</div>;
        const renderedList = this.state.comments.map((comment) => {
            return (
                <CommentItem
                    key={comment.id}
                    comment={comment} />
            );
        });

        return (
            <div className="ui relaxied divided list" >
                {renderedList}
            </div>
        );
    }
}

export default VideoComments;