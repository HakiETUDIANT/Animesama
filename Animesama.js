async function searchResults(keyword) {
    return JSON.stringify({
        status: 200,
        results: [{
            id: "/catalogue?search=" + encodeURIComponent(keyword),
            title: "Voir les résultats sur Anime-sama",
            url: "https://anime-sama.fr/catalogue?search=" + encodeURIComponent(keyword),
            image: "https://anime-sama.fr/logo.png",
            type: "anime",
            isDirect: true
        }],
        pagination: {
            hasNext: false,
            total: 1
        }
    });
}

async function extractDetails(url) {
    return JSON.stringify({
        status: 200,
        results: {
            description: "Voir les détails sur Anime-sama",
            image: "https://anime-sama.fr/logo.png",
            title: "Anime-sama",
            metadata: {
                redirect: "https://anime-sama.fr" + url
            }
        }
    });
}

async function extractEpisodes(url) {
    return JSON.stringify({
        status: 200,
        results: [{
            number: "1",
            title: "Voir sur Anime-sama",
            url: "https://anime-sama.fr" + url,
            isDirect: true
        }],
        pagination: {
            hasNext: false
        }
    });
}

async function extractStreamUrl(url) {
    return JSON.stringify({
        status: 200,
        results: {
            url: url,
            quality: "HD",
            isDirect: true
        }
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl,
        _isSoraModule: true
    };
}