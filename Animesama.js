// Format EXACT comme votre module working
async function searchResults(keyword) {
    try {
        const encodedKeyword = encodeURIComponent(keyword);
        const response = await fetch(`https://anime-sama.fr/catalogue/?search=${encodedKeyword}`);
        const html = await response.text();

        // Parser le HTML comme dans votre exemple
        const results = [];
        const tempEl = document.createElement('div');
        tempEl.innerHTML = html;

        tempEl.querySelectorAll('.anime-card').forEach(card => { // Adaptez le sélecteur
            results.push({
                title: card.querySelector('.title').textContent.trim(),
                image: card.querySelector('img').src,
                href: card.querySelector('a').href
            });
        });

        return JSON.stringify(results); // Format identique à votre module working

    } catch (error) {
        console.log('Search error:', error.message);
        return JSON.stringify([]); // Toujours retourner un array
    }
}

// Les autres fonctions doivent suivre LE MÊME format :
async function extractDetails(url) {
    // ... même structure que votre module working
    return JSON.stringify([{ /* données */ }]);
}

async function extractEpisodes(url) {
    // ... même structure que votre module working
    return JSON.stringify([{ /* données */ }]);
}

async function extractStreamUrl(url) {
    // ... même structure que votre module working
    return "https://anime-sama.fr" + url;
}

// Export IDENTIQUE à votre module working
if (typeof module !== 'undefined') {
    module.exports = {
        searchResults,
        extractDetails,
        extractEpisodes,
        extractStreamUrl
    };
}