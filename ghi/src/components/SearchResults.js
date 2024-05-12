import './SearchResults.css';

function SearchResults(props) {
    // console.log('***** (SearchResults) Props: ', props);
    const monthDict = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    return (
        <div className="archivedisplay">
            <h1>NY Times Archive for { props.formData.year } { monthDict[props.formData.month] }</h1>
            <h2>{props.articleData.headline.main}</h2>
            <p>Image URL: {props.articleData.multimedia[4].url}</p>
            <p>{props.articleData.abstract}</p>
            <p className="byline">{props.articleData.byline.original}</p>
            <p>News Desk: {props.articleData.news_desk}</p>
            <p className="copyright">{props.copyright}</p>
        </div>
    );
};

export default SearchResults;
