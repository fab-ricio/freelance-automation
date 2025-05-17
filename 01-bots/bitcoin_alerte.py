import requests
import smtplib
import schedule
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os
import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import threading

# Configuration
SEUIL_VARIATION = 5  # Seuil de variation en pourcentage
INTERVALLE_VERIFICATION = 10  # Intervalle de vérification en minutes
FICHIER_PRIX = 'dernier_prix.json'

# Configuration email (à remplir avec vos informations)
EMAIL_CONFIG = {
    'expediteur': 'votre_email@gmail.com',
    'destinataire': 'destinataire@email.com',
    'mot_de_passe': 'votre_mot_de_passe_application',  # Mot de passe d'application Gmail
    'smtp_serveur': 'smtp.gmail.com',
    'smtp_port': 587
}

class BitcoinAlerteGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Surveillance du Prix Bitcoin")
        self.root.geometry("800x600")
        
        # Variables
        self.thread_surveillance = None
        self.surveillance_active = False
        
        # Création de l'interface
        self.creer_interface()
        
    def creer_interface(self):
        # Frame principal
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Configuration des colonnes
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        
        # Configuration email
        ttk.Label(main_frame, text="Configuration Email", font=('Helvetica', 12, 'bold')).grid(row=0, column=0, columnspan=2, pady=10)
        
        # Champs email
        ttk.Label(main_frame, text="Email expéditeur:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.email_expediteur = ttk.Entry(main_frame, width=40)
        self.email_expediteur.grid(row=1, column=1, sticky=(tk.W, tk.E), pady=5)
        self.email_expediteur.insert(0, EMAIL_CONFIG['expediteur'])
        
        ttk.Label(main_frame, text="Email destinataire:").grid(row=2, column=0, sticky=tk.W, pady=5)
        self.email_destinataire = ttk.Entry(main_frame, width=40)
        self.email_destinataire.grid(row=2, column=1, sticky=(tk.W, tk.E), pady=5)
        self.email_destinataire.insert(0, EMAIL_CONFIG['destinataire'])
        
        ttk.Label(main_frame, text="Mot de passe:").grid(row=3, column=0, sticky=tk.W, pady=5)
        self.mot_de_passe = ttk.Entry(main_frame, width=40, show="*")
        self.mot_de_passe.grid(row=3, column=1, sticky=(tk.W, tk.E), pady=5)
        self.mot_de_passe.insert(0, EMAIL_CONFIG['mot_de_passe'])
        
        # Paramètres de surveillance
        ttk.Label(main_frame, text="Paramètres de Surveillance", font=('Helvetica', 12, 'bold')).grid(row=4, column=0, columnspan=2, pady=10)
        
        ttk.Label(main_frame, text="Seuil de variation (%):").grid(row=5, column=0, sticky=tk.W, pady=5)
        self.seuil_variation = ttk.Entry(main_frame, width=10)
        self.seuil_variation.grid(row=5, column=1, sticky=tk.W, pady=5)
        self.seuil_variation.insert(0, str(SEUIL_VARIATION))
        
        ttk.Label(main_frame, text="Intervalle (minutes):").grid(row=6, column=0, sticky=tk.W, pady=5)
        self.intervalle = ttk.Entry(main_frame, width=10)
        self.intervalle.grid(row=6, column=1, sticky=tk.W, pady=5)
        self.intervalle.insert(0, str(INTERVALLE_VERIFICATION))
        
        # Boutons de contrôle
        self.bouton_demarrer = ttk.Button(main_frame, text="Démarrer la surveillance", command=self.demarrer_surveillance)
        self.bouton_demarrer.grid(row=7, column=0, columnspan=2, pady=10)
        
        # Zone de logs
        ttk.Label(main_frame, text="Logs:", font=('Helvetica', 12, 'bold')).grid(row=8, column=0, columnspan=2, pady=5)
        self.zone_logs = scrolledtext.ScrolledText(main_frame, width=70, height=10)
        self.zone_logs.grid(row=9, column=0, columnspan=2, pady=5)
        
        # Status bar
        self.status_var = tk.StringVar()
        self.status_var.set("Prêt")
        status_bar = ttk.Label(main_frame, textvariable=self.status_var, relief=tk.SUNKEN, anchor=tk.W)
        status_bar.grid(row=10, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)
    
    def log(self, message):
        """Ajoute un message dans la zone de logs"""
        self.zone_logs.insert(tk.END, f"{message}\n")
        self.zone_logs.see(tk.END)
    
    def demarrer_surveillance(self):
        """Démarre ou arrête la surveillance"""
        if not self.surveillance_active:
            # Mise à jour de la configuration
            try:
                EMAIL_CONFIG['expediteur'] = self.email_expediteur.get()
                EMAIL_CONFIG['destinataire'] = self.email_destinataire.get()
                EMAIL_CONFIG['mot_de_passe'] = self.mot_de_passe.get()
                global SEUIL_VARIATION, INTERVALLE_VERIFICATION
                SEUIL_VARIATION = float(self.seuil_variation.get())
                INTERVALLE_VERIFICATION = int(self.intervalle.get())
            except ValueError as e:
                messagebox.showerror("Erreur", "Veuillez entrer des valeurs numériques valides pour le seuil et l'intervalle")
                return
            
            # Démarrage de la surveillance dans un thread séparé
            self.surveillance_active = True
            self.thread_surveillance = threading.Thread(target=self.surveillance_continue)
            self.thread_surveillance.daemon = True
            self.thread_surveillance.start()
            
            self.bouton_demarrer.configure(text="Arrêter la surveillance")
            self.status_var.set("Surveillance active")
            self.log("Surveillance démarrée")
        else:
            # Arrêt de la surveillance
            self.surveillance_active = False
            self.bouton_demarrer.configure(text="Démarrer la surveillance")
            self.status_var.set("Surveillance arrêtée")
            self.log("Surveillance arrêtée")
    
    def surveillance_continue(self):
        """Fonction de surveillance continue"""
        while self.surveillance_active:
            self.verifier_prix()
            time.sleep(INTERVALLE_VERIFICATION * 60)
    
    def verifier_prix(self):
        """Vérifie le prix et envoie une alerte si nécessaire"""
        self.log("Vérification du prix du Bitcoin...")
        
        nouveau_prix = obtenir_prix_bitcoin()
        if nouveau_prix is None:
            self.log("Erreur lors de la récupération du prix")
            return

        ancien_prix = charger_dernier_prix()
        
        if ancien_prix is None:
            self.log(f"Première vérification - Prix actuel: {nouveau_prix:.2f} EUR")
            sauvegarder_prix(nouveau_prix)
            return

        variation = calculer_variation(ancien_prix, nouveau_prix)
        self.log(f"Variation: {variation:.2f}%")

        if abs(variation) >= SEUIL_VARIATION:
            self.log(f"Alerte! Variation de {variation:.2f}% détectée")
            envoyer_email(ancien_prix, nouveau_prix, variation)
        
        sauvegarder_prix(nouveau_prix)

def obtenir_prix_bitcoin():
    """Récupère le prix actuel du Bitcoin via l'API CoinGecko"""
    try:
        url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data['bitcoin']['eur']
    except Exception as e:
        print(f"Erreur lors de la récupération du prix: {e}")
        return None

def sauvegarder_prix(prix):
    """Sauvegarde le prix dans un fichier JSON"""
    with open(FICHIER_PRIX, 'w') as f:
        json.dump({'prix': prix}, f)

def charger_dernier_prix():
    """Charge le dernier prix sauvegardé"""
    try:
        if os.path.exists(FICHIER_PRIX):
            with open(FICHIER_PRIX, 'r') as f:
                data = json.load(f)
                return data['prix']
    except Exception as e:
        print(f"Erreur lors de la lecture du fichier de prix: {e}")
    return None

def calculer_variation(ancien_prix, nouveau_prix):
    """Calcule le pourcentage de variation"""
    return ((nouveau_prix - ancien_prix) / ancien_prix) * 100

def envoyer_email(ancien_prix, nouveau_prix, variation):
    """Envoie un email d'alerte avec les informations de prix"""
    try:
        message = MIMEMultipart()
        message['From'] = EMAIL_CONFIG['expediteur']
        message['To'] = EMAIL_CONFIG['destinataire']
        message['Subject'] = f"Alerte Bitcoin: Variation de {variation:.2f}%"

        corps = f"""
        Alerte de variation du prix du Bitcoin !

        Ancien prix: {ancien_prix:.2f} EUR
        Nouveau prix: {nouveau_prix:.2f} EUR
        Variation: {variation:.2f}%

        Cette alerte a été déclenchée car la variation dépasse le seuil de {SEUIL_VARIATION}%.
        """
        message.attach(MIMEText(corps, 'plain'))

        with smtplib.SMTP(EMAIL_CONFIG['smtp_serveur'], EMAIL_CONFIG['smtp_port']) as serveur:
            serveur.starttls()
            serveur.login(EMAIL_CONFIG['expediteur'], EMAIL_CONFIG['mot_de_passe'])
            serveur.send_message(message)
            
        print("Email d'alerte envoyé avec succès!")
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email: {e}")

def main():
    root = tk.Tk()
    app = BitcoinAlerteGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main() 