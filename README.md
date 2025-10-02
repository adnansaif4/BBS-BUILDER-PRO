# BBS Calculator - Bar Bending Schedule App

## Project Overview

A professional Bar Bending Schedule Calculator with IS Code Compliance. Calculate cutting lengths, weights, and generate BBS reports for structural members.

## Technologies Used

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom engineering-themed design system
- **UI Components**: shadcn/ui library built on Radix UI primitives
- **Icons**: Lucide React
- **PDF Generation**: jsPDF with jspdf-autotable
- **Notifications**: Sonner for toast notifications

## How to Run the Application

### Prerequisites
- Node.js (version 16 or higher)
- npm or pnpm package manager

### Installation and Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The application will open at `http://localhost:5173` or `http://localhost:8080`
   - Open your web browser and navigate to the displayed URL

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
├── pages/              # Application pages
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── lib/                # Library utilities
└── index.css           # Global styles
```

## Key Features

- IS 2502 compliant BBS calculations
- Multiple structural member types (beams, columns, slabs, etc.)
- Automatic bar shape selection based on member type
- Real-time cutting length and weight calculations
- Export functionality (CSV, PDF, Excel)
- Professional engineering-themed UI
- Responsive design for all devices

## Development

This project uses modern React development practices with TypeScript for type safety and Tailwind CSS for styling. The application follows IS standards for structural engineering calculations.

## License

This project is for educational and professional use in structural engineering applications.