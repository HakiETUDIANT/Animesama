async function searchResults(keyword) {
    try {
        const searchUrl = `https://anime-sama.fr/catalogue/?search=${encodeURIComponent(keyword)}`;
        console.log("[ANIME-SAMA] URL:", searchUrl);

        const response = await fetch(searchUrl);
        const html = await response.text();
        console.log("[ANIME-SAMA] HTML reçu:", html.substring(0, 300));

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const results = [];

        // TESTER plusieurs structures connues
        const items = doc.querySelectorAll('.anime-card, .card, .card-anime, .grid-item, article');

        console.log(`[ANIME-SAMA] ${items.length} éléments trouvés`);

        items.forEach(item => {
            try {
                const title = item.querySelector('.title, h3')?.textContent?.trim();
                const image = item.querySelector('img')?.src;
                const href = item.querySelector('a')?.href;

                if (title && href) {
                    results.push({
                        title,
                        image: image || "https://anime-sama.fr/logo.png",
                        href: href.startsWith('http') ? href : `https://anime-sama.fr${href}`
                    });
                }
            } catch (err) {
                console.log("[ANIME-SAMA] Erreur sur un item:", err);
            }
        });

        if (results.length === 0) {
            console.log("[ANIME-SAMA] Aucun résultat");
            return JSON.stringify([{
                title: `Aucun résultat pour "${keyword}"`,
                href: searchUrl,
                image: "https://anime-sama.fr/logo.png"
            }]);
        }

        console.log("[ANIME-SAMA] Résultats:", results);
        return JSON.stringify(results);

    } catch (error) {
        console.error("[ANIME-SAMA] Erreur searchResults:", error);
        return JSON.stringify([{
            title: "Erreur de recherche",
            href: "#",
            image: "https://anime-sama.fr/logo.png"
        }]);
    }
}

// Fonctions simplifiées
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
        href: `${url}/1`
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