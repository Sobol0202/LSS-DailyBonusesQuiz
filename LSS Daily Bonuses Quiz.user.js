// ==UserScript==
// @name         LSS Daily Bonuses Quiz
// @namespace    https://www.leitstellenspiel.de
// @version      1.0
// @description  Popup quiz for the daily bonuses
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/daily_bonuses
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
        frage: "Mit Flamme und Glut brennen",
        antworten: [
            "Holz, Kohle, Papier.",
            "Metalle.",
            "Wachs, Stearin, Fett.",
            "Gase."
        ],
        richtigeAntwort: 0
    },
    {
        frage: "Für welche Stoffe gilt nebenstehendes Bildzeichen?",
        antworten: [
            "Brände von Metallen",
            "Brennbare Gase",
            "Brennbare flüssige Stoffe",
            "Brennbare Chemikalien"
        ],
        richtigeAntwort: 1
    }
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
    }

    // Funktion zum Behandeln des Klicks auf eine Antwort
    function antwortButtonClickHandler(event) {
        var antwortButton = event.target;
        var antwortIndex = Array.from(antwortButtonsContainer.children).indexOf(antwortButton);
        var aktuelleFrage = fragen.find(function(frage) {
            return frage.frage === frageElement.textContent;
        });

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
