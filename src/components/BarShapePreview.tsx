import { BarShape } from "@/types/bbs";

interface BarShapePreviewProps {
  shape: BarShape;
  dimensions?: {
    A?: number;
    B?: number;
    C?: number;
    D?: number;
  };
}

export const BarShapePreview = ({ shape, dimensions = {} }: BarShapePreviewProps) => {
  const renderShape = () => {
    switch (shape) {
      case "straight":
        return (
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Main bar with thickness */}
            <rect x="20" y="45" width="160" height="10" fill="hsl(var(--muted-foreground))" stroke="currentColor" strokeWidth="2" rx="2" />
            {/* Dimension line */}
            <line x1="20" y1="70" x2="180" y2="70" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arrow-straight)" markerStart="url(#arrow-straight)" />
            <text x="100" y="88" fill="currentColor" fontSize="11" textAnchor="middle" fontWeight="600">
              L = {dimensions.A || "L"} mm
            </text>
            <defs>
              <marker id="arrow-straight" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
          </svg>
        );

      case "l-bar":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* L-bar with 3D effect */}
            <path d="M 35 160 L 35 60 L 45 65 L 45 155 Z" fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 35 60 L 160 60 L 155 65 L 45 65 Z" fill="hsl(var(--muted-foreground))" stroke="currentColor" strokeWidth="1.5" />
            <rect x="35" y="155" width="10" height="5" fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="1.5" />
            <rect x="155" y="60" width="5" height="5" fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="1.5" />
            {/* Dimension lines */}
            <line x1="20" y1="60" x2="20" y2="160" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrow-l)" markerStart="url(#arrow-l)" />
            <line x1="35" y1="45" x2="160" y2="45" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrow-l)" markerStart="url(#arrow-l)" />
            <text x="10" y="115" fill="currentColor" fontSize="11" fontWeight="600">A={dimensions.A || "A"}</text>
            <text x="90" y="38" fill="currentColor" fontSize="11" textAnchor="middle" fontWeight="600">B={dimensions.B || "B"}</text>
            <defs>
              <marker id="arrow-l" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
          </svg>
        );

      case "u-bar":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* U-bar with 3D effect */}
            <path d="M 35 40 L 35 160 L 160 160 L 160 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 35 40 L 35 160 L 160 160 L 160 40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Dimension lines */}
            <line x1="20" y1="40" x2="20" y2="160" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrow-u)" markerStart="url(#arrow-u)" />
            <line x1="35" y1="175" x2="160" y2="175" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrow-u)" markerStart="url(#arrow-u)" />
            <text x="8" y="105" fill="currentColor" fontSize="11" fontWeight="600">L={dimensions.A || "L"}</text>
            <text x="97" y="190" fill="currentColor" fontSize="11" textAnchor="middle" fontWeight="600">W={dimensions.B || "W"}</text>
            <defs>
              <marker id="arrow-u" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
          </svg>
        );

      case "rectangular-stirrup":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Stirrup with 3D effect and hooks */}
            <rect x="50" y="40" width="100" height="120" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" rx="3" />
            <rect x="50" y="40" width="100" height="120" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" rx="3" />
            {/* 135° Hooks */}
            <path d="M 50 40 L 42 32 L 38 28" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <path d="M 50 40 L 42 32 L 38 28" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" />
            <path d="M 150 160 L 158 168 L 162 172" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <path d="M 150 160 L 158 168 L 162 172" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" />
            {/* Dimension lines */}
            <line x1="50" y1="25" x2="150" y2="25" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrow-stir)" markerStart="url(#arrow-stir)" />
            <line x1="168" y1="40" x2="168" y2="160" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrow-stir)" markerStart="url(#arrow-stir)" />
            <text x="100" y="18" fill="currentColor" fontSize="11" textAnchor="middle" fontWeight="600">W={dimensions.A || "W"}</text>
            <text x="182" y="105" fill="currentColor" fontSize="11" fontWeight="600">D={dimensions.B || "D"}</text>
            <defs>
              <marker id="arrow-stir" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
          </svg>
        );

      case "circular-hoop":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Circular hoop with 3D effect */}
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="7" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" />
            {/* 135° Hooks */}
            <path d="M 100 50 L 95 42 L 92 38" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <path d="M 100 50 L 95 42 L 92 38" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" />
            <path d="M 100 150 L 105 158 L 108 162" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <path d="M 100 150 L 105 158 L 108 162" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" />
            {/* Radius dimension */}
            <line x1="100" y1="100" x2="150" y2="100" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrow-circ)" />
            <text x="125" y="92" fill="currentColor" fontSize="11" fontWeight="600">R={dimensions.A || "R"}</text>
            <defs>
              <marker id="arrow-circ" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
          </svg>
        );

      case "crank":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Cranked bar with 3D effect */}
            <path d="M 20 160 L 60 100 L 140 100 L 180 160" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 20 160 L 60 100 L 140 100 L 180 160" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Dimension lines */}
            <line x1="60" y1="100" x2="60" y2="160" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrow-crank)" />
            <line x1="60" y1="100" x2="140" y2="100" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrow-crank)" markerStart="url(#arrow-crank)" />
            <text x="100" y="85" fill="currentColor" fontSize="11" textAnchor="middle" fontWeight="600">L={dimensions.A || "L"}</text>
            <text x="68" y="135" fill="currentColor" fontSize="11" fontWeight="600">Crank={dimensions.B || "C"}</text>
            <defs>
              <marker id="arrow-crank" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <text x="100" y="100" fill="currentColor" fontSize="14" textAnchor="middle">
              Custom Shape
            </text>
          </svg>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-2 h-full flex items-center justify-center text-foreground">
      {renderShape()}
    </div>
  );
};
