async function searchResults(keyword) {
    console.log("[ANIME-SAMA] Lancement de la recherche pour:", keyword);
    try {
        const searchUrl = `https://anime-sama.fr/catalogue/?search=${encodeURIComponent(keyword)}`;
        console.log("[ANIME-SAMA] URL:", searchUrl);

        const response = await fetch(searchUrl);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const results = [];
        const cards = doc.querySelectorAll('.bg-card-anime');

        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent?.trim();
            const image = card.querySelector('img')?.getAttribute('src');
            const href = card.querySelector('a')?.getAttribute('href');

            if (title && href) {
                results.push({
                    title: title,
                    image: image ? (image.startsWith('http') ? image : `https://anime-sama.fr${image}`) : 'https://anime-sama.fr/logo.png',
                    href: href.startsWith('http') ? href : `https://anime-sama.fr${href}`
                });
            }
        });

        console.log("[ANIME-SAMA] Résultats:", results);

        return JSON.stringify(results);
    } catch (e) {
        console.error("[ANIME-SAMA] Erreur searchResults:", e);
        return JSON.stringify([{
            title: "Erreur de recherche",
            image: "https://anime-sama.fr/logo.png",
            href: "#"
        }]);
    }
}

async function extractDetails(url) {
    return JSON.stringify([{
        description: "Voir sur Anime-sama",
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
