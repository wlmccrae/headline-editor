import React, {useState} from 'react';

function MainPage() {
    const [copyright, setCopyright] = useState('');
    const [resultsLoaded, setResultsLoaded] = useState(false);
    const [myArticle, setMyArticle] = useState({
        headline: {main: ''},
        snippet: '',
        byline: {original: ''},
    });
    const [archiveFormData, setArchiveFormData] = useState({
        month: 0,
        year: 0,
    });
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
    const API_KEY = process.env.REACT_APP_NYT_API_KEY;

    // Handle when the form changes
    const handleChange = (event) => {
        setArchiveFormData({
            ...archiveFormData,
            [event.target.name]: event.target.value
        });
    };

    // Handle the fetch archive button.
    const fetchArchive = async (event) => {
        const archiveURL = `https://corsproxy.io/?https://api.nytimes.com/svc/archive/v1/${archiveFormData.year}/${archiveFormData.month}.json?api-key=${API_KEY}`;
        event.preventDefault();

        const archiveResponse = await fetch(archiveURL);
        if (archiveResponse.ok) {
            const archiveData = await archiveResponse.json();
            console.log(`***** Archive Data ==> ${JSON.stringify(archiveData)}`);

            setCopyright(archiveData.copyright);
            setResultsLoaded(true);
            setMyArticle(archiveData.response.docs[0]);
        } else {
            window.confirm("There was a problem fetching the NY Times archive.")
        }
        console.log(`***** Copyright: ${copyright}`);
        console.log(`***** Article Info: ${JSON.stringify(myArticle)}`);
        console.log(`***** Component Status: ${resultsLoaded}`);
    };

    // Handle the search archive button.
    // const searchArchive = async (event) => {
    //     const searchURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${API_KEY}`;
    //     event.preventDefault();

    //     const archiveResponse = await fetch(searchURL);
    //     if (archiveResponse.ok) {
    //         const archiveData = await archiveResponse.json();
    //         console.log(`***** Search Archive Data ==> ${JSON.stringify(archiveData)}`);

    //     } else {
    //         window.confirm("There was a problem searching the NY Times archive.")
    //     }
    // };

    // Handle the Top Stories button.
    // const fetchTopStories = async (event) => {
    //     event.preventDefault();

    //     const archiveResponse = await fetch(topStoriesURL);
    //     if (archiveResponse.ok) {
    //         const archiveData = await archiveResponse.json();
    //         console.log(`***** Top Stories Data ==> ${JSON.stringify(archiveData)}`);

    //     } else {
    //         window.confirm("There was a problem fetching the NY Times Top Stories.")
    //     }
    // };

    const freshLanding = () => (
        <div className="initialdisplay">
            <h2>No results yet.</h2>
        </div>
    );

    const archiveLoaded = () => (
        <div className="archivedisplay">
            <h1>NY Times Archive for { archiveFormData.year } { monthDict[archiveFormData.month] }</h1>
            <h2>{copyright}</h2>
            <h2>{myArticle.headline.main}</h2>
            <p>{myArticle.snippet}</p>
            <p>by {myArticle.byline.original}</p>
        </div>
    )

    return (
        <div className="content">
            <h1>Search the NY Times Archive</h1>
            <div className="searches">
                <form onSubmit={fetchArchive} id='archive-form' className='archive-form'>
                    <label htmlFor="year">Year </label>
                    <input onChange={handleChange} type="text" id="year" name="year" placeholder="2024" />
                    <label htmlFor="month">Month </label>
                    <input onChange={handleChange} type="text" id="month" name="month" placeholder="1" />
                </form>
                <button onClick={fetchArchive}>NY Times Archive</button>
                <hr></hr>
            </div>
            <div className="results">
                {resultsLoaded ? archiveLoaded() : freshLanding()}
            </div>
        </div>

    );

};

export default MainPage;
