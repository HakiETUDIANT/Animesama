function searchResults(keyword) {
    return JSON.stringify({
        status: 200,
        data: [{
            id: "anime-sama-result",
            title: "Voir sur Anime-sama : " + keyword,
            url: "/catalogue/?search=" + encodeURIComponent(keyword),
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

function extractDetails(url) {
    return JSON.stringify({
        status: 200,
        data: {
            description: "Détails disponibles sur le site Anime-sama.",
            redirect: "https://anime-sama.fr" + url
        }
    });
}

function extractEpisodes(url) {
    return JSON.stringify({
        status: 200,
        data: [{
            number: "1",
            url: url,
            isDirect: true
        }],
        pagination: {
            hasNext: false
        }
    });
}

function extractStreamUrl(url) {
    return JSON.stringify({
        status: 200,
        data: {
            url: "https://anime-sama.fr" + url,
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