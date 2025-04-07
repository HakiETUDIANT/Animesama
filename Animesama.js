// Debug minimal compatible
function log(msg) {
    if (typeof print === 'function') {
        print(msg); // Méthode alternative
    }
}

log("[ANIME-SAMA] Module initialisé");

function searchResults(keyword) {
    log("[ANIME-SAMA] Recherche: " + keyword);
    
    try {
        const results = [{
            title: keyword + " (Anime-sama)",
            image: "https://anime-sama.fr/logo.png",
            href: "/catalogue/?search=" + encodeURIComponent(keyword)
        }];
        
        const response = JSON.stringify(results);
        log("[ANIME-SAMA] Réponse: " + response);
        return response;
        
    } catch (e) {
        log("[ANIME-SAMA] Erreur: " + e);
        return "[]";
    }
}

function extractDetails(url) {
    log("[ANIME-SAMA] Détails: " + url);
    return JSON.stringify([{
        description: "Regarder sur Anime-sama.fr",
        aliases: "",
        airdate: ""
    }]);
}

function extractEpisodes(url) {
    log("[ANIME-SAMA] Épisodes: " + url);
    return JSON.stringify([{
        number: "1",
        href: url
    }]);
}

function extractStreamUrl(url) {
    log("[ANIME-SAMA] Stream: " + url);
    return "https://anime-sama.fr" + url;
}

// Export sécurisé
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        searchResults: searchResults,
        extractDetails: extractDetails,
        extractEpisodes: extractEpisodes,
        extractStreamUrl: extractStreamUrl
    };
} else {
    log("[ANIME-SAMA] Export non détecté");
}