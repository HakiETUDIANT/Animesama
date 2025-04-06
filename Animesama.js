async function fetchText(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function searchResults(keyword) {
    try {
        const encodedKeyword = encodeURIComponent(keyword);
        const url = `https://anime-sama.fr/catalogue?search=${encodedKeyword}`;
        const html = await fetchText(url);

        const results = [];
        const regex = /<a class="anime"[^>]*href="([^"]+)"[^>]*title="([^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/g;
        let match;

        while ((match = regex.exec(html)) !== null) {
            results.push({
                title: match[2].trim(),
                href: match[1].trim(),
                image: match[3].trim()
            });
        }

        return JSON.stringify(results);
    } catch (error) {
        console.error('Search error:', error);
        return JSON.stringify([]);
    }
}

async function extractDetails(url) {
    try {
        const html = await fetchText(`https://anime-sama.fr${url}`);
        
        // Exemple d'extraction de description (à adapter selon le HTML réel du site)
        const descriptionMatch = html.match(/<div class="description"[^>]*>([\s\S]*?)<\/div>/i);
        const description = descriptionMatch ? descriptionMatch[1].trim() : "Description non disponible";

        return [{
            description: description,
            aliases: "",
            airdate: ""
        }];
    } catch (error) {
        console.error('Details error:', error);
        return [{
            description: "Voir les épisodes disponibles sur Anime-sama",
            aliases: "",
            airdate: ""
        }];
    }
}

async function extractEpisodes(url) {
    try {
        const html = await fetchText(`https://anime-sama.fr${url}`);
        const episodes = [];
        
        // Regex améliorée pour les épisodes
        const regex = /<a href="([^"]+)"[^>]*class="episode"[^>]*>([^<]+)<\/a>/g;
        let match;
        
        while ((match = regex.exec(html)) !== null) {
            episodes.push({
                number: match[2].trim(),
                href: match[1].trim()
            });
        }

        return JSON.stringify(episodes);
    } catch (error) {
        console.error('Episodes error:', error);
        return JSON.stringify([]);
    }
}

async function extractStreamUrl(url) {
    try {
        // Si l'URL est déjà complète, ne pas ajouter la base
        if (url.startsWith('http')) {
            return url;
        }
        return `https://anime-sama.fr${url}`;
    } catch (error) {
        console.error('Stream URL error:', error);
        return '';
    }
}

// Exportation pour Sora
module.exports = {
    searchResults,
    extractDetails,
    extractEpisodes,
    extractStreamUrl
};