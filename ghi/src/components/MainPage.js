import React, {useState} from 'react';

function MainPage() {
    const [copyright, setCopyright] = useState('');
    const [articleLoaded, setArticleLoaded] = useState(false);
    const [myArticle, setMyArticle] = useState({
        headline: {main: ''},
        snippet: '',
        byline: {original: ''},
    });
    const API_KEY = process.env.REACT_APP_NYT_API_KEY;
    const archiveURL = `https://corsproxy.io/?https://api.nytimes.com/svc/archive/v1/2024/2.json?api-key=${API_KEY}`;

    // Handle the fetch archive button.
    const fetchArchive = async (event) => {
        event.preventDefault();

        const archiveResponse = await fetch(archiveURL);
        if (archiveResponse.ok) {
            const archiveData = await archiveResponse.json();
            console.log(`***** Archive Data ==> ${JSON.stringify(archiveData)}`);

            setCopyright(archiveData.copyright);
            setArticleLoaded(true);
            setMyArticle(archiveData.response.docs[0]);
            console.log(`***** Copyright: ${copyright}`);
            console.log(`***** Article Info: ${JSON.stringify(myArticle)}`);
            console.log(`***** Component Status: ${articleLoaded}`);

        } else {
            window.confirm("There was a problem fetching the NY Times archive.")
        }
    };

    const freshLanding = () => (
        <div className="initialdisplay">
            <h1>Headline Editor Main Page</h1>
            <button onClick={fetchArchive}>Fetch Archive</button>
        </div>
    );

    const archiveLoaded = () => (
        <div className="archivedisplay">
            <h1>NY Times Archive for 2024 February</h1>
            <h2>{copyright}</h2>
            <h2>{myArticle.headline.main}</h2>
            <p>{myArticle.snippet}</p>
            <p>by {myArticle.byline.original}</p>
        </div>
    )

    return (
        <div className="content">
            {articleLoaded ? archiveLoaded() : freshLanding()}
        </div>

    );

};

export default MainPage;
