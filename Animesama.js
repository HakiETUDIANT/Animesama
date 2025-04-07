// Debug initial
console.log("[DEBUG] Module Anime-sama chargé");

async function searchResults(keyword) {
    console.log("[DEBUG] Recherche lancée pour:", keyword);
    
    try {
        const encoded = encodeURIComponent(keyword);
        console.log("[DEBUG] Terme encodé:", encoded);

        const mockResults = [{
            title: "Test Anime",
            image: "https://anime-sama.fr/logo.png",
            href: "/catalogue/?search=test"
        }];

        console.log("[DEBUG] Résultats mockés:", mockResults);
        const jsonResponse = JSON.stringify(mockResults);
        console.log("[DEBUG] JSON généré:", jsonResponse);

        return jsonResponse;
    } catch (error) {
        console.error("[ERREUR] searchResults:", error);
        return JSON.stringify([]);
    }
}

async function extractDetails(url) {
    console.log("[DEBUG] Extraction détails pour URL:", url);
    
    try {
        const mockDetails = [{
            description: "Description test",
            aliases: "",
            airdate: ""
        }];

        console.log("[DEBUG] Détails mockés:", mockDetails);
        return JSON.stringify(mockDetails);
    } catch (error) {
        console.error("[ERREUR] extractDetails:", error);
        return JSON.stringify([]);
    }
}

async function extractEpisodes(url) {
    console.log("[DEBUG] Extraction épisodes pour URL:", url);
    
    try {
        const mockEpisodes = [{
            number: "1",
            href: "/episode/1"
        }];

        console.log("[DEBUG] Épisodes mockés:", mockEpisodes);
        return JSON.stringify(mockEpisodes);
    } catch (error) {
        console.error("[ERREUR] extractEpisodes:", error);
        return JSON.stringify([]);
    }
}

async function extractStreamUrl(url) {
    console.log("[DEBUG] Extraction stream pour URL:", url);
    
    try {
        const mockUrl = "https://anime-sama.fr" + url;
        console.log("[DEBUG] URL mockée:", mockUrl);
        return mockUrl;
    } catch (error) {
        console.error("[ERREUR] extractStreamUrl:", error);
        return "";
    }
}

// Debug export
console.log("[DEBUG] Préparation exports");
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl
    };
    console.log("[DEBUG] Exports terminés");
} else {
    console.warn("[WARN] 'module' non défini");
}