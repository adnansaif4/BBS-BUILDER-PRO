# AI Development Rules - BBS Calculator App

## Tech Stack Overview

- **Framework**: React 18 with TypeScript for type-safe development
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom engineering-themed design system
- **UI Components**: shadcn/ui library built on Radix UI primitives
- **Routing**: React Router DOM v6 for client-side navigation
- **State Management**: React hooks (useState, useEffect) for local state, TanStack Query for server state when needed
- **Icons**: Lucide React for consistent iconography
- **PDF Generation**: jsPDF with jspdf-autotable for report exports
- **Notifications**: Sonner for toast notifications
- **Form Handling**: React Hook Form with Zod validation (when forms become complex)

## Library Usage Rules

### 1. UI Components
- **Primary**: Always use shadcn/ui components first
- **Custom Components**: Create new components in `src/components/` when shadcn doesn't provide needed functionality
- **Icons**: Use Lucide React icons exclusively - no other icon libraries
- **Tables**: Use shadcn Table component for all data tables

### 2. Styling Rules
- **Tailwind First**: Use Tailwind CSS classes for all styling
- **Custom Colors**: Use the engineering-themed color system defined in `index.css` (--engineering-blue, --technical-orange, etc.)
- **Responsive**: Always design mobile-first with responsive breakpoints
- **No Inline Styles**: Avoid inline styles unless absolutely necessary for dynamic calculations

### 3. State Management
- **Local State**: Use React useState/useReducer for component-level state
- **Global State**: Use React Context for app-wide state when needed
- **Server State**: Use TanStack Query for API data fetching and caching
- **Forms**: Use React Hook Form with Zod validation for complex forms

### 4. File Structure
- **Components**: Place in `src/components/` with PascalCase naming
- **Pages**: Place in `src/pages/` with PascalCase naming
- **Hooks**: Place in `src/hooks/` with useCamelCase naming
- **Utils**: Place in `src/utils/` with camelCase naming
- **Types**: Place in `src/types/` with .ts extension

### 5. Code Quality
- **TypeScript**: Strict typing for all components and functions
- **Error Handling**: Use toast notifications for user feedback
- **Performance**: Use React.memo and useCallback for expensive operations
- **Accessibility**: Follow ARIA guidelines and use shadcn's accessible components

### 6. BBS-Specific Rules
- **Calculations**: Keep all BBS calculations in `src/utils/bbsCalculations.ts`
- **Units**: Use millimeters (mm) for all dimensions, kilograms (kg) for weight
- **IS Standards**: Follow IS 2502 and IS 1786 standards in calculations
- **Export Formats**: Support CSV, PDF, and eventually Excel exports

### 7. Prohibited Patterns
- ❌ No direct DOM manipulation
- ❌ No external CSS frameworks besides Tailwind
- ❌ No state management libraries beyond React hooks and TanStack Query
- ❌ No jQuery or other legacy JavaScript libraries

### 8. Preferred Patterns
- ✅ Functional components with hooks
- ✅ Custom hooks for reusable logic
- ✅ Component composition over inheritance
- ✅ TypeScript interfaces for all props and state

## Development Workflow

1. **New Features**: Create new components in `src/components/`
2. **Styling**: Use Tailwind classes with engineering design system
3. **Testing**: Add basic error boundaries and user feedback
4. **Documentation**: Update this file when adding new patterns
5. **Performance**: Profile with React DevTools before optimizing

## Version Control

- **Commits**: Descriptive commit messages referencing features/fixes
- **Branches**: Feature branches for significant changes
- **Reviews**: Code review for major functionality changes

*Last Updated: ${new Date().toLocaleDateString()}*