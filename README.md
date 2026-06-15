# 🌦️ Glassmorphic Weather Dashboard

A premium, modern, and responsive Weather Dashboard built with React, Vite, and custom CSS. It features a stunning glassmorphic user interface, smooth animations, and integrates directly with the Open-Meteo APIs for real-time weather information and geocoding lookup.

🌐 **[View Live Demo](https://anurag-snippet.github.io/Weather_App/)**

![Dashboard Preview](https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80)

## ✨ Features

- **🔍 Smart City Lookup:** Resolves city names globally using the Open-Meteo Geocoding API to retrieve coordinates instantly.
- **🌡️ Real-Time Forecasts:** Fetches accurate, up-to-date weather data including temperature, wind speed, wind direction, and local time.
- **💎 Premium Glassmorphic UI:** Built with backdrop-filter blur effects, harmonized styling, and modern typography (using Inter).
- **🌧️ Animated Environment:** Features a subtle, custom-animated rain overlay effect that gives the dashboard a tactile, dynamic atmosphere.
- **📱 Fully Responsive:** Crafted using mobile-first grid and flexbox layouts to ensure a flawless experience on smartphones, tablets, and desktops.
- **⚡ Smooth State Transitions:**
  - Dynamic loading spinners during data fetching.
  - Graceful error states handling invalid search inputs or offline connectivity.
  - Preloaded defaults (e.g., *Varanasi*) so the app displays information immediately upon loading.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React](https://react.dev/) (v18)
- **Build Tool:** [Vite](https://vitejs.dev/) (fast HMR)
- **Styling:** Custom Vanilla CSS (Variables, keyframe animations, glassmorphism, responsive grid)
- **Weather API:** [Open-Meteo Forecast API](https://open-meteo.com/)
- **Geocoding API:** [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### Installation & Run

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Anurag-snippet/Weather_App.git
   cd Weather_App
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Click the local URL shown in your terminal (typically `http://localhost:5173`) to view the application.

---

## 📁 Project Structure

```text
├── index.html          # Entry HTML template
├── package.json        # Project manifest & dependencies
├── src/
│   ├── main.jsx        # App entry point (ReactDOM mount)
│   ├── App.jsx         # Core application logic & component structure
│   └── styles.css      # Core design system & custom animations
└── README.md           # Project documentation
```

---

## 🔗 Live Demo

The application is deployed on GitHub Pages. You can access the live dashboard here:
👉 **[Live Weather Dashboard](https://anurag-snippet.github.io/Weather_App/)**

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
