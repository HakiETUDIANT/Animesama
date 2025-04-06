// Fonction fetch ultra-compatible
function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('User-Agent', 'Mozilla/5.0');
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('HTTP error ' + xhr.status));
            }
        };
        
        xhr.onerror = function() {
            reject(new Error('Network error'));
        };
        
        xhr.send();
    });
}

// Recherche simplifiée mais robuste
function searchResults(keyword) {
    return fetchHtml('https://anime-sama.fr/catalogue?search=' + encodeURIComponent(keyword))
        .then(html => {
            const results = [];
            const div = document.createElement('div');
            div.innerHTML = html;
            
            // Sélecteurs de fallback (à adapter)
            const cards = div.querySelectorAll('[class*="anime"], [class*="card"]');
            
            cards.forEach(card => {
                const link = card.querySelector('a');
                const img = card.querySelector('img');
                
                if (link && img) {
                    results.push({
                        title: (link.title || link.textContent || '').trim(),
                        href: link.href || link.getAttribute('href'),
                        image: img.src || img.getAttribute('src')
                    });
                }
            });
            
            return JSON.stringify(results);
        })
        .catch(err => {
            console.log('Search failed:', err);
            return JSON.stringify([]);
        });
}

// Détails minimaux
function extractDetails(url) {
    return Promise.resolve(JSON.stringify([{
        description: "Regardez sur Anime-sama",
        aliases: "",
        airdate: ""
    }]));
}

// Épisodes compatibles
function extractEpisodes(url) {
    return fetchHtml('https://anime-sama.fr' + url)
        .then(html => {
            const eps = [];
            const div = document.createElement('div');
            div.innerHTML = html;
            
            div.querySelectorAll('[class*="episode"] a').forEach(a => {
                const numMatch = a.textContent.match(/\d+/);
                eps.push({
                    number: numMatch ? numMatch[0] : '0',
                    href: a.href || a.getAttribute('href')
                });
            });
            
            return JSON.stringify(eps);
        })
        .catch(err => {
            console.log('Episodes failed:', err);
            return JSON.stringify([]);
        });
}

// Stream URL basique
function extractStreamUrl(url) {
    return Promise.resolve('https://anime-sama.fr' + url);
}

// Export spécial pour Sora
if (typeof exports !== 'undefined') {
    exports.searchResults = searchResults;
    exports.extractDetails = extractDetails;
    exports.extractEpisodes = extractEpisodes;
    exports.extractStreamUrl = extractStreamUrl;
}