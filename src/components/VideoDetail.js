import React from 'react';
import "./VideoDetail.css";
import youtube from '../apis/youtube';
import GlobalVariables from './GlobalVariables';

class VideoDetail extends React.Component {

    state = { video: null };

    // pozyskiwanie video poprzez /videos w celu pozyskania całego opisu
    // /search daje tylko skrócony
    constructor(props) {
        super(props);

        var videoId = "";
        console.log(this.props);
        if (this.props.video && this.props.video.id) videoId = this.props.video.id.videoId; 
        else videoId = this.props.video; // VideoDetail w Playliście

        console.log(props.video);
        console.log(props.videoId);

        youtube.get("/videos", {
            params: {
                id: videoId,
                part: "snippet",
                key: GlobalVariables.KEY
            }
        }).then(results => {
            this.state.video = results.data.items[0];
            this.forceUpdate();
        }).catch(err => console.log(err));
    };

    render() {
        if (!this.state.video || !(this.state.video.snippet)) {
            return <div>loading</div>
        }

        const videoSrc = `https://www.youtube.com/embed/${this.state.video.id.videoId}`;
        return (
            <div>
                <div className="ui embed">
                    <iframe src={videoSrc} title="videoPlayer" />
                </div>
                <div className="ui segment">
                    <div className="description">
                        <h4 className="ui header">{this.state.video.snippet.title}</h4>
                        <pre>{this.state.video.snippet.description}</pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoDetail