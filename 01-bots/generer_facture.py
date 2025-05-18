import os
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet

def charger_donnees(json_path):
    """Charge les données de la facture depuis un fichier JSON."""
    with open(json_path, encoding='utf-8') as f:
        return json.load(f)

def generer_facture_pdf(data, logo_path=None, dossier='factures'):
    """Génère un PDF de facture à partir des données fournies."""
    if not os.path.exists(dossier):
        os.makedirs(dossier)
    nom_fichier = f"facture_{data['numero']}.pdf"
    chemin_pdf = os.path.join(dossier, nom_fichier)

    doc = SimpleDocTemplate(chemin_pdf, pagesize=A4, rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=18)
    elements = []
    styles = getSampleStyleSheet()

    # Logo
    if logo_path and os.path.exists(logo_path):
        img = Image(logo_path, width=40*mm, height=40*mm)
        elements.append(img)
    else:
        elements.append(Spacer(1, 40*mm))

    # Titre
    elements.append(Paragraph("<b>FACTURE</b>", styles['Title']))
    elements.append(Spacer(1, 12))

    # Infos client et facture
    infos = f"""
    <b>Client :</b> {data['client']['nom']}<br/>
    <b>Adresse :</b> {data['client']['adresse']}<br/><br/>
    <b>Date :</b> {data['date']}<br/>
    <b>Numéro de facture :</b> {data['numero']}<br/>
    """
    elements.append(Paragraph(infos, styles['Normal']))
    elements.append(Spacer(1, 12))

    # Tableau des services
    table_data = [["Description", "Quantité", "Prix unitaire (€)", "Total (€)"]]
    total_ht = 0
    for service in data['services']:
        total = service['quantite'] * service['prix_unitaire']
        total_ht += total
        table_data.append([
            service['description'],
            str(service['quantite']),
            f"{service['prix_unitaire']:.2f}",
            f"{total:.2f}"
        ])

    table = Table(table_data, hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.lightgrey),
        ('GRID', (0,0), (-1,-1), 1, colors.grey),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('ALIGN', (1,1), (-1,-1), 'CENTER'),
    ]))
    elements.append(table)
    elements.append(Spacer(1, 12))

    # Totaux
    tva = data.get('tva', 20)
    montant_tva = total_ht * tva / 100
    total_ttc = total_ht + montant_tva

    totaux = f"""
    <b>Total HT :</b> {total_ht:.2f} €<br/>
    <b>TVA ({tva}%) :</b> {montant_tva:.2f} €<br/>
    <b>Total TTC :</b> {total_ttc:.2f} €<br/>
    """
    elements.append(Paragraph(totaux, styles['Normal']))

    doc.build(elements)
    print(f"Facture générée : {chemin_pdf}")
    return chemin_pdf

def envoyer_facture_email(pdf_path, destinataire, expediteur, mdp_app, sujet="Votre facture", corps="Veuillez trouver votre facture en pièce jointe."):
    """Envoie la facture par email."""
    import smtplib
    from email.message import EmailMessage

    msg = EmailMessage()
    msg['Subject'] = sujet
    msg['From'] = expediteur
    msg['To'] = destinataire
    msg.set_content(corps)

    with open(pdf_path, 'rb') as f:
        pdf_data = f.read()
    msg.add_attachment(pdf_data, maintype='application', subtype='pdf', filename=os.path.basename(pdf_path))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(expediteur, mdp_app)
        smtp.send_message(msg)
    print(f"Facture envoyée à {destinataire}")

if __name__ == "__main__":
    # Exemple d'utilisation
    donnees = charger_donnees('data/facture_exemple.json')
    chemin_pdf = generer_facture_pdf(donnees)  # Sans logo pour l'exemple

    # Pour envoyer par email, décommentez et remplissez les informations :
    # envoyer_facture_email(
    #     pdf_path=chemin_pdf,
    #     destinataire="client@email.com",
    #     expediteur="votre.email@gmail.com",
    #     mdp_app="votre_mot_de_passe_application"
    # ) 