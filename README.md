# Employee Management System

This is a comprehensive Employee Management System built with React and Vite. It provides various portals and dashboards for different user roles (e.g., HR, Manager, Admin, Employee) to manage attendance, leave, performance, payroll, learning, and more.

## Project Structure

The project follows a component-based architecture and is organized as follows:

```
employee-management-system/
├── public/                 # Static assets that are not processed by Webpack/Vite
├── src/                    # Application source code
│   ├── assets/             # Images, fonts, and other media files
│   ├── components/         # Reusable UI components (e.g., Modals, Sections, Drawers)
│   ├── data/               # Mock data and constants used across the app for UI population
│   ├── pages/              # Full-page components representing routes (e.g., Dashboard, Leave, Performance)
│   ├── App.jsx             # Main application component and routing configuration
│   ├── App.css             # Global application styles
│   ├── index.css           # Global CSS variables and base styles
│   └── main.jsx            # Entry point for the React application
├── package.json            # Project metadata and dependencies
├── vite.config.js          # Vite configuration
└── vercel.json             # Vercel deployment configuration for client-side routing
```

### Key Directories

- **`src/pages/`**: Contains the main views for the application. Each folder typically corresponds to a specific feature or module, such as `Analytics`, `Attendance`, `Dashboard`, `Performance`, `Payroll`, and `Leave`. Most feature folders include role-specific views (e.g., `AdminLeave.jsx` vs `Leave.jsx`).
- **`src/components/`**: Houses reusable UI elements that are shared across multiple pages. This includes things like navigation components, modals, and shared section layouts.
- **`src/data/`**: Stores static mock data, constants, and configuration objects. This is useful for prototyping the UI without a live backend connection.
- **`src/assets/`**: Contains static files like images (e.g., `hero.png`) and custom fonts.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Styling**: Vanilla CSS and [Bootstrap](https://getbootstrap.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

### Building for Production

To build the app for production:

```bash
npm run build
```

## Deployment

This project includes a `vercel.json` configuration file, which automatically handles SPA (Single Page Application) routing rules when deployed on Vercel.
