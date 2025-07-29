# 🧠 SimplifyMe – Dein persönlicher KI-Assistent

## Projektübersicht

**SimplifyMe** ist ein persönlicher KI-Assistent, der hilft, komplexe Inhalte zu vereinfachen – etwa durch Bilderzeugung, Textzusammenfassungen und Bildbeschreibung.  
Das Ziel: den Alltag mit Hilfe moderner KI-Modelle zu **erleichtern**.

Dieses Projekt ist Teil meiner persönlichen Weiterentwicklung und dient auch als Demonstration meiner technischen Fähigkeiten im Bereich Full-Stack-Entwicklung mit Fokus auf KI-Anwendungen.

## ✨ Motivation

Ich interessiere mich schon lange für künstliche Intelligenz. In Online-Kursen habe ich erste Einblicke gewonnen, wie man eigene Modelle trainieren kann – aber der Einstieg ist gerade für Anfänger nicht einfach.  
Als ich dann zufällig auf [Hugging Face](https://huggingface.co/) gestoßen bin, wurde mir klar, dass man auch ohne eigenes Training viele leistungsstarke, vortrainierte Modelle nutzen kann.  
So entstand die Idee zu **SimplifyMe** – ein Tool, das Inhalte mithilfe von KI verständlicher machen soll.


## 🛠️ Tech Stack

- **Frontend**: Angular + PrimeNG  
  → Bereitgestellt über **Render**

- **Backend**: Python + FastAPI  
  → Gehostet auf **Hugging Face Spaces**

- **Containerisierung**: Docker  
  → Das komplette Backend wird als Docker-Image auf HF Space ausgeführt


## 🧩 Features

- **Bildgenerierung**  
  → Nutzung eines großen KI-Modells zur Bildgenerierung (z. B. Stable Diffusion)  
  → Aufgrund hoher RAM-Anforderungen und Limitierungen des Render Free Tiers wird dieses Feature auf Hugging Face Spaces gehostet.

- **Bildbeschreibung (Image-to-Text)**  
  → Ein schneller KI-Dienst analysiert Bilder und generiert beschreibende Texte.

- **Textzusammenfassung (z. B. für Nachrichtenartikel)**  
  → Längere Texte lassen sich automatisch vereinfachen und zusammenfassen.


## 🚀 Deployment-Entscheidungen

- Das Backend wurde auf **Hugging Face Spaces** gehostet, da dort kostenlose GPU-Ressourcen zur Verfügung stehen – im Gegensatz zu Render, wo die kostenfreie Stufe keine ausreichenden Ressourcen für Bildgenerierung bietet.


- **Wartezeit bei Bildgenerierung**:  
  Da Hugging Face Spaces im kostenlosen Plan nur begrenzte Ressourcen bereitstellt, war es wichtig, ein Modell zu wählen, das auch unter diesen Bedingungen **stabil läuft** und eine **geringe RAM-Nutzung** aufweist.  
  Das Modell [`stabilityai/sd-turbo`](https://huggingface.co/stabilityai/sd-turbo) erfüllt diese Anforderungen gut – auch wenn die Bildqualität etwas geringer ist als bei größeren Modellen, eignet es sich hervorragend für das ressourcenschonende Hosting auf Hugging Face.  
  Ein Nachteil: Aufgrund der automatischen Warteschlange (Queue) bei GPU-Spaces im Free Tier kann die Bildgenerierung **5 bis 10 Minuten dauern**, bis das Ergebnis vorliegt.

- **Textbasierte Features** (Bildbeschreibung, Zusammenfassung) sind schnell und zuverlässig.

## 📎 Demo / Links
- **Frontend (Render)**: [https://simplifyme-frontend.onrender.com](https://simplifyme-frontend.onrender.com)  
- **Backend (HF Space)**: [https://huggingface.co/spaces/KingOtter-Chun/SimplifyMe-Backend](https://huggingface.co/spaces/KingOtter-Chun/SimplifyMe-Backend)

## 📚 Ausblick

In Zukunft plane ich, die Funktionalität von SimplifyMe weiter auszubauen:

- Integration zusätzlicher KI-Modelle für weitere Anwendungsfälle (z. B. Text-zu-Audio, Chatfunktionen)
- Benutzeroberfläche weiter verbessern und personalisierbar machen
- Alternativen zu Hugging Face als Hosting-Plattform prüfen (z. B. Modal, Replicate, AWS, eigene Server)
