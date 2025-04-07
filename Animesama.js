function searchResults(keyword) {
    // Format EXACT que Sora attend
    const response = {
        status: "success",
        data: [{
            id: "search-redirect",
            title: "Résultats pour " + keyword,
            url: "/catalogue/?search=" + encodeURIComponent(keyword),
            image: "https://anime-sama.fr/logo.png",
            type: "anime"
        }]
    };
    return JSON.stringify(response);
}

function extractDetails() {
    return JSON.stringify({
        status: "success",
        data: {
            description: "Anime disponible sur Anime-sama.fr"
        }
    });
}

function extractEpisodes() {
    return JSON.stringify({
        status: "success",
        data: [{
            number: 1,
            url: "/watch"
        }]
    });
}

function extractStreamUrl() {
    return JSON.stringify({
        status: "success",
        data: {
            url: "https://anime-sama.fr/watch",
            quality: "HD"
        }
    });
}

// Export minimal
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl
    };
}