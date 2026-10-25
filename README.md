# Outlook-Betreff-Assistent

Ein Outlook-Web-Add-in für E-Mail-Entwürfe. Die Task Pane verwendet das
vorhandene HTML-Design; die Schaltfläche erscheint im Menüband beim Verfassen
einer Nachricht. Beim Öffnen lädt das Add-in den bestehenden Betreff, entfernt
wiederholte Präfixe wie `AN:`, `AF:`, `AW:`, `RE:`, `FW:`, `FWD:` und `WG:`,
erkennt ein Projekt anhand seiner vollständigen Bezeichnung oder Projektnummer,
extrahiert den Restbetreff und übernimmt die normalisierte Vorschau unmittelbar
in den Entwurf. Außerhalb von Outlook kann die HTML-Seite weiterhin als Demo
geöffnet werden.

## Über GitHub Pages bereitstellen

Das Manifest verweist auf `https://mat3004.github.io/Betreff-Assistent/`. Dafür
muss GitHub Pages aktiv sein (Settings → Pages → Branch `main`, Ordner `/ (root)`),
danach `manifest.xml` in Outlook hochladen. Für lokale Entwicklung die URLs im
Manifest wieder auf `https://localhost:3000/` setzen.

## Lokal starten

Voraussetzungen: Node.js 18 oder neuer und ein unterstützter Outlook-Client.

1. Im Projektordner `npm install` ausführen.
2. `npm start` starten und das lokale HTTPS-Zertifikat bei Bedarf installieren
   lassen.
3. Für klassisches Outlook in einem zweiten Terminal `npm run sideload:desktop`
   ausführen. Zum Entfernen des Add-ins `npm run stop` verwenden.
4. Für neues Outlook oder Outlook im Web das Add-in in Outlook unter **Meine
   Add-Ins** über **Benutzerdefiniertes Add-In hinzufügen** und **Aus Datei
   hinzufügen** mit `manifest.xml` sideloaden. Der HTTPS-Entwicklungsserver muss
   dabei laufen.

Das Zertifikat für `localhost` muss vom verwendeten Outlook-Client als
vertrauenswürdig akzeptiert werden. Für Outlook im Web müssen Browser und
Entwicklungsserver auf demselben Rechner erreichbar sein. Outlook-Version,
Mailbox-Anforderungssatz und Richtlinien des Organisationstenants können
Sideloading einschränken; vor einer organisationsweiten Verteilung müssen diese
Umgebungen geprüft werden.

## Umfang und Grenzen

- Das Manifest registriert die Schaltfläche für Entwürfe beim Verfassen.
- Durch die sofortige Normalisierung wird der vorhandene Betreff des Entwurfs
  beim Öffnen der Task Pane ersetzt. Übernommen wird der Text nach dem
  erkannten Projekt und dem konfigurierten Projekt-Betreff-Trenner; bei
  unbekanntem Projekt dient der Projekt-Betreff-Trenner als Trennstelle.
- Einstellungen und Projektliste werden im lokalen Browserspeicher des jeweiligen
  Outlook-Clients gespeichert (`localStorage`) und gelten pro Gerät.
- Das Repository enthält nur Beispielprojekte. Die echte Projektliste wird über
  das Zahnrad eingetragen und nicht in den Code geschrieben.
- Es gibt keine SharePoint- oder andere zentrale Datenanbindung.

Das XML-Manifest verwendet die klassische Outlook-Web-Add-in-Manifestform, um
klassisches Outlook, neues Outlook und Outlook im Web mit demselben Task
Pane-Einstieg anzusprechen. Die tatsächliche Verfügbarkeit hängt von den
Outlook-Versionen und Richtlinien des Tenants ab.
