import requests
from bs4 import BeautifulSoup
import tkinter as tky
from tkinter import ttk, scrolledtext
from tkinter import messagebox
import tkinter as tk

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
        
        # Recherche des titres d'articles
        titles = soup.find_all(['h1', 'h2', 'h3'])
        
        # Extraction du texte des titres
        article_titles = [title.text.strip() for title in titles if title.text.strip()]
        
        return article_titles
        
    except requests.RequestException as e:
        raise Exception(f"Erreur lors de la requête HTTP: {e}")
    except Exception as e:
        raise Exception(f"Une erreur est survenue: {e}")

class WebScraperGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Web Scraper - Extracteur de Titres")
        self.root.geometry("800x600")
        try:
            self.root.iconbitmap(False, 'favicon.ico')  # Ajout d'une icône si disponible
        except Exception:
            pass
        # Thème moderne
        style = ttk.Style()
        if 'clam' in style.theme_names():
            style.theme_use('clam')
        style.configure("TButton", padding=8, relief="flat", background="#4F8A8B", foreground="#fff", font=("Segoe UI", 11, "bold"))
        style.map("TButton", background=[('active', '#395B64')])
        style.configure("TLabel", padding=6, font=("Segoe UI", 11))
        style.configure("TEntry", padding=6, font=("Segoe UI", 11))
        # Création des widgets
        self.create_widgets()

    def create_widgets(self):
        main_frame = ttk.Frame(self.root, padding="15 10 15 10")
        main_frame.grid(row=0, column=0, sticky="nsew")
        # Rendre la fenêtre principale responsive
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.columnconfigure(2, weight=1)
        main_frame.rowconfigure(4, weight=1)
        # Label et champ pour l'URL
        ttk.Label(main_frame, text="Entrez l'URL du site web:").grid(row=0, column=0, sticky="w", pady=5, columnspan=3)
        self.url_entry = ttk.Entry(main_frame, width=70)
        self.url_entry.grid(row=1, column=0, columnspan=3, sticky="ew", pady=5)
        self.url_entry.insert(0, "https://example.com")
        self.url_entry.focus()
        # Boutons
        self.scrape_button = ttk.Button(main_frame, text="Extraire les titres", command=self.scrape_url)
        self.scrape_button.grid(row=2, column=0, pady=10, sticky="ew")
        self.copy_button = ttk.Button(main_frame, text="Copier les résultats", command=self.copy_results)
        self.copy_button.grid(row=2, column=1, pady=10, sticky="ew")
        self.clear_button = ttk.Button(main_frame, text="Effacer", command=self.clear_all)
        self.clear_button.grid(row=2, column=2, pady=10, sticky="ew")
        # Zone de texte pour afficher les résultats
        ttk.Label(main_frame, text="Résultats:").grid(row=3, column=0, sticky="w", pady=5, columnspan=3)
        self.result_text = scrolledtext.ScrolledText(main_frame, width=80, height=20, font=("Consolas", 11))
        self.result_text.grid(row=4, column=0, columnspan=3, pady=5, sticky="nsew")
        # Status bar
        self.status_var = tk.StringVar()
        self.status_var.set("Prêt")
        status_bar = ttk.Label(main_frame, textvariable=self.status_var, relief=tk.SUNKEN, anchor="w")
        status_bar.grid(row=5, column=0, columnspan=3, sticky="ew", pady=5)

    def scrape_url(self):
        url = self.url_entry.get().strip()
        if not url:
            messagebox.showerror("Erreur", "Veuillez entrer une URL valide")
            return
        self.status_var.set("Extraction en cours...")
        self.scrape_button.state(['disabled'])
        self.result_text.delete(1.0, tk.END)
        try:
            titles = scrape_article_titles(url)
            if titles:
                self.result_text.insert(tk.END, f"Titres trouvés sur {url}:\n\n")
                for i, title in enumerate(titles, 1):
                    self.result_text.insert(tk.END, f"{i}. {title}\n")
                self.status_var.set(f"{len(titles)} titres trouvés")
            else:
                self.result_text.insert(tk.END, "Aucun titre trouvé.")
                self.status_var.set("Aucun titre trouvé")
        except Exception as e:
            self.result_text.insert(tk.END, f"Erreur: {str(e)}")
            self.status_var.set("Erreur lors de l'extraction")
            messagebox.showerror("Erreur", str(e))
        finally:
            self.scrape_button.state(['!disabled'])

    def copy_results(self):
        results = self.result_text.get(1.0, tk.END).strip()
        if results:
            self.root.clipboard_clear()
            self.root.clipboard_append(results)
            self.status_var.set("Résultats copiés dans le presse-papiers")
        else:
            self.status_var.set("Aucun résultat à copier")

    def clear_all(self):
        self.url_entry.delete(0, tk.END)
        self.result_text.delete(1.0, tk.END)
        self.status_var.set("Champs réinitialisés")
        self.url_entry.focus()

def main():
    root = tk.Tk()
    app = WebScraperGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()