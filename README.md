# Sales Dashboard

A modern sales dashboard built with React, TypeScript, Vite, and TailwindCSS.

![Sales Dashboard](./screenshot.png)

## Features

- Revenue tracking and visualization
- Sales performance analytics
- Platform-based revenue distribution
- Deal tracking and highlights
- Responsive design

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Chart.js / React-Chartjs-2
- React Icons

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://your-repository-url/weather-app.git
cd weather-app
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
weather-app/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Reusable UI components
│   ├── types/             # TypeScript interfaces
│   ├── utils/             # Utility functions and mock data
│   ├── assets/            # Images, fonts, etc.
│   ├── hooks/             # Custom React hooks
│   ├── App.tsx            # Main App component
│   ├── index.css          # Global styles (Tailwind imports)
│   └── main.tsx           # Entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js      # PostCSS configuration for Tailwind
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md
```

## Customization

To customize the dashboard:

1. Edit the mock data in `src/utils/mockData.ts`
2. Modify components in the `src/components/` directory
3. Update styles by modifying the Tailwind classes or extending the theme in `tailwind.config.js`

## License

MIT
