// Format EXACT que Sora attend
async function searchResults(keyword) {
    const response = {
        success: true,
        results: [{
            id: "direct-search",
            title: "Résultats pour " + keyword,
            url: "/catalogue?search=" + encodeURIComponent(keyword),
            image: "https://anime-sama.fr/logo.png"
        }],
        hasMore: false // Élément CRUCIAL contre le loading infini
    };
    return JSON.stringify(response);
}

async function extractDetails(url) {
    return JSON.stringify({
        success: true,
        description: "Anime disponible sur Anime-sama",
        episodesCount: 1
    });
}

async function extractEpisodes(url) {
    return JSON.stringify({
        success: true,
        episodes: [{
            number: "1",
            url: url + "/episode-1"
        }],
        hasMore: false
    });
}

async function extractStreamUrl(url) {
    return JSON.stringify({
        success: true,
        url: "https://anime-sama.fr" + url,
        quality: "HD"
    });
}

// Export ASYNCHRONE compatible
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults: searchResults,
        extractDetails: extractDetails,
        extractEpisodes: extractEpisodes,
        extractStreamUrl: extractStreamUrl,
        isAsync: true // Nécessaire avec asyncJS: true
    };
}