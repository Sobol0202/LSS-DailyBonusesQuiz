// ==UserScript==
// @name         LSS Daily Bonuses Quiz
// @namespace    https://www.leitstellenspiel.de
// @version      1.1
// @description  Popup quiz for the daily bonuses
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/daily_bonuses
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var antwortAusgewählt = false; // Variable zum Speichern des Zustands der Frage

    // Fragenkatalog mit Fragen und Antworten
    var fragen = [
    {
        frage: "Aktive Mitglieder der Freiwilligen Feuerwehren sind verpflichtet,",
        antworten: [
            "an Brandbekämpfungs- und Hilfeleistungseinsätzen teilzunehmen.",
            "Arbeiten zum Auspumpen von Baugruben im Rahmen von Bauarbeiten durchzuführen.",
            "Sicherungsmaßnahmen bei Laternenumzügen im eigenen Ermessen durchzuführen.",
            "durch den Ortsbrandmeister angesetzten, nicht dienstlichen Veranstaltungen teilzunehmen."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Berufsfeuerwehren müssen aufgestellt werden",
        antworten: [
            "in Städten mit mehr als 100000 Einwohnern.",
            "in Städten mit viel Industrie und mehr als 50000 Einwohnern.",
            "in Städten ohne Freiwillige Feuerwehren.",
            "in Städten mit besonders hohem Gefahrenpotenzial und einer anerkannten Werkfeuerwehr."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Feuerwehrangehörige dürfen im Einsatz",
        antworten: [
            "eine Straßensperrung vornehmen.",
            "grundsätzlich keine Eingriffe in den Straßenverkehr vornehmen, da es in den Zuständigkeitsbereich der Polizei fällt.",
            "den Verkehr im Bereich von Einsatzstellen regeln (Verkehrslenkung und -leitung).",
            "beliebig in den Straßenverkehr eingreifen, mit der Einschränkung, dass das nur auf Anforderung des Einsatzleiters der Feuerwehr erfolgen darf."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Aufgaben der Gemeinden und Landkreise nach dem Nds. Brandschutzgesetz sind",
        antworten: [
            "Brandschutz und Hilfeleistung.",
            "Brandschutz und Rettungsdienst.",
            "Brandschutz und Krankentransport.",
            "Zivilschutzbezogene Aufgaben, hier: Schulung des THW."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Die Freiwillige Feuerwehr einer Stadt bzw. Gemeinde wird geleitet durch",
        antworten: [
            "den Stadt-/Gemeindebrandmeister.",
            "den Stadt-/Gemeindedirektor.",
            "den für die jeweilige Gemeinde oder Stadt zuständigen Abschnittsleiter.",
            "den vom Feuerschutzausschuss ernannten Ehrenbeamten."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Der feuerwehrtechnische Aufsichtsbeamte des Landkreises ist",
        antworten: [
            "der Oberkreisdirektor.",
            "der Kreisbrandmeister.",
            "der Brandschutzprüfer.",
            "der Kreisbrandinspektor."
        ],
        richtigeAntwort: 1
    },
    {
        frage: "Im Alarmfall dürfen nur Feuerwehrangehörige ausrücken,",
        antworten: [
            "die zwar Alkohol getrunken haben, sich aber noch fit fühlen.",
            "die krank geschrieben sind, aber nur, wenn es der Gesundheitszustand nach eigener Einschätzung zulässt.",
            "die uneingeschränkt körperlich und geistig tauglich sind.",
            "die Drogen konsumiert haben, sich aber noch fit fühlen."
        ],
        richtigeAntwort: 2
    },
    {
        frage: "Eine Verbrennung ist eine",
        antworten: [
            "schnell ablaufende Reaktion zwischen einem brennbaren Stoff und Kohlenstoffdioxid.",
            "schnell ablaufenden Oxidation unter Licht- und Wärmeerscheinung.",
            "Oxidbildung bei Metallen (Rosten).",
            "schnell verlaufende Reduktion eines brennbaren Stoffs."
        ],
        richtigeAntwort: 1
    },
    {
        frage: "Benzin wird der",
        antworten: [
            "Brandklasse A zugeordnet.",
            "Brandklasse B zugeordnet.",
            "Brandklasse C zugeordnet.",
            "Brandklasse F zugeordnet."
        ],
        richtigeAntwort: 1
    },
    {
        frage: "Zur Bekämpfung von Bränden der Brandklasse „A“ ist",
        antworten: [
            "Wasser geeignet.",
            "Kohlenstoffmonoxid geeignet.",
            "Glutbrandpulver nicht einzusetzen.",
            "nur ein Löschmittel einzusetzen, das mit einem ‚X’ gekennzeichnet ist."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Zur Brandklasse C gehören",
        antworten: [
            "feste, brennbare Stoffe.",
            "flüssige, brennbare Stoffe.",
            "gasförmige, brennbare Stoffe.",
            "Dämpfe brennbarer Flüssigkeiten."
        ],
        richtigeAntwort: 2
    },
    {
        frage: "Nur mit Glut verbrennen",
        antworten: [
            "Holz, Kohle, Papier.",
            "Holzkohle, Koks.",
            "Wachs, Stearin, Fett.",
            "Hartwachs und entgaste Kohle."
        ],
        richtigeAntwort: 1
    },
    {
        frage: "Zur Brandklasse A gehören",
        antworten: [
            "feste brennbare Stoffe.",
            "flüssige brennbare Stoffe.",
            "gasförmige brennbare Stoffe.",
            "anorganische nicht brennbare Stoffe."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Die Hauptlöschwirkung des Wassers besteht im",
        antworten: [
            "Kühlen.",
            "Ersticken.",
            "Verdünnen.",
            "Abmagern."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Speziell für technische Hilfeleistungen größeren Umfangs sind",
        antworten: [
            "Löschgruppenfahrzeuge geeignet.",
            "Tanklöschfahrzeuge geeignet.",
            "Rüstwagen geeignet.",
            "alle Feuerwehrfahrzeuge geeignet, die einen speziellen Rüstsatz mitführen."
        ],
        richtigeAntwort: 2
    },
            {
        frage: "Ein TSF hat eine ausreichende feuerwehrtechnische Beladung für",
        antworten: [
            "einen selbstständigen Trupp.",
            "eine Löschgruppe.",
            "maximal eine Löschstaffel.",
            "Einsätze im Bereich der technischen Hilfeleistung größeren Umfangs."
        ],
        richtigeAntwort: 1
    },
            {
        frage: "Die Abkürzung FPN 10-1000 bedeutet",
        antworten: [
            "Feuerpumpe, 800 l/min bei 8 MPa.",
            "Feuerlöschkreiselpumpe, Kenndaten: 1000 l/min bei 10 bar.",
            "Feuerlöschkreiselpumpe, Kenndaten: 1000 bar bei 10 l/min.",
            "fest eingebaute Pumpe (am oder im Löschfahrzeug)"
        ],
        richtigeAntwort: 1
    },
            {
        frage: "Auf einem LF 10/6 wird/werden mitgeführt",
        antworten: [
            "die vierteilige Steckleiter.",
            "die zweiteilige Schiebleiter.",
            "die vierteilige Schiebleiter und die dreiteilige Steckleiter.",
            "die zweiteilige Schiebleiter und die Multifunktionsleiter."
        ],
        richtigeAntwort: 0
    },
            {
        frage: "Zu den Tanklöschfahrzeugen zählt/zählen",
        antworten: [
            "das LF 10/6.",
            "das TLF 8/18.",
            "das TSF-W.",
            "alle Fahrzeuge mit eingebauten Löschwasserbehälter."
        ],
        richtigeAntwort: 1
    },
            {
        frage: "Der Löschwasserbehälter im TLF 24/50 enthält",
        antworten: [
            "1600 l.",
            "2400 l.",
            "4800 l",
            "5000 l"
        ],
        richtigeAntwort: 2
    },
            {
        frage: "Der Wasserringmonitor befindet sich in einem TSF generell",
        antworten: [
            "in Fahrtrichtung links.",
            "in Fahrtrichtung rechts.",
            "im Geräteraum auf der Fahrzeugrückseite.",
            "nirgendwo, da eine solche Armatur nicht zur Standardausrüstung eines TSF gehört."
        ],
        richtigeAntwort: 3
    },
            {
        frage: "Zur Gruppe der Löschgruppenfahrzeuge zählt",
        antworten: [
            "das LF 20/16.",
            "das TLF 8/18.",
            "das TSF-W.",
            "das TLF 16/25."
        ],
        richtigeAntwort: 0
    },
            {
        frage: "Eine DLAK 23-12 ist:",
        antworten: [
            "ein Hubrettungsfahrzeug mit Allradantrieb",
            "ein Hubrettungsfahrzeug mit automatischen Leiterbewegungen",
            "ein Hubrettungsfahrzeug mit Automatikgetriebe",
            "ein Hubrettungsfahrzeug mit einer Nennrettungshöhe von 12 m"
        ],
        richtigeAntwort: 1
    },
            {
        frage: "Ein StLF 10/6",
        antworten: [
            "ist ein Löschfahrzeug mit Staffelbeladung und Gruppenbesatzung",
            "muss über eine PFPN 10-1000 verfügen",
            "ist ein Löschfahrzeug mit Beladung für eine Gruppe",
            "ist kein genormtes Löschfahrzeug"
        ],
        richtigeAntwort: 2
    },
            {
        frage: "Zur persönlichen Ausrüstung (Mindestschutzausrüstung) gehört unter anderem",
        antworten: [
            "Feuerwehr-Schutzanzug und Beleuchtungsgerät.",
            "Feuerwehr-Schutzanzug und Fw-Schutzhandschuhe.",
            "Feuerwehr-Schutzhelm und Pressluftatmer.",
            "Gesichtsschutz (Visier) und Feuerwehrhaltegurt."
        ],
        richtigeAntwort: 1
    },
            {
        frage: "Hitzeschutzkleidung schützt vorgehende Einsatzkräfte bei der Brandbekämpfung vorrangig gegen",
        antworten: [
            "einen Fliehkraftzerfall.",
            "herumfliegende Splitter.",
            "Strahlungswärme.",
            "tiefkalte, verflüssigte Gase."
        ],
        richtigeAntwort: 2
    },
            {
        frage: "Abweichungen zur persönlichen Schutzausrüstung sind entsprechend",
        antworten: [
            "UVV Feuerwehren auf Befehl des Einheitsführers möglich.",
            "UVV Feuerwehren auf Befehl des Einheitsführers nicht möglich.",
            "UVV Feuerwehren auf Befehl des Landesbranddirektors möglich.",
            "VUU Pflichtfeuerwehren auf Befehl des Einheitsführers möglich.."
        ],
        richtigeAntwort: 0
    },
            {
        frage: "Ein B-Druckschlauch hat einen Innendurchmesser (Nennweite) von",
        antworten: [
            "7,5 m",
            "7,5 mm",
            "75 mm",
            "7,5 dm"
        ],
        richtigeAntwort: 2
    },
            {
        frage: "Folgende(s) Löschmittel dürfen/darf bei Schornsteinbränden nicht eingesetzt werden:",
        antworten: [
            "ABC-Löschpulver",
            "BC-Löschpulver.",
            "Wasser",
            "Sand"
        ],
        richtigeAntwort: 2
    },
    {
        frage: "Speiseöle, die Anwendung in einer Friteuse finden werden, der",
        antworten: [
            "Brandklasse A zugeordnet.",
            "Brandklasse B zugeordnet.",
            "Brandklasse C zugeordnet.",
            "Brandklasse F zugeordnet."
        ],
        richtigeAntwort: 3
    },
        // Weitere Fragen hier hinzufügen...
    ];

    // Funktion zum Aktualisieren des Popup-Inhalts
    function aktualisierePopup() {
        // Zufällige Frage auswählen
        var zufallsIndex = Math.floor(Math.random() * fragen.length);
        var aktuelleFrage = fragen[zufallsIndex];

        // Frage aktualisieren
        frageElement.textContent = aktuelleFrage.frage;

        // Antwortbuttons aktualisieren
        while (antwortButtonsContainer.firstChild) {
            antwortButtonsContainer.firstChild.removeEventListener("click", antwortButtonClickHandler);
            antwortButtonsContainer.firstChild.remove();
        }

        aktuelleFrage.antworten.forEach(function(antwort, index) {
            var antwortButton = document.createElement("button");
            antwortButton.textContent = antwort;
            antwortButton.style.display = "block";
            antwortButton.style.margin = "10px auto";
            antwortButton.style.padding = "20px 40px";
            antwortButton.style.fontSize = "20px";
            antwortButton.addEventListener("click", antwortButtonClickHandler);
            antwortButtonsContainer.appendChild(antwortButton);
        });

        antwortAusgewählt = false; // Zustand der Frage zurücksetzen
    }

    // Funktion zum Behandeln des Klicks auf eine Antwort
    function antwortButtonClickHandler(event) {
        if (!antwortAusgewählt) { // Überprüfen, ob noch keine Antwort ausgewählt wurde
            var antwortButton = event.target;
            var antwortIndex = Array.from(antwortButtonsContainer.children).indexOf(antwortButton);
            var aktuelleFrage = fragen.find(function(frage) {
                return frage.frage === frageElement.textContent;
            });

            antwortAusgewählt = true; // Zustand der Frage auf "Antwort ausgewählt" setzen

            if (antwortIndex === aktuelleFrage.richtigeAntwort) {
                antwortButton.style.backgroundColor = "green";
                setTimeout(function() {
                    popup.remove();
                }, 3000);
            } else {
                antwortButton.style.backgroundColor = "red";
                setTimeout(function() {
                    // Nächste Frage anzeigen
                    aktualisierePopup();
                }, 3000);
            }
        }
    }

    // Popup erstellen
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "0";
    popup.style.left = "0";
    popup.style.width = "100%";
    popup.style.height = "100%";
    popup.style.display = "flex";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "center";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    popup.style.zIndex = "9999";

    var popupContent = document.createElement("div");
    popupContent.style.backgroundColor = "white";
    popupContent.style.padding = "20px";
    popupContent.style.borderRadius = "10px";
    popup.appendChild(popupContent);

    // Frage hinzufügen
    var frageElement = document.createElement("p");
    frageElement.style.fontSize = "24px";
    frageElement.style.textAlign = "center";
    popupContent.appendChild(frageElement);

    // Antwortbuttons Container erstellen
    var antwortButtonsContainer = document.createElement("div");
    antwortButtonsContainer.style.textAlign = "center";
    popupContent.appendChild(antwortButtonsContainer);

    // Popup zur Seite hinzufügen
    document.body.appendChild(popup);

    // Popup initialisieren
    aktualisierePopup();
})();

