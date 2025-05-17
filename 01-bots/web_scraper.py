import requests
from bs4 import BeautifulSoup

def scrape_article_titles(url):
    """
    Récupère les titres des articles depuis une page web donnée.
    
    Args:
        url (str): L'URL de la page web à scraper
        
    Returns:
        list: Liste des titres d'articles trouvés
    """
    try:
        # En-têtes pour simuler un navigateur
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Envoi de la requête HTTP avec les en-têtes
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Création de l'objet BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Recherche des titres d'articles (adapté pour le site example.com)
        titles = soup.find_all(['h1', 'h2', 'h3'])
        
        # Extraction du texte des titres
        article_titles = [title.text.strip() for title in titles if title.text.strip()]
        
        return article_titles
        
    except requests.RequestException as e:
        print(f"Erreur lors de la requête HTTP: {e}")
        return []
    except Exception as e:
        print(f"Une erreur est survenue: {e}")
        return []

def main():
    # URL du site à scraper (exemple avec un site simple)
    url = "https://example.com"
    
    print("Récupération des titres d'articles...")
    titles = scrape_article_titles(url)
    
    if titles:
        print("\nTitres trouvés:")
        for i, title in enumerate(titles, 1):
            print(f"{i}. {title}")
    else:
        print("Aucun titre trouvé.")

if __name__ == "__main__":
    main() 