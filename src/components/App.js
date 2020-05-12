import React from 'react';
import SearchBar from './SearchBar'
import youtube from '../apis/youtube';
import GlobalVariables from './GlobalVariables';
import ViewerMode from './ViewerMode';
import PlayerMode from './PlayerMode';
import PlaylistMode from './PlaylistMode';

/// !! TODOPerfect: Po przescrollowaniu w dół wyszukanie filmów z zapisanego hasła wyklczając już wyszukane wyniki - api nie posiada funkcji wykluczania posiadanych wyników z searcha !!

class App extends React.Component {

    Mode = ["Viewer", "Player", "Playlist"];
    state = {
        mode: this.Mode[0],
        searchKey: "Unity basics",
        searchedResults: [],
        selectedResult: {}
    };

    componentDidMount() {
        this.onTermSubmit("Unity basics");
    }

    onResultSelect = (result) => {
        switch (result.id.kind) {
            default:
                // TODO?: dodać wywołanie errora ?
                break;
            case "youtube#video":
                this.setState({ mode: this.Mode[1], selectedResult: result })
                return;
            case "youtube#playlist":
                this.setState({ mode: this.Mode[2], selectedResult: result })
                return;
            case "youtube#channel":
                return;
        }

        if (result.kind === "youtube#playlistItem")
            this.setState({ mode: this.Mode[1], selectedResult: result.snippet.resourceId.videoId });
    };

    onTermSubmit = (term) => {
        youtube.get("/search", {
            params: {
                q: term,
                part: "snippet",
                maxResults: 50,
                key: GlobalVariables.KEY
            }
        }).then(results => {
            this.setState({
                mode: this.Mode[0],
                searchKey: term,
                searchedResults: results.data.items,
            });
        }).catch(err => console.log(err));
    };

    // TODO: Channel
    channelMode = () => {
        return (
            <div className="ui grid">
                <div className="ui row">
                    <div className="sixteen wide column">
                    </div>
                </div>
            </div>
        )
    };

    modeSelector = () => {
        switch (this.state.mode) {
            default:
                return <div>modeSelector uknown Error</div>
            case "Viewer":
                return (
                    <div className="ui grid">
                        <div className="ui row">
                            <ViewerMode
                                searchedResults={this.state.searchedResults}
                                onResultSelect={this.onResultSelect}
                                classNameProp="sixteen wide column" />
                        </div>
                    </div >
                );
            case "Player":
                return (
                    <PlayerMode
                        selectedResult={this.state.selectedResult}
                        searchedResults={this.state.searchedResults}
                        onResultSelect={this.onResultSelect} />
                );
            case "Playlist":
                return (
                    <PlaylistMode
                        selectedResult={this.state.selectedResult}
                        onResultSelect={this.onResultSelect} />
                );

        }
    };

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <this.modeSelector />
            </div>
        )
    };
}

export default App;