import { BarShape, MemberInput } from "@/types/bbs";

// Unit weight per diameter in kg/m (as per IS 1786)
const unitWeights: Record<number, number> = {
  6: 0.222,
  8: 0.395,
  10: 0.617,
  12: 0.888,
  16: 1.578,
  20: 2.466,
  25: 3.854,
  32: 6.313,
};

export const getUnitWeight = (diameter: number): number => {
  return unitWeights[diameter] || (diameter * diameter * 0.00785);
};

export const calculateCuttingLength = (input: MemberInput): number => {
  const { barShape, diameter, hookLength = 0, bendAngle = 90 } = input;
  const dia = diameter;
  
  // Default hook lengths as per IS code
  const hook90 = 9 * dia;
  const hook135 = 11 * dia;
  const bendAllowance = diameter;

  switch (barShape) {
    case "straight":
      return input.length || 0;

    case "l-bar": {
      const A = input.length || 0;
      const B = input.depth || 0;
      return A + B + bendAllowance;
    }

    case "u-bar": {
      const leg = input.depth || 0;
      const width = input.width || 0;
      return 2 * leg + width + 2 * bendAllowance;
    }

    case "rectangular-stirrup": {
      const width = input.width || 0;
      const depth = input.depth || 0;
      const hooks = hookLength || hook90;
      return 2 * (width + depth) + 2 * hooks - 3 * dia;
    }

    case "circular-hoop": {
      const radius = (input.width || 0) / 2;
      const circumference = 2 * Math.PI * radius;
      const hooks = hookLength || hook90;
      return circumference + 2 * hooks;
    }

    case "crank": {
      const L = input.length || 0;
      const crankDepth = input.crankDepth || 0;
      const angleRad = (bendAngle * Math.PI) / 180;
      const crankLength = crankDepth / Math.sin(angleRad);
      return L + 2 * crankLength + 2 * bendAllowance;
    }

    default:
      return input.length || 0;
  }
};

export const calculateTotalWeight = (
  cuttingLength: number,
  numberOfBars: number,
  diameter: number
): number => {
  const lengthInMeters = cuttingLength / 1000;
  const unitWeight = getUnitWeight(diameter);
  return lengthInMeters * numberOfBars * unitWeight;
};

export const getDefaultBarShape = (memberType: string): BarShape => {
  switch (memberType) {
    case "beam":
      return "rectangular-stirrup";
    case "column":
      return "rectangular-stirrup";
    case "slab":
      return "crank";
    case "footing":
      return "l-bar";
    case "foundation":
      return "u-bar";
    case "staircase":
      return "straight";
    case "retaining-wall":
      return "l-bar";
    default:
      return "straight";
  }
};