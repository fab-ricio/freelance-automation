import customtkinter as ctk
import json
import os
from tkinter import messagebox
from generer_facture import generer_facture_pdf, envoyer_facture_email

class InterfaceFacture(ctk.CTk):
    def __init__(self):
        super().__init__()

        # Configuration de la fenêtre
        self.title("Gestionnaire de Factures")
        self.geometry("800x600")
        
        # Configuration du thème
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")

        # Création des onglets
        self.tabview = ctk.CTkTabview(self)
        self.tabview.pack(padx=20, pady=20, fill="both", expand=True)
        
        # Onglet Création de facture
        self.tab_creation = self.tabview.add("Création")
        self.tab_historique = self.tabview.add("Historique")
        
        self.creer_onglet_creation()
        self.creer_onglet_historique()

    def creer_onglet_creation(self):
        # Frame pour les informations client
        frame_client = ctk.CTkFrame(self.tab_creation)
        frame_client.pack(padx=20, pady=10, fill="x")
        
        ctk.CTkLabel(frame_client, text="Informations Client", font=("Arial", 16, "bold")).pack(pady=5)
        
        # Champs client
        self.nom_client = self.creer_champ(frame_client, "Nom du client")
        self.adresse_client = self.creer_champ(frame_client, "Adresse")
        
        # Frame pour les services
        frame_services = ctk.CTkFrame(self.tab_creation)
        frame_services.pack(padx=20, pady=10, fill="x")
        
        ctk.CTkLabel(frame_services, text="Services", font=("Arial", 16, "bold")).pack(pady=5)
        
        # Liste des services
        self.services = []
        self.frame_services_liste = ctk.CTkFrame(frame_services)
        self.frame_services_liste.pack(fill="x", pady=5)
        
        # Bouton pour ajouter un service
        ctk.CTkButton(frame_services, text="Ajouter un service", 
                     command=self.ajouter_service).pack(pady=5)
        
        # Frame pour les paramètres
        frame_parametres = ctk.CTkFrame(self.tab_creation)
        frame_parametres.pack(padx=20, pady=10, fill="x")
        
        # TVA
        self.tva = self.creer_champ(frame_parametres, "TVA (%)", valeur_defaut="20")
        
        # Bouton de génération
        ctk.CTkButton(self.tab_creation, text="Générer la facture", 
                     command=self.generer_facture).pack(pady=20)

    def creer_onglet_historique(self):
        # Liste des factures
        self.liste_factures = ctk.CTkTextbox(self.tab_historique)
        self.liste_factures.pack(padx=20, pady=20, fill="both", expand=True)
        self.actualiser_historique()

    def creer_champ(self, parent, label, valeur_defaut=""):
        frame = ctk.CTkFrame(parent)
        frame.pack(fill="x", pady=5)
        
        ctk.CTkLabel(frame, text=label).pack(side="left", padx=5)
        champ = ctk.CTkEntry(frame)
        champ.pack(side="right", fill="x", expand=True, padx=5)
        if valeur_defaut:
            champ.insert(0, valeur_defaut)
        return champ

    def ajouter_service(self):
        frame_service = ctk.CTkFrame(self.frame_services_liste)
        frame_service.pack(fill="x", pady=5)
        
        description = ctk.CTkEntry(frame_service, placeholder_text="Description")
        description.pack(side="left", padx=5, fill="x", expand=True)
        
        quantite = ctk.CTkEntry(frame_service, placeholder_text="Quantité", width=100)
        quantite.pack(side="left", padx=5)
        
        prix = ctk.CTkEntry(frame_service, placeholder_text="Prix unitaire", width=100)
        prix.pack(side="left", padx=5)
        
        ctk.CTkButton(frame_service, text="X", width=30,
                     command=lambda: frame_service.destroy()).pack(side="left", padx=5)
        
        self.services.append((description, quantite, prix))

    def generer_facture(self):
        try:
            # Récupération des données
            data = {
                "client": {
                    "nom": self.nom_client.get(),
                    "adresse": self.adresse_client.get()
                },
                "date": self.get_date_actuelle(),
                "numero": self.get_prochain_numero(),
                "services": [],
                "tva": float(self.tva.get())
            }
            
            # Récupération des services
            for desc, qte, prix in self.services:
                if desc.get() and qte.get() and prix.get():
                    data["services"].append({
                        "description": desc.get(),
                        "quantite": int(qte.get()),
                        "prix_unitaire": float(prix.get())
                    })
            
            # Génération de la facture
            chemin_pdf = generer_facture_pdf(data)
            messagebox.showinfo("Succès", f"Facture générée : {chemin_pdf}")
            
            # Actualisation de l'historique
            self.actualiser_historique()
            
        except Exception as e:
            messagebox.showerror("Erreur", str(e))

    def get_date_actuelle(self):
        from datetime import datetime
        return datetime.now().strftime("%Y-%m-%d")

    def get_prochain_numero(self):
        # Recherche du dernier numéro de facture
        derniere_facture = 0
        for fichier in os.listdir("factures"):
            if fichier.startswith("facture_") and fichier.endswith(".pdf"):
                try:
                    numero = int(fichier[8:-4])
                    derniere_facture = max(derniere_facture, numero)
                except ValueError:
                    continue
        return f"{derniere_facture + 1:03d}"

    def actualiser_historique(self):
        self.liste_factures.delete("1.0", "end")
        if not os.path.exists("factures"):
            return
            
        for fichier in sorted(os.listdir("factures"), reverse=True):
            if fichier.endswith(".pdf"):
                self.liste_factures.insert("end", f"{fichier}\n")

if __name__ == "__main__":
    app = InterfaceFacture()
    app.mainloop() 