# WorldWise 🌍

WorldWise is an interactive travel tracking app built with React + Vite.
It allows users to explore a world map, log the cities and countries they’ve visited, and view trip details — all using live JSON data and API updates.

## 2. Tech Stack Used 🧰
- React
- React Context
- Vite
- React Router DOM
- Leaflet + React Leaflet
- React DatePicker
- CSS Modules
- JSON Server

## 3. Features 🚀
- 🗺️ **Interactive World Map** — Click on map locations to add new visited cities.  
- 🌐 **Live Data Updates** — Fetches city data from a local JSON file and updates it dynamically through an API.  
- 🧭 **Dynamic Routing** — Smooth page navigation (Home, Cities, Countries, Map) using React Router DOM.  
- 🧳 **City Management** — Add, view, and delete cities, including notes and visit dates.  
- 🏳️ **Country Overview** — Automatically groups visited cities by country.  
- 💾 **Persistent Data** — City data remains synced between the JSON source and API calls.  
- ⚡ **Instant UI Updates** — Real-time UI changes powered by React state management.  
- 🧱 **Modular Components** — Organized and reusable React components for scalability.  
- ✨ **Vite Dev Server** — Ultra-fast hot module reloading and build performance.

## 4. How to Run ▶️
1. Install dependencies:
```bash
npm install
```
2. Start the mock API server:
```bash
npm run server
```
3. Start the development server:
```bash
npm run dev
```
4. Open the app in your browser at:
```text
http://localhost:5173
```

## 5. Project Structure 📁
```
worldwise/
├─ data/
│  └─ cities.json
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ AppLayout.jsx
│  │  ├─ AppNav.jsx
│  │  ├─ BackButton.jsx
│  │  ├─ Button.jsx
│  │  ├─ City.jsx
│  │  ├─ CityItem.jsx
│  │  ├─ CityList.jsx
│  │  ├─ CountryItem.jsx
│  │  ├─ CountryList.jsx
│  │  ├─ Form.jsx
│  │  ├─ Logo.jsx
│  │  ├─ Map.jsx
│  │  ├─ Message.jsx
│  │  ├─ PageNav.jsx
│  │  ├─ Sidebar.jsx
│  │  ├─ Spinner.jsx
│  │  ├─ SpinnerFullPage.jsx
│  │  └─ User.jsx
│  ├─ contexts/
│  │  ├─ CitiesProvider.jsx
│  │  └─ FakeAuthContext.jsx
│  ├─ hooks/
│  │  ├─ useGeolocation.js
│  │  └─ useUrlPosition.js
│  ├─ pages/
│  │  ├─ AppLayout.jsx
│  │  ├─ HomePage.jsx
│  │  ├─ Login.jsx
│  │  ├─ PageNotFound.jsx
│  │  ├─ Pricing.jsx
│  │  └─ Product.jsx
│  ├─ utils/
│  │  └─ flagemojitoPNG.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ package.json
├─ vite.config.js
└─ README.md
```
