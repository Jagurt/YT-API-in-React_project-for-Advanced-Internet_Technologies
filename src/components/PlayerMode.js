import React from 'react';
import ViewerMode from './ViewerMode';
import VideoDetail from './VideoDetail';
import VideoComments from './VideoComments'
class PlayerMode extends React.Component {

    // TODO README: Opisać jak rozumiem propy w "constructor" i "componentWillReceiveProps" w odniesieniu do korzystania z api YT
    // TODO : Przerzucić wyszukiwanie video z pełnym description tutaj?
    // TODO : Wyszukać około 20 filmów "related" do wyświetlanego i przesłać do Viewera
    
    constructor(props) {
        super(props);
        this.state = {
            viewedResults: props.searchedResults
        };
    }

    render() {
        return (
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column" style={{ overflow: "scroll", height: window.innerHeight - 100 }}>
                        <VideoDetail video={this.props.selectedResult} />
                        <VideoComments video={this.props.selectedResult}/>
                    </div>
                    <ViewerMode
                        searchedResults={this.state.viewedResults}
                        onResultSelect={this.props.onResultSelect}
                        classNameProp="five wide column"
                    />
                </div>
            </div>
        )
    }
}

export default PlayerMode;