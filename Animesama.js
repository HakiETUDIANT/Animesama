async function searchResults(keyword) {
    try {
        // 1. Construction de l'URL de recherche
        const searchUrl = `https://anime-sama.fr/catalogue/?search=${encodeURIComponent(keyword)}`;
        
        // 2. Récupération du HTML
        const response = await fetch(searchUrl);
        const html = await response.text();
        
        // 3. Parsing avec DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 4. Extraction des résultats (sélecteurs à adapter)
        const results = [];
        const items = doc.querySelectorAll('.anime-card, .card, [class*="item"]');
        
        items.forEach(item => {
            const title = item.querySelector('.title, h3')?.textContent?.trim();
            const image = item.querySelector('img')?.src;
            const href = item.querySelector('a')?.href;
            
            if (title && href) {
                results.push({
                    title: title,
                    image: image || 'https://anime-sama.fr/logo.png',
                    href: href.startsWith('http') ? href : `https://anime-sama.fr${href}`
                });
            }
        });
        
        return JSON.stringify(results.length > 0 ? results : [{
            title: `Aucun résultat pour "${keyword}"`,
            href: searchUrl,
            image: 'https://anime-sama.fr/logo.png'
        }]);
        
    } catch (error) {
        console.error("Search error:", error);
        return JSON.stringify([{
            title: "Erreur de recherche",
            href: "#",
            image: "https://anime-sama.fr/logo.png"
        }]);
    }
}

// Fonctions génériques pour tous les animes
async function extractDetails(url) {
    return JSON.stringify([{
        description: "Anime disponible sur Anime-sama",
        genres: ["Anime"],
        year: new Date().getFullYear()
    }]);
}

async function extractEpisodes(url) {
    return JSON.stringify([{
        number: "1",
        href: url + "/1"
    }]);
}

async function extractStreamUrl(url) {
    return `https://anime-sama.fr${url}`;
}

if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl
    };
}