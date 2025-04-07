async function searchResults(keyword) {
    console.log("[ANIME-SAMA] Lancement de la recherche pour:", keyword);
    try {
        const searchUrl = `https://anime-sama.fr/catalogue/?search=${encodeURIComponent(keyword)}`;
        const response = await fetch(searchUrl);
        const html = await response.text();

        const cards = html.split('<div class="bg-card-anime"');
        const results = [];

        for (let i = 1; i < cards.length; i++) {
            const block = cards[i];

            const titleMatch = block.match(/<h3[^>]*>([^<]+)<\/h3>/);
            const imageMatch = block.match(/<img[^>]*src="([^"]+)"/);
            const hrefMatch = block.match(/<a[^>]*href="([^"]+)"/);

            const title = titleMatch ? titleMatch[1].trim() : null;
            const image = imageMatch ? imageMatch[1] : null;
            const href = hrefMatch ? hrefMatch[1] : null;

            if (title && href) {
                results.push({
                    title: title,
                    image: image?.startsWith('http') ? image : `https://anime-sama.fr${image}`,
                    href: href.startsWith('http') ? href : `https://anime-sama.fr${href}`
                });
            }
        }

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
