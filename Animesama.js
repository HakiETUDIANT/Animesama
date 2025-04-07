async function searchResults(keyword) {
    console.log("[ANIME-SAMA] Lancement de la recherche pour:", keyword);
    try {
        const searchUrl = `https://anime-sama.fr/catalogue/?search=${encodeURIComponent(keyword)}`;
        console.log("[ANIME-SAMA] URL:", searchUrl);

        const response = await fetch(searchUrl);
        const html = await response.text();

        const $ = cheerio.load(html); // Utilisation de cheerio pour parser

        const results = [];
        $('.bg-card-anime').each((i, el) => {
            const title = $(el).find('h3').text().trim();
            const image = $(el).find('img').attr('src');
            const href = $(el).find('a').attr('href');

            if (title && href) {
                results.push({
                    title: title,
                    image: image?.startsWith('http') ? image : `https://anime-sama.fr${image}`,
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
