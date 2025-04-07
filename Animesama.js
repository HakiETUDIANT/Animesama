// Debug initial
console.log("[ANIME-SAMA] Module chargé avec succès");

async function searchResults(keyword) {
    console.log("[ANIME-SAMA] Recherche en cours pour:", keyword);
    
    try {
        // 1. Récupération du HTML
        const encodedKeyword = encodeURIComponent(keyword);
        const searchUrl = `https://anime-sama.fr/catalogue/?search=${encodedKeyword}`;
        console.log("[ANIME-SAMA] URL de recherche:", searchUrl);
        
        const response = await fetch(searchUrl);
        const html = await response.text();
        console.log("[ANIME-SAMA] HTML reçu (500 premiers caractères):", html.substring(0, 500));

        // 2. Parsing avec DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 3. Sélecteurs EXACTS (à adapter selon le vrai HTML)
        const results = [];
        const animeCards = doc.querySelectorAll('.anime-card, .card-anime, [class*="anime"]'); // Sélecteurs multiples pour compatibilité
        
        animeCards.forEach(card => {
            try {
                const title = card.querySelector('.title, [class*="title"], h3')?.textContent.trim();
                const image = card.querySelector('img')?.src;
                const href = card.querySelector('a')?.href;
                
                if (title && href) {
                    results.push({
                        title: title,
                        image: image || "https://anime-sama.fr/logo.png",
                        href: href
                    });
                }
            } catch (e) {
                console.log("[ANIME-SAMA] Erreur parsing carte:", e);
            }
        });

        console.log("[ANIME-SAMA] Résultats trouvés:", results);
        return JSON.stringify(results);

    } catch (error) {
        console.error("[ANIME-SAMA] Erreur recherche:", error);
        return JSON.stringify([]); // Toujours retourner un array
    }
}

// Les autres fonctions (version simplifiée)
async function extractDetails(url) {
    return JSON.stringify([{
        description: "Anime disponible sur Anime-sama.fr",
        aliases: "",
        airdate: ""
    }]);
}

async function extractEpisodes(url) {
    return JSON.stringify([{
        number: "1",
        href: url + "/episode-1"
    }]);
}

async function extractStreamUrl(url) {
    return "https://anime-sama.fr" + url;
}

// Export
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl
    };
}