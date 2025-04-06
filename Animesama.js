// Fonction de recherche ultra-sécurisée
function searchResults(keyword) {
    try {
        // Version totalement statique pour éviter tout crash
        const mockResults = [{
            title: "Blue Lock",
            href: "/anime/blue-lock",
            image: "https://anime-sama.fr/img/blue-lock.jpg"
        }];
        return JSON.stringify(mockResults);
    } catch (e) {
        return JSON.stringify([]);
    }
}

// Version minimale pour les détails
function extractDetails(url) {
    return JSON.stringify([{
        description: "Anime disponible sur Anime-sama",
        aliases: "",
        airdate: ""
    }]);
}

// Version mock pour les épisodes
function extractEpisodes(url) {
    try {
        const mockEpisodes = [];
        for (let i = 1; i <= 12; i++) {
            mockEpisodes.push({
                number: i.toString(),
                href: `${url}/episode-${i}`
            });
        }
        return JSON.stringify(mockEpisodes);
    } catch (e) {
        return JSON.stringify([]);
    }
}

// Stream URL simplifiée
function extractStreamUrl(url) {
    return `https://anime-sama.fr${url}`;
}

// Export spécial pour Sora (sans module.exports)
if (typeof exports === 'object') {
    exports.searchResults = searchResults;
    exports.extractDetails = extractDetails;
    exports.extractEpisodes = extractEpisodes;
    exports.extractStreamUrl = extractStreamUrl;
}