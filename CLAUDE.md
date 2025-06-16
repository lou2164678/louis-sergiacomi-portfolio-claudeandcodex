# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- `npm run dev` - Start development server with host binding for external access
- `npm run build` - Build for production (TypeScript compilation + Vite build to dist/)
- `npm run lint` - Run ESLint with auto-fix and TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React portfolio website built with:
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with animations
- **Routing**: React Router DOM with client-side routing
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Netlify with SPA redirects

### Project Structure
- `src/App.tsx` - Main routing configuration with Layout wrapper for all pages
- `src/components/layout/` - Shared layout components (Navbar, Footer, Layout wrapper)
- `src/components/ui/` - Reusable UI components (ThemeToggle)
- `src/pages/` - Route components (Home, About, Projects, Skills, Contact, NotFound)

### Key Implementation Details
- All routes are wrapped in the Layout component for consistent navigation/footer
- Layout uses flexbox with min-h-screen and pt-16 for fixed navbar spacing
- Netlify deployment configured with SPA fallback routing (redirects to /index.html)
- ESLint configuration includes React-specific rules and TypeScript checking
- Uses Bun for package management and build process on Netlify