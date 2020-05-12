import React from 'react';
import ResultList from './ResultList'

class ViewerMode extends React.Component {
    state = { searchedResults: [], viewedResults: [] }
        
    constructor(props){
        super(props);
        this.state ={
            searchedResults: props.searchedResults,
            viewedResults: props.searchedResults.slice(0, 10)
        };
    }
    
    // Poprawne ustawianie arraya z propa do state'a odbywa się w tej funkcji
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.searchedResults !== this.props.searchedResults)
            this.setState({
                viewedResults: nextProps.searchedResults.slice(0, 10)
            });
    }
    
    longenSearchResult() {
        if (this.state.viewedResults.length >= 50) return;

        this.setState({
            viewedResults: this.state.viewedResults.concat(
                this.props.searchedResults
                    .slice(this.state.viewedResults.length, this.state.viewedResults.length + 10))
        });
    }

    onScrollLoadResults = () => {
        var element = document.getElementById("results");
        var endOfScroll = element.scrollHeight - (element.clientHeight + element.scrollTop);
        if (endOfScroll === 0)
            this.longenSearchResult();
    }

    render() {
        return (
            <div
                id="results"
                className={this.props.classNameProp}
                onScroll={this.onScrollLoadResults}
                style={{ overflow: "scroll", height: window.innerHeight - 100 }}>
                <ResultList
                    videos={this.state.viewedResults}
                    onResultSelect={this.props.onResultSelect}
                />
            </div>
        )
    }
}

export default ViewerMode;