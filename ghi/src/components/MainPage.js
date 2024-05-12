import React, {useState} from 'react';
import SearchResults from "./SearchResults";
import './MainPage.css';

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

    return (
        <div className="content">
            <div className="searches">
                <h1>Search the NY Times Archive</h1>
                <div className='archive-form'>
                    <form onSubmit={fetchArchive} id='archive-form'>
                        <label htmlFor="year">Year </label>
                        <input onChange={handleChange} type="text" id="year" name="year" placeholder="2024" />
                        <label htmlFor="month">Month </label>
                        <input onChange={handleChange} type="text" id="month" name="month" placeholder="1" />
                    </form>
                    <button onClick={fetchArchive}>NY Times Archive</button>
                </div>
                <hr></hr>
            </div>
            <div className="results">
                {resultsLoaded ? <SearchResults formData={archiveFormData} articleData={myArticle} copyright={copyright} /> : freshLanding()}
            </div>
        </div>

    );

};

export default MainPage;
