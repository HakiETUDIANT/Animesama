// Version compatible sans AbortController
async function fetchHtml(url) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'text/html'
        }
    });
    return await response.text();
}

// Recherche des animes (version simplifiée et compatible)
async function searchResults(keyword) {
    try {
        const html = await fetchHtml(`https://anime-sama.fr/catalogue?search=${encodeURIComponent(keyword)}`);
        
        // Solution de repli si DOMParser n'existe pas
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const results = [];
        const items = tempDiv.querySelectorAll('.anime, .card'); // Sélecteurs alternatifs
        
        items.forEach(item => {
            const link = item.querySelector('a');
            const img = item.querySelector('img');
            
            if (link && img) {
                results.push({
                    title: link.getAttribute('title') || link.textContent.trim(),
                    href: link.getAttribute('href'),
                    image: img.getAttribute('src') || ''
                });
            }
        });

        return JSON.stringify(results.length > 0 ? results : []);
        
    } catch (error) {
        console.log("Erreur recherche:", error);
        return JSON.stringify([]);
    }
}

// Détails (version basique)
async function extractDetails(url) {
    return JSON.stringify([{
        description: "Anime disponible sur Anime-sama",
        aliases: "",
        airdate: ""
    }]);
}

// Épisodes (version compatible)
async function extractEpisodes(url) {
    try {
        const html = await fetchHtml(`https://anime-sama.fr${url}`);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const episodes = [];
        tempDiv.querySelectorAll('.episode a, .episode-list a').forEach(ep => {
            episodes.push({
                number: ep.textContent.match(/\d+/)?.[0] || '0',
                href: ep.getAttribute('href')
            });
        });

        return JSON.stringify(episodes);
        
    } catch (error) {
        console.log("Erreur épisodes:", error);
        return JSON.stringify([]);
    }
}

// URL de streaming
async function extractStreamUrl(url) {
    return `https://anime-sama.fr${url}`;
}

// Export pour Sora
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl
    };
}