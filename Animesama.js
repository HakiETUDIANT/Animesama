async function searchResults(keyword) {
    try {
        const searchUrl = `https://anime-sama.fr/catalogue/?search=${encodeURIComponent(keyword)}`;
        const response = await fetch(searchUrl);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const cards = doc.querySelectorAll('.bg-card-anime');
        const results = [];

        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent?.trim();
            const image = card.querySelector('img')?.getAttribute('src');
            const link = card.querySelector('a')?.getAttribute('href');

            if (title && link) {
                results.push({
                    title: title,
                    image: image?.startsWith('http') ? image : `https://anime-sama.fr${image}`,
                    href: link.startsWith('http') ? link : `https://anime-sama.fr${link}`
                });
            }
        });

        return JSON.stringify(results.length > 0 ? results : [{
            title: `Aucun résultat pour "${keyword}"`,
            href: searchUrl,
            image: 'https://anime-sama.fr/logo.png'
        }]);
    } catch (e) {
        console.error("[ANIME-SAMA] Erreur searchResults:", e);
        return JSON.stringify([{
            title: "Erreur de recherche",
            href: "#",
            image: "https://anime-sama.fr/logo.png"
        }]);
    }
}

async function extractDetails(url) {
    return JSON.stringify([{
        description: "Voir les détails complets sur Anime-sama",
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
