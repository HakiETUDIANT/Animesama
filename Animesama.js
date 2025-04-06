// Fonction fetch améliorée avec timeout
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept-Language': 'fr-FR,fr;q=0.9'
    }
  });
  
  clearTimeout(timeoutId);
  return response.text();
}

// Recherche des animes
async function searchResults(keyword) {
  try {
    const html = await fetchWithTimeout(`https://anime-sama.fr/catalogue?search=${encodeURIComponent(keyword)}`);
    
    // Parseur DOM robuste
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Sélecteurs mis à jour (à vérifier sur le site)
    const items = Array.from(doc.querySelectorAll('.card-anime')).map(item => ({
      title: item.querySelector('.title-anime')?.textContent.trim() || 'Titre inconnu',
      href: item.querySelector('a')?.getAttribute('href') || '#',
      image: item.querySelector('img')?.getAttribute('src') || ''
    }));

    return JSON.stringify(items.filter(item => item.href !== '#'));
    
  } catch (error) {
    console.error(`Search error: ${error}`);
    return JSON.stringify([]);
  }
}

// Détails de l'anime
async function extractDetails(url) {
  return JSON.stringify([{
    description: "Anime disponible sur Anime-sama",
    aliases: "",
    airdate: ""
  }]);
}

// Liste des épisodes
async function extractEpisodes(url) {
  try {
    const html = await fetchWithTimeout(`https://anime-sama.fr${url}`);
    const doc = new DOMParser().parseFromString(html, 'text/html');
    
    const episodes = Array.from(doc.querySelectorAll('.episode-list a')).map(ep => ({
      number: ep.textContent.match(/\d+/)?.[0] || '0',
      href: ep.getAttribute('href')
    }));

    return JSON.stringify(episodes.reverse()); // Du plus récent au plus ancien
    
  } catch (error) {
    console.error(`Episodes error: ${error}`);
    return JSON.stringify([]);
  }
}

// Lien de streaming
async function extractStreamUrl(url) {
  return `https://anime-sama.fr${url}`;
}

// Export pour Sora
if (typeof module !== 'undefined') {
  module.exports = {
    searchResults,
    extractDetails,
    extractEpisodes,
    extractStreamUrl
  };
}