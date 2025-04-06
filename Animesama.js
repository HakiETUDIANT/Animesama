async function searchResults(keyword) {
    try {
        const encodedKeyword = encodeURIComponent(keyword);
        const url = `https://anime-sama.fr/catalogue?search=${encodedKeyword}`;
        const html = await fetchText(url);

        console.log("HTML récupéré:", html); // Ajout de log pour vérifier le contenu HTML

        const results = [];
        const regex = /<a class="anime"[^>]*href="([^"]+)"[^>]*title="([^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/g;
        let match;

        while ((match = regex.exec(html)) !== null) {
            results.push({
                title: match[2],
                href: match[1],
                image: match[3]
            });
        }

        // Si aucune correspondance n'est trouvée
        if (results.length === 0) {
            console.log("Aucun résultat trouvé pour:", keyword);
            return JSON.stringify([]);
        }

        console.log("Résultats:", results); // Log des résultats avant de les renvoyer
        return JSON.stringify(results);
    } catch (err) {
        console.log("Erreur lors de la recherche:", err);
        return JSON.stringify([]);
    }
}

async function fetchText(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

async function extractDetails(url) {
    return [{
        description: "Voir les épisodes disponibles sur Anime-sama",
        aliases: "",
        airdate: ""
    }];
}

async function extractEpisodes(url) {
    const html = await fetchText(`https://anime-sama.fr${url}`);
    const episodes = [];
    
    const regex = /<a href="([^"]+)"[^>]*class="episode">([^<]+)<\/a>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        episodes.push({
            number: match[2],
            href: match[1]
        });
    }

    return JSON.stringify(episodes);
}

async function extractStreamUrl(url) {
    return `https://anime-sama.fr${url}`;
}