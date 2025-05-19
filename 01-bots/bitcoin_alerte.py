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
from datetime import datetime
import customtkinter as ctk

# Configuration
SEUIL_VARIATION = 5  # Seuil de variation en pourcentage
INTERVALLE_VERIFICATION = 10  # Intervalle de vérification en secondes
FICHIER_PRIX = 'historique_prix.json'

# Configuration email (à remplir avec vos informations)
EMAIL_CONFIG = {
    'expediteur': 'votre_email@gmail.com',
    'destinataire': 'destinataire@email.com',
    'mot_de_passe': 'votre_mot_de_passe_application',
    'smtp_serveur': 'smtp.gmail.com',
    'smtp_port': 587
}

class BitcoinAlerteGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Surveillance du Prix Bitcoin")
        self.root.geometry("1200x800")
        
        # Configuration du thème
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")
        
        # Variables
        self.thread_surveillance = None
        self.surveillance_active = False
        self.historique_prix = []
        self.historique_temps = []
        
        # Création de l'interface
        self.creer_interface()
        
    def creer_interface(self):
        # Frame principal
        main_frame = ctk.CTkFrame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Frame gauche pour les contrôles
        frame_gauche = ctk.CTkFrame(main_frame)
        frame_gauche.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=5)
        
        # Configuration email
        ctk.CTkLabel(frame_gauche, text="Configuration Email", font=("Helvetica", 16, "bold")).pack(pady=10)
        
        # Champs email
        ctk.CTkLabel(frame_gauche, text="Email expéditeur:").pack(pady=5)
        self.email_expediteur = ctk.CTkEntry(frame_gauche, width=300)
        self.email_expediteur.pack(pady=5)
        self.email_expediteur.insert(0, EMAIL_CONFIG['expediteur'])
        
        ctk.CTkLabel(frame_gauche, text="Email destinataire:").pack(pady=5)
        self.email_destinataire = ctk.CTkEntry(frame_gauche, width=300)
        self.email_destinataire.pack(pady=5)
        self.email_destinataire.insert(0, EMAIL_CONFIG['destinataire'])
        
        ctk.CTkLabel(frame_gauche, text="Mot de passe:").pack(pady=5)
        self.mot_de_passe = ctk.CTkEntry(frame_gauche, width=300, show="*")
        self.mot_de_passe.pack(pady=5)
        self.mot_de_passe.insert(0, EMAIL_CONFIG['mot_de_passe'])

        # Paramètres de surveillance
        ctk.CTkLabel(frame_gauche, text="Paramètres de Surveillance", font=("Helvetica", 16, "bold")).pack(pady=10)
        
        ctk.CTkLabel(frame_gauche, text="Seuil de variation (%):").pack(pady=5)
        self.seuil_variation = ctk.CTkEntry(frame_gauche, width=100)
        self.seuil_variation.pack(pady=5)
        self.seuil_variation.insert(0, str(SEUIL_VARIATION))
        
        ctk.CTkLabel(frame_gauche, text="Intervalle (secondes):").pack(pady=5)
        self.intervalle = ctk.CTkEntry(frame_gauche, width=100)
        self.intervalle.pack(pady=5)
        self.intervalle.insert(0, str(INTERVALLE_VERIFICATION))
        
        # Boutons de contrôle
        self.bouton_demarrer = ctk.CTkButton(frame_gauche, text="Démarrer la surveillance", command=self.demarrer_surveillance)
        self.bouton_demarrer.pack(pady=10)
        
        # Zone de logs
        ctk.CTkLabel(frame_gauche, text="Logs:", font=("Helvetica", 16, "bold")).pack(pady=5)
        self.zone_logs = scrolledtext.ScrolledText(frame_gauche, width=50, height=10)
        self.zone_logs.pack(pady=5)
        
        # Status bar
        self.status_var = tk.StringVar()
        self.status_var.set("Prêt")
        status_bar = ctk.CTkLabel(frame_gauche, textvariable=self.status_var)
        status_bar.pack(pady=5)
        
        # Frame droite pour le graphique
        frame_droite = ctk.CTkFrame(main_frame)
        frame_droite.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=5)
        
        # Graphique
        self.graphique = ctk.CTkCanvas(frame_droite, width=500, height=400, bg='#2b2b2b')
        self.graphique.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)
        
        # Chargement de l'historique
        self.charger_historique()
    
    def dessiner_graphique(self):
        """Dessine le graphique des prix"""
        self.graphique.delete("all")
        
        if len(self.historique_prix) < 2:
            return
            
        # Dimensions du canvas
        width = self.graphique.winfo_width()
        height = self.graphique.winfo_height()
        
        # Marges
        margin = 40
        graph_width = width - 2 * margin
        graph_height = height - 2 * margin
        
        # Échelles
        min_prix = min(self.historique_prix)
        max_prix = max(self.historique_prix)
        prix_range = max_prix - min_prix
        
        # Dessiner les axes
        self.graphique.create_line(margin, height - margin, width - margin, height - margin, fill='white')  # Axe X
        self.graphique.create_line(margin, margin, margin, height - margin, fill='white')  # Axe Y
        
        # Dessiner les points et lignes
        points = []
        for i, (prix, temps) in enumerate(zip(self.historique_prix, self.historique_temps)):
            x = margin + (i * graph_width) / (len(self.historique_prix) - 1)
            y = height - margin - ((prix - min_prix) * graph_height) / prix_range
            points.append((x, y))
            
            # Dessiner le point
            self.graphique.create_oval(x-2, y-2, x+2, y+2, fill='#1f538d')
            
            # Ajouter le label de temps tous les 30 points pour éviter la surcharge
            if i % 30 == 0:
                self.graphique.create_text(x, height - margin + 10, text=temps, fill='white', angle=45)
        
        # Dessiner les lignes entre les points
        for i in range(len(points) - 1):
            self.graphique.create_line(points[i][0], points[i][1], points[i+1][0], points[i+1][1], fill='#1f538d', width=2)
        
        # Ajouter le titre
        self.graphique.create_text(width/2, margin/2, 
                                 text=f"Évolution du Prix Bitcoin (Mise à jour toutes les {INTERVALLE_VERIFICATION} secondes)", 
                                 fill='white', 
                                 font=('Helvetica', 14, 'bold'))
        
        # Ajouter les valeurs min et max
        self.graphique.create_text(margin - 5, height - margin, text=f"{min_prix:.0f}€", fill='white', anchor='e')
        self.graphique.create_text(margin - 5, margin, text=f"{max_prix:.0f}€", fill='white', anchor='e')
        
        # Ajouter le prix actuel
        dernier_prix = self.historique_prix[-1]
        self.graphique.create_text(width - margin + 5, margin, 
                                 text=f"Prix actuel: {dernier_prix:.2f}€", 
                                 fill='white', 
                                 anchor='w',
                                 font=('Helvetica', 12, 'bold'))
    
    def charger_historique(self):
        """Charge l'historique des prix depuis le fichier JSON"""
        try:
            if os.path.exists(FICHIER_PRIX):
                with open(FICHIER_PRIX, 'r') as f:
                    data = json.load(f)
                    self.historique_prix = data.get('prix', [])
                    self.historique_temps = data.get('temps', [])
                    if self.historique_prix:
                        self.log(f"Dernier prix enregistré: {self.historique_prix[-1]:.2f} EUR")
                        self.dessiner_graphique()
        except Exception as e:
            self.log(f"Erreur lors du chargement de l'historique: {e}")
    
    def sauvegarder_historique(self):
        """Sauvegarde l'historique des prix dans le fichier JSON"""
        with open(FICHIER_PRIX, 'w') as f:
            json.dump({
                'prix': self.historique_prix,
                'temps': self.historique_temps
            }, f)
    
    def log(self, message):
        """Ajoute un message dans la zone de logs"""
        self.zone_logs.insert(tk.END, f"{message}\n")
        self.zone_logs.see(tk.END)
    
    def demarrer_surveillance(self):
        """Démarre ou arrête la surveillance"""
        if not self.surveillance_active:
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
            
            self.surveillance_active = True
            self.thread_surveillance = threading.Thread(target=self.surveillance_continue)
            self.thread_surveillance.daemon = True
            self.thread_surveillance.start()
            
            self.bouton_demarrer.configure(text="Arrêter la surveillance")
            self.status_var.set("Surveillance active")
            self.log("Surveillance démarrée")
        else:
            self.surveillance_active = False
            self.bouton_demarrer.configure(text="Démarrer la surveillance")
            self.status_var.set("Surveillance arrêtée")
            self.log("Surveillance arrêtée")
    
    def surveillance_continue(self):
        """Fonction de surveillance continue"""
        while self.surveillance_active:
            self.verifier_prix()
            # Attendre le nombre de secondes spécifié
            for _ in range(INTERVALLE_VERIFICATION):
                if not self.surveillance_active:
                    break
                time.sleep(1)
    
    def verifier_prix(self):
        """Vérifie le prix et envoie une alerte si nécessaire"""
        self.log("Vérification du prix du Bitcoin...")
        
        nouveau_prix = obtenir_prix_bitcoin()
        if nouveau_prix is None:
            self.log("Erreur lors de la récupération du prix")
            return

        # Ajout du nouveau prix à l'historique
        self.historique_prix.append(nouveau_prix)
        self.historique_temps.append(datetime.now().strftime("%H:%M:%S"))
        
        # Limitation de l'historique aux 360 derniers points (1 heure de données à 10 secondes d'intervalle)
        if len(self.historique_prix) > 360:
            self.historique_prix = self.historique_prix[-360:]
            self.historique_temps = self.historique_temps[-360:]
        
        # Sauvegarde de l'historique
        self.sauvegarder_historique()
        
        # Mise à jour du graphique
        self.dessiner_graphique()
        
        if len(self.historique_prix) > 1:
            ancien_prix = self.historique_prix[-2]
            variation = calculer_variation(ancien_prix, nouveau_prix)
            self.log(f"Prix actuel: {nouveau_prix:.2f} EUR - Variation: {variation:.2f}%")

            if abs(variation) >= SEUIL_VARIATION:
                self.log(f"Alerte! Variation de {variation:.2f}% détectée")
                envoyer_email(ancien_prix, nouveau_prix, variation)
        else:
            self.log(f"Première vérification - Prix actuel: {nouveau_prix:.2f} EUR")

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
    root = ctk.CTk()
    app = BitcoinAlerteGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main() 