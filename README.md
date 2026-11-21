# 🦊 MineLisek

> **MineLisek** to interaktywna aplikacja webowa stworzona w oparciu o bibliotekę **React 19** oraz bundler **Vite**, w całości stylizowana na kultowy interfejs gry **Minecraft**. Zawiera w pełni funkcjonalne menu główne, interaktywną encyklopedię mobów ze statystykami i serduszkami życia, odtwarzacz dźwięków, panel ustawień z regulacją głośności oraz obsługę wielu języków (Polski i Angielski).

---

## 🎮 Główne Funkcjonalności

### 1. 🏰 Autentyczny Interfejs Menu Głównego (Minecraft UI)
- **Animowane tło wideo:** Płynnie zapętlona panorama 360° z Minecrafta (`panorama.mp4`).
- **Stylizowane przyciski:** Tekstury przycisków z gry z efektami najechania, kliknięcia oraz stanem wyłączenia (`disabled`).
- **Splash Text:** Żółty, dynamicznie pulsujący i obrócony napis w stylu Minecrafta z losowymi hasłami pobieranymi z pliku `splashes.json`.
- **Personalizacja gracza:** Możliwość wpisania swojego imienia/nicku prosto z menu głównego (*"Jak sie nazywasz?"* ➔ *"Witaj, [Imię]!"*), zapisywanego automatycznie w pamięci przeglądarki (`localStorage`).

---

### 2. 📖 Encyklopedia Mobów (`/mobki`)
- **Baza 88 stworzeń:** Kompletny zbiór mobów podzielonych na 4 kategorie:
  - 👑 **Bossowie** (*Ender Dragon, Wither*)
  - ⚔️ **Wrogie** (*Creeper, Warden, Breeze, Bogged, Creaking, Ghast, Parched...*)
  - 🛡️ **Neutralne** (*Enderman, Iron Golem, Spider, Bee, Nautilus, Zombie Nautilus...*)
  - 🌾 **Pasywne** (*Allay, Axolotl, Camel, Sniffer, Happy Ghast, Sulfur Cube, Copper Golem...*)
- **Wyszukiwarka w czasie rzeczywistym:** Wyszukiwanie mobów po nazwie w wybranym języku (polskim lub angielskim).
- **Paski serduszek życia:** Wizualizacja punktów zdrowia (HP) za pomocą klasycznych minecraftowych serc (obsługa pełnych serduszek, połówek oraz kontenerów z limitem wizualnym).
- **Okno szczegółów (Modal):**
  - Podgląd animacji lub grafiki moba (GIF / PNG / WebP)
  - Nazwa moba oraz kolorowa etykieta zachowania (Boss, Wrogi, Neutralny, Pasywny)
  - Dokładne statystyki: **Punkty życia (HP)**, **Siła ataku**, **Punkty doświadczenia (XP)**, **Wymiary w blokach**, **Wymiar (Overworld, Nether, The End)**
  - Informacje o miejscach spawnu / występowania
  - Lista upuszczanych przedmiotów (dropów)
  - Efekt dźwiękowy wyboru (`pop.mp3`)

---

### 3. 🔊 System Audio i Efekty Dźwiękowe
- Odtwarzanie dźwięków w formacie MP3 prosto z folderu `/public/sounds/`:
  - `button.mp3` – kliknięcie przycisków interfejsu
  - `pop.mp3` – zaznaczenie moba w encyklopedii
  - `gate_close.mp3` – dźwięk przycisku wyjścia
  - `fnafparty.mp3` – ukryty dźwięk easter egga
- **Regulacja głośności (Master Volume):** Płynny suwak w panelu opcji z opóźnionym zapisem (*debounced*) do `localStorage`, zapobiegający lagom przy przesuwaniu.

---

### 4. 🌐 Wielojęzyczność (i18n)
- Obsługa języka **polskiego (`pl`)** oraz **angielskiego (`eng`)**.
- Dedykowany ekran wyboru języka (`/jezyk`) z wyszukiwarką.
- Dynamiczne tłumaczenie wszystkich tekstów, nazw mobów, opisów, statystyk oraz elementów nawigacji.
- Zapamiętywanie wybranego języka w `localStorage`.

---

### 5. ⚙️ Zarządzanie Stanem (`AppProvider`)
- Centralny kontekst React (`useApp()`) zarządzający:
  - Aktualnym językiem aplikacji (`lang`, `isPL`)
  - Głośnością dźwięków (`volume`, `changeVolume`)
  - Odtwarzaczem audio (`playSound`)
  - Imieniem gracza (`imie`, `setImie`)

---

## 📁 Struktura Projektu

```text
MineLisek/
├── public/
│   ├── boss/                    # Grafiki bossów (Ender Dragon, Wither)
│   ├── hostile/                 # Grafiki i gify wrogich mobów
│   ├── neutral/                 # Grafiki i gify neutralnych mobów
│   ├── passive/                 # Grafiki i gify pasywnych mobów
│   ├── sounds/                  # Efekty dźwiękowe (button, pop, gate_close, fnafparty)
│   ├── favicon.png              # Favicon aplikacji
│   └── mobs.json                # Statyczna baza danych mobów (dostępna przez fetch)
├── src/
│   ├── assets/                  # Zasoby graficzne, czcionka i pliki JSON
│   │   ├── Minecraft.ttf        # Oryginalna czcionka pikselowa
│   │   ├── panorama.mp4         # Animowane tło wideo z menu
│   │   ├── mobs.json            # Kompletna baza mobów importowana bezpośrednio w React
│   │   ├── splashes.json        # Zbiór żółtych tekstów powitalnych
│   │   ├── heart.png            # Tekstura serduszka życia
│   │   ├── heartContainer.png   # Tekstura pustego kontenera na serduszko
│   │   ├── buttonBackground.png # Tło przycisku menu
│   │   └── ...                  # Pozostałe tekstury UI
│   ├── App.jsx                  # Główny routing aplikacji (React Router)
│   ├── AppProvider.jsx          # Kontekst stanu globalnego (język, dźwięk, imię)
│   ├── Button.jsx               # Komponent minecraftowego przycisku z obsługą audio
│   ├── Home.jsx                 # Widok menu głównego
│   ├── Jezyk.jsx                # Widok wyboru języka
│   ├── Logo.jsx                 # Komponent logo z napisem MineLisek
│   ├── main.jsx                 # Punkt wejściowy aplikacji (React root)
│   ├── Mobki.jsx                # Encyklopedia mobów z wyszukiwarką i modalem
│   ├── Opcje.jsx                # Panel opcji i regulacji głośności
│   ├── RandomText.jsx           # Komponent animowanego splash textu
│   ├── style.css                # Główny arkusz stylów CSS (Minecraft theme)
│   └── index.css                # Style bazowe
├── package.json                 # Konfiguracja zależności i skryptów npm
├── vite.config.js               # Konfiguracja Vite
└── README.md                    # Dokumentacja projektu
```

---

## 🛠️ Technologie i Biblioteki

- **[React 19](https://react.dev/)** – nowoczesna biblioteka do budowy interfejsów użytkownika
- **[Vite](https://vitejs.dev/)** – ultraszybki bundler i środowisko uruchomieniowe
- **[React Router DOM 7](https://reactrouter.com/)** – deklaratywny routing po stronach SPA
- **[Bootstrap 5](https://getbootstrap.com/)** & **[React-Bootstrap](https://react-bootstrap.github.io/)** – siatka layoutu (`grid`, `flex`)
- **[use-debounce](https://github.com/xnimorz/use-debounce)** – optymalizacja zapisu głośności do pamięci lokalnej
- **HTML5 Video & Web Audio API** – obsługa multimediów, panoramy i efektów dźwiękowych

---

## 🚀 Uruchomienie Projektu

### Wymagania wstępne
Upewnij się, że masz zainstalowane środowisko **[Node.js](https://nodejs.org/)** (rekomendowana wersja LTS lub nowsza).

### 1. Klonowanie lub otwarcie katalogu projektu
Przejdź do folderu z projektem w terminalu:
```bash
cd (droga do folderu)/MineLisek
```

### 2. Instalacja zależności
Zainstaluj wymagane pakiety:
```bash
npm install
```

### 3. Uruchomienie w trybie deweloperskim
Uruchom lokalny serwer developerski:
```bash
npm run dev
```
Aplikacja uruchomi się domyślnie pod adresem: `http://localhost:5173/`

### 4. Budowanie wersji produkcyjnej
Aby zbudować zoptymalizowaną paczkę produkcyjną:
```bash
npm run build
```

Możesz przetestować zbudowaną wersję za pomocą:
```bash
npm run preview
```

---

## 📜 Informacje Prawne & Autor

- **Wersja:** `MineLisek 1.0.0`
- **Copyright:** `LISEK ©. Nie dystrybutuj!`
- Elementy graficzne, dźwięki oraz czcionka nawiązują do gry **Minecraft** (własność Mojang Studios / Microsoft).
