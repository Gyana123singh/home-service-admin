# Project Structure Documentation

## Directory Structure

```
src/
├── components/          # Reusable React components
│   ├── common/         # Common UI components (StatCard, WelcomeCard, etc.)
│   ├── layout/         # Layout components (Sidebar, Header)
│   └── index.js        # Barrel exports
├── pages/              # Page components (full page views)
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── index.js
├── context/            # React Context for state management
│   └── AuthContext.jsx # Authentication context
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Auth hook
│   └── index.js
├── constants/          # App constants
│   ├── menuItems.js    # Menu configuration
│   ├── urls.js         # API endpoints and URLs
│   └── index.js
├── utils/              # Utility functions
│   ├── helpers.js      # Helper functions
│   └── index.js
├── types/              # TypeScript types (if using TS)
├── styles/             # Global styles
├── App.jsx             # Root App component
├── main.jsx            # Entry point
└── index.css           # Global CSS
```

## Key Features

### AuthContext

- Global authentication state management
- Login/logout functionality
- User data persistence via localStorage

### Custom Hooks

- `useAuth()`: Access authentication context

### Component Organization

- **Layout Components**: Sidebar, Header
- **Common Components**: StatCard, WelcomeCard, ChartPlaceholder
- **Page Components**: Dashboard, Login (full page views)

### Constants & Configuration

- Centralized menu items configuration
- Image URLs and API endpoints
- Easy to update and maintain

### Utilities

- Helper functions for validation and formatting
- Reusable utility functions

## How to Use

### Adding a New Component

1. Create in `components/[category]/ComponentName.jsx`
2. Export from index file
3. Import and use in pages

### Adding a New Page

1. Create in `pages/PageName.jsx`
2. Export from `pages/index.js`
3. Add to routing logic in `App.jsx`

### Adding Constants

1. Create in `constants/fileName.js`
2. Export from `constants/index.js`
3. Import from `@constants` or `./constants`

### Using Custom Hooks

```javascript
import { useAuth } from "@hooks";

function MyComponent() {
  const { isLoggedIn, login, logout } = useAuth();
  // Use hook...
}
```

## Best Practices

1. **Component Organization**: Keep components focused and reusable
2. **Naming Conventions**: Use PascalCase for components, camelCase for functions
3. **File Organization**: Group related files together
4. **Index Exports**: Use barrel exports (index.js) for clean imports
5. **Constants**: Centralize all magic strings and configurations
6. **State Management**: Use Context API for global state, useState for local state

## Environment Variables

Copy `.env.example` to `.env.local` and update values:

```bash
VITE_API_BASE_URL=your_api_url
VITE_APP_NAME=eDemand Admin
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```
