async function searchResults(keyword) {
    try {
        const encoded = encodeURIComponent(keyword);
        return {
            status: 200,
            data: [{
                id: "anime-sama-result",
                title: "Voir sur Anime-sama : " + keyword,
                url: "/catalogue/?search=" + encoded,
                image: "https://anime-sama.fr/logo.png",
                type: "anime",
                isDirect: true
            }],
            pagination: {
                hasNext: false,
                total: 1
            }
        };
    } catch (error) {
        return {
            status: 500,
            data: [],
            message: "Erreur lors de la recherche"
        };
    }
}

async function extractDetails(url) {
    return {
        status: 200,
        data: {
            description: "Cliquez pour voir les détails complets sur Anime-sama.",
            redirect: "https://anime-sama.fr" + url
        }
    };
}

async function extractEpisodes(url) {
    return {
        status: 200,
        data: [{
            number: "1",
            url: url,
            isDirect: true
        }],
        pagination: {
            hasNext: false
        }
    };
}

async function extractStreamUrl(url) {
    return {
        status: 200,
        data: {
            url: "https://anime-sama.fr" + url,
            quality: "HD",
            isDirect: true
        }
    };
}

// Export pour Sora
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl,
        _isSoraModule: true
    };
}