function searchResults(keyword) {
    // Structure de base requise par Sora
    const response = {
        success: true,
        results: [{
            id: "default-id",
            title: keyword + " (Résultat Anime-sama)",
            url: "/catalogue?search=" + encodeURIComponent(keyword),
            image: "https://anime-sama.fr/logo.png",
            type: "anime"
        }]
    };
    return JSON.stringify(response);
}

function extractDetails() {
    return JSON.stringify({
        success: true,
        description: "Retrouvez cet anime sur Anime-sama.fr"
    });
}

function extractEpisodes() {
    return JSON.stringify({
        success: true,
        episodes: [{
            number: "1",
            url: "/episode/1"
        }]
    });
}

function extractStreamUrl() {
    return JSON.stringify({
        success: true,
        url: "https://anime-sama.fr/stream"
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