export type MemberType = 
  | "beam" 
  | "column" 
  | "slab" 
  | "footing" 
  | "foundation"
  | "staircase"
  | "retaining-wall"
  | "others";

export type BarShape = 
  | "straight"
  | "l-bar"
  | "u-bar"
  | "crank"
  | "rectangular-stirrup"
  | "circular-hoop"
  | "custom";

export interface BarShapeConfig {
  id: BarShape;
  name: string;
  description: string;
  defaultForMembers: MemberType[];
  dimensionLabels: string[];
  svgPath: string;
}

export type UnitSystem = "metric" | "imperial";

export interface BBSEntry {
  serialNo: number;
  member: MemberType;
  barMark: string;
  shape: BarShape;
  diameter: number;
  cuttingLength: number;
  numberOfBars: number;
  totalLength: number;
  weight: number;
  remarks: string;
  dimensions?: {
    A?: number;
    B?: number;
    C?: number;
    D?: number;
  };
}

export interface MemberInput {
  memberType: MemberType;
  barShape: BarShape;
  diameter: number;
  numberOfBars: number;
  spacing?: number;
  cover: number;
  
  // Beam specific
  length?: number;
  width?: number;
  depth?: number;
  stirrupSpacing?: number;
  
  // Column specific
  height?: number;
  tiesSpacing?: number;
  
  // Slab specific
  span?: number;
  barSpacing?: number;
  crankDepth?: number;
  
  // Footing specific
  breadth?: number;
  legProjection?: number;
  
  // General
  hookLength?: number;
  bendAngle?: number;
  lapLength?: number;
}
