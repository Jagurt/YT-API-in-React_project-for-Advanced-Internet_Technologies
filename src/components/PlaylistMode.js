import React from 'react';
import ViewerMode from './ViewerMode';
import youtube from '../apis/youtube';
import GlobalVariables from './GlobalVariables';

class PlaylistMode extends React.Component {
    state = { playlistItems: null }

    constructor(props) {
        super(props);
        youtube.get("/playlistItems", {
            params: {
                playlistId: this.props.selectedResult.id.playlistId,
                part: "snippet",
                key: GlobalVariables.KEY,
                maxResults: 20
            }
        }).then(results => {
            this.state.playlistItems = results.data.items;
            this.forceUpdate();
        }).catch(err => console.log(err));
    }

    render() {
        if(!this.state.playlistItems)
            return <div>Loading</div>;    

        return (
            <div className="ui grid">
                <div className="ui row">
                    <ViewerMode
                        searchedResults={this.state.playlistItems}
                        onResultSelect={this.props.onResultSelect}
                        classNameProp="sixteen wide column" />
                </div>
            </div >
        );
    }
}

export default PlaylistMode;