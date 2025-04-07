console.log("[ANIME-SAMA] Module chargé avec succès");

async function searchResults(keyword) {
    console.log("[ANIME-SAMA] Recherche en cours pour:", keyword);

    try {
        const encodedKeyword = encodeURIComponent(keyword);
        const searchUrl = `https://anime-sama.fr/catalogue/?search=${encodedKeyword}`;
        console.log("[ANIME-SAMA] URL de recherche:", searchUrl);

        const response = await fetch(searchUrl);

        if (!response.ok) {
            throw new Error(`[HTTP ${response.status}] ${response.statusText}`);
        }

        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

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

        if (results.length === 0) {
            console.log("[ANIME-SAMA] Aucun résultat trouvé.");
        }

        console.log("[ANIME-SAMA] Résultats:", results);
        return JSON.stringify(results);

    } catch (error) {
        console.error("[ANIME-SAMA] Erreur searchResults:", error.message);
        return JSON.stringify([{
            title: "Erreur de recherche",
            href: "#",
            image: "https://anime-sama.fr/logo.png"
        }]);
    }
}

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