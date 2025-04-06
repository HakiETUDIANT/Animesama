// Format 100% compatible Sora
function searchResults(keyword) {
    const response = {
        status: "success",
        data: [{
            id: "search-redirect",
            title: "Résultats pour: " + keyword,
            url: "https://anime-sama.fr/catalogue?search=" + encodeURIComponent(keyword),
            image: "https://anime-sama.fr/logo.png",
            type: "anime"
        }],
        pagination: {
            hasNextPage: false
        }
    };
    return JSON.stringify(response);
}

function extractDetails() {
    return JSON.stringify({
        status: "success",
        data: {
            description: "Cliquez pour voir les épisodes sur Anime-sama",
            episodesCount: 1
        }
    });
}

function extractEpisodes() {
    return JSON.stringify({
        status: "success",
        data: [{
            number: "1",
            url: "/watch"
        }],
        pagination: {
            hasNextPage: false
        }
    });
}

function extractStreamUrl() {
    return JSON.stringify({
        status: "success",
        data: {
            url: "https://anime-sama.fr/watch",
            isDirect: false
        }
    });
}

// Export minimal
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults: searchResults,
        extractDetails: extractDetails,
        extractEpisodes: extractEpisodes,
        extractStreamUrl: extractStreamUrl
    };
}