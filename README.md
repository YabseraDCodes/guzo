# GUZO — Discover Ethiopia 🇪🇹

**GUZO** is a tourism website designed to showcase Ethiopia's rich cultural heritage, breathtaking landscapes, historical landmarks, and unique travel experiences. The platform helps visitors explore destinations across Ethiopia and discover tours that bring the country's beauty and history to life.

The name _GUZO_ evokes the idea of a journey, making it a fitting identity for a platform dedicated to exploring Ethiopia.

## 🌍 Project Overview

GUZO aims to provide visitors with an engaging and visually appealing way to discover Ethiopia as a travel destination. The website features destination information, curated tours, and a responsive interface designed to make exploring the country easier.

## ✨ Features

- **Homepage:** Introduces GUZO and highlights Ethiopia as a travel destination.
- **Destinations:** Showcases destinations in Ethiopia, including their descriptions, attractions, and images.
- **Tours:** Presents tours and travel experiences available to visitors.
- **Destination Details:** Provides more information about individual destinations.
- **Tour Details:** Allows visitors to explore individual tour experiences.
- **Responsive Design:** Adapts the website layout to different screen sizes.
- **Reusable Components:** Uses shared components, including the header and footer, to maintain a consistent design.
- **Ethiopian Identity:** Incorporates visual elements and cultural references that celebrate Ethiopia.

## 🛠️ Technologies Used

- **Next.js** — React framework for building the website.
- **React** — Component-based user interface development.
- **TypeScript** — Type safety and improved code maintainability.
- **CSS** — Styling, responsive layouts, and the GUZO design system.
- **Git & GitHub** — Version control and team collaboration.
- **npm** — Package management and development scripts.

## 📁 Project Structure

The project follows a Next.js App Router structure. The main directories include:

```text
guzo/
├── public/                  # Static assets, such as images
├── src/
│   └── app/
│       ├── components/      # Shared components
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       ├── destinations/    # Destination pages and details
│       ├── tours/           # Tour pages and details
│       ├── globals.css      # Global styles and design system
│       ├── layout.tsx       # Root layout
│       └── page.tsx         # Homepage
├── package.json
├── package-lock.json
└── README.md
```

_Note: This is an overview of the main structure. Exact filenames and directories may vary as the project develops._

## 🚀 Getting Started

Follow these steps to run GUZO on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- Git

### 1. Clone the Repository

Replace `<repository-url>` with the GitHub URL for the project.

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd guzo
```

Use the actual repository folder name if it differs.

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Website

Visit:

```text
http://localhost:3000
```

The website should now be running locally.

## 💻 Development

To create a production build, run:

```bash
npm run build
```

To start the production server after building, run:

```bash
npm run start
```

## 🤝 Team Collaboration

GUZO is developed using Git and GitHub to support collaboration among team members.

Recommended workflow:

1. Pull the latest changes from the main branch.
2. Create a separate branch for your work.
3. Make changes and test them locally.
4. Commit your changes with a descriptive message.
5. Push your branch to GitHub.
6. Open a pull request for review before merging into the main branch.

Example:

```bash
git switch main
git pull origin main
git switch -c your-branch-name
```

After making changes:

```bash
git add .
git commit -m "Describe your changes"
git push -u origin your-branch-name
```

## 🎯 Project Goal

The goal of GUZO is to promote Ethiopia as a travel destination by making its remarkable places, cultural heritage, and travel experiences easier to discover through a modern and accessible website.

## 📌 Project Status

**Status:** In Development

The website is actively being developed, with ongoing improvements to its pages, styling, components, and overall user experience.

## 👥 Contributors

Built collaboratively by the GUZO project team.

Contributors can be recognized through their contributions to the project repository on GitHub.

---

**GUZO — Your journey into Ethiopia begins here. 🇪🇹**
