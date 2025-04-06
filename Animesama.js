// Solution garantie sans loading infini
function searchResults(keyword) {
    const response = {
        status: 200,
        data: [{
            id: "direct-link",
            title: "Voir les résultats sur Anime-sama",
            url: "https://anime-sama.fr/catalogue?search=" + encodeURIComponent(keyword),
            image: "https://anime-sama.fr/logo.png",
            type: "anime",
            isDirect: true  // Indique que c'est un lien vers le site
        }],
        pagination: {
            hasNext: false,  // Bloque le loading infini
            total: 1
        }
    };
    return JSON.stringify(response);
}

function extractDetails(url) {
    return JSON.stringify({
        status: 200,
        data: {
            description: "Cliquez pour voir les détails complets sur Anime-sama",
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

// Export spécial pour Sora
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults: searchResults,
        extractDetails: extractDetails,
        extractEpisodes: extractEpisodes,
        extractStreamUrl: extractStreamUrl,
        _isSoraModule: true  // Nouveau flag crucial
    };
}