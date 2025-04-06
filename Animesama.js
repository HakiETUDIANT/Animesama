async function searchResults(keyword) {
    try {
        console.log("Recherche en cours pour:", keyword);
        const encodedKeyword = encodeURIComponent(keyword);
        const url = `https://anime-sama.fr/catalogue?search=${encodedKeyword}`;
        console.log("URL de recherche:", url);

        const html = await fetchText(url);
        console.log("HTML récupéré:", html); // Log du HTML pour debugging

        const results = [];
        const regex = /<a class="anime"[^>]*href="([^"]+)"[^>]*title="([^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/g;
        let match;

        while ((match = regex.exec(html)) !== null) {
            results.push({
                title: match[2],
                href: match[1],
                image: match[3]
            });
            console.log("Résultat trouvé:", match[2], match[1], match[3]); // Log chaque match
        }

        if (results.length === 0) {
            console.log("Aucun résultat trouvé pour:", keyword);
            return JSON.stringify([]);
        }

        console.log("Résultats trouvés:", results);
        return JSON.stringify(results);
    } catch (err) {
        console.log("Erreur lors de la recherche:", err);
        return JSON.stringify([]);
    }
}

async function fetchText(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur lors du fetch: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        console.log("Réponse du serveur obtenue.");
        return text;
    } catch (err) {
        console.log("Erreur lors du fetch de l'HTML:", err);
        throw err; // Rejeter l'erreur pour qu'elle soit gérée par la fonction principale
    }
}

async function extractDetails(url) {
    console.log("Extraction des détails pour l'URL:", url);
    return [{
        description: "Voir les épisodes disponibles sur Anime-sama",
        aliases: "",
        airdate: ""
    }];
}

async function extractEpisodes(url) {
    try {
        console.log("Extraction des épisodes pour l'URL:", url);
        const html = await fetchText(`https://anime-sama.fr${url}`);
        console.log("HTML des épisodes récupéré:", html);

        const episodes = [];
        const regex = /<a href="([^"]+)"[^>]*class="episode">([^<]+)<\/a>/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
            episodes.push({
                number: match[2],
                href: match[1]
            });
            console.log("Épisode trouvé:", match[2], match[1]); // Log chaque épisode trouvé
        }

        return JSON.stringify(episodes);
    } catch (err) {
        console.log("Erreur lors de l'extraction des épisodes:", err);
        return JSON.stringify([]);
    }
}

async function extractStreamUrl(url) {
    console.log("Extraction de l'URL de streaming pour l'URL:", url);
    return `https://anime-sama.fr${url}`;
}