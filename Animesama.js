async function searchResults(keyword) {
    try {
        const encoded = encodeURIComponent(keyword);
        const results = [{
            title: "Résultats pour: " + keyword,
            image: "https://anime-sama.fr/logo.png",
            href: "/catalogue/?search=" + encoded
        }];
        
        console.log(JSON.stringify(results)); // Log pour débogage
        return JSON.stringify(results);
        
    } catch (error) {
        console.log('Search error:', error);
        return JSON.stringify([]);
    }
}

async function extractDetails(showId) {
    try {
        const details = [{
            description: "Anime disponible sur Anime-sama",
            aliases: "",
            airdate: ""
        }];
        
        console.log(JSON.stringify(details));
        return JSON.stringify(details);
        
    } catch (error) {
        console.log('Details error:', error);
        return JSON.stringify([]);
    }
}

async function extractEpisodes(showId) {
    try {
        const episodes = [{
            number: "1",
            href: showId + "/1"
        }];
        
        console.log(JSON.stringify(episodes));
        return JSON.stringify(episodes);
        
    } catch (error) {
        console.log('Episodes error:', error);
        return JSON.stringify([]);
    }
}

async function extractStreamUrl(url) {
    try {
        const streamUrl = "https://anime-sama.fr" + url;
        console.log(streamUrl);
        return streamUrl;
        
    } catch (error) {
        console.log('Stream error:', error);
        return "";
    }
}

// Export pour Sora
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl
    };
}