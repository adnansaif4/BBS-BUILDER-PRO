import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarShapePreview } from "./BarShapePreview";
import { MemberType, BarShape, MemberInput } from "@/types/bbs";
import { getDefaultBarShape } from "@/utils/bbsCalculations";
import { Calculator, Info } from "lucide-react";

interface MemberInputPanelProps {
  onCalculate: (input: MemberInput) => void;
  editingEntry?: (MemberInput & { serialNo: number }) | null;
}

const memberTypes: { value: MemberType; label: string }[] = [
  { value: "beam", label: "Beam" },
  { value: "column", label: "Column" },
  { value: "slab", label: "Slab" },
  { value: "footing", label: "Footing" },
  { value: "foundation", label: "Foundation" },
  { value: "staircase", label: "Staircase" },
  { value: "retaining-wall", label: "Retaining Wall" },
  { value: "others", label: "Others" },
];

const barShapes: { value: BarShape; label: string }[] = [
  { value: "straight", label: "Straight Bar" },
  { value: "l-bar", label: "L-Bar" },
  { value: "u-bar", label: "U-Bar" },
  { value: "crank", label: "Crank/Bent-up Bar" },
  { value: "rectangular-stirrup", label: "Rectangular Stirrup" },
  { value: "circular-hoop", label: "Circular Hoop" },
  { value: "custom", label: "Custom Shape" },
];

const standardDiameters = [6, 8, 10, 12, 16, 20, 25, 32];

const fieldTooltips: Record<string, string> = {
  memberType: "Select the structural member type for automatic bar shape suggestion",
  barShape: "Choose bar shape as per IS 2502 standard",
  diameter: "Standard reinforcement bar diameter in millimeters",
  numberOfBars: "Total number of bars required for this member",
  cover: "Concrete cover to reinforcement (as per IS 456)",
  length: "Length of the member",
  width: "Width/breadth of the member",
  depth: "Depth/height of the member",
  stirrupSpacing: "Center-to-center spacing between stirrups",
  height: "Total height of the column",
  tiesSpacing: "Center-to-center spacing between ties",
  span: "Clear span of the slab",
  barSpacing: "Center-to-center spacing between reinforcement bars",
  crankDepth: "Depth of crank/bent-up portion",
  breadth: "Breadth of footing",
  legProjection: "Projection length of the leg"
};

export const MemberInputPanel = ({ onCalculate, editingEntry }: MemberInputPanelProps) => {
  const [memberType, setMemberType] = useState<MemberType>("beam");
  const [barShape, setBarShape] = useState<BarShape>("rectangular-stirrup");
  const [diameter, setDiameter] = useState<number>(12);
  const [numberOfBars, setNumberOfBars] = useState<number>(1);
  const [cover, setCover] = useState<number>(25);
  
  // Member-specific fields with units
  const [length, setLength] = useState<number>(3000);
  const [lengthUnit, setLengthUnit] = useState<string>("mm");
  const [width, setWidth] = useState<number>(300);
  const [widthUnit, setWidthUnit] = useState<string>("mm");
  const [depth, setDepth] = useState<number>(450);
  const [depthUnit, setDepthUnit] = useState<string>("mm");
  const [stirrupSpacing, setStirrupSpacing] = useState<number>(150);
  const [stirrupSpacingUnit, setStirrupSpacingUnit] = useState<string>("mm");
  const [height, setHeight] = useState<number>(3000);
  const [heightUnit, setHeightUnit] = useState<string>("mm");
  const [tiesSpacing, setTiesSpacing] = useState<number>(200);
  const [tiesSpacingUnit, setTiesSpacingUnit] = useState<string>("mm");
  const [span, setSpan] = useState<number>(3000);
  const [spanUnit, setSpanUnit] = useState<string>("mm");
  const [barSpacing, setBarSpacing] = useState<number>(150);
  const [barSpacingUnit, setBarSpacingUnit] = useState<string>("mm");
  const [crankDepth, setCrankDepth] = useState<number>(150);
  const [crankDepthUnit, setCrankDepthUnit] = useState<string>("mm");
  const [breadth, setBreadth] = useState<number>(1500);
  const [breadthUnit, setBreadthUnit] = useState<string>("mm");
  const [legProjection, setLegProjection] = useState<number>(200);
  const [legProjectionUnit, setLegProjectionUnit] = useState<string>("mm");

  useEffect(() => {
    const defaultShape = getDefaultBarShape(memberType);
    setBarShape(defaultShape);
  }, [memberType]);

  useEffect(() => {
    if (editingEntry) {
      setMemberType(editingEntry.memberType);
      setBarShape(editingEntry.barShape);
      setDiameter(editingEntry.diameter);
      setNumberOfBars(editingEntry.numberOfBars);
      setCover(editingEntry.cover);
      setLength(editingEntry.length || 3000);
      setWidth(editingEntry.width || 300);
      setDepth(editingEntry.depth || 450);
      setStirrupSpacing(editingEntry.stirrupSpacing || 150);
      setHeight(editingEntry.height || 3000);
      setTiesSpacing(editingEntry.tiesSpacing || 200);
      setSpan(editingEntry.span || 3000);
      setBarSpacing(editingEntry.barSpacing || 150);
      setCrankDepth(editingEntry.crankDepth || 150);
      setBreadth(editingEntry.breadth || 1500);
      setLegProjection(editingEntry.legProjection || 200);
    }
  }, [editingEntry]);

  const convertToMillimeters = (value: number, unit: string): number => {
    switch (unit) {
      case "cm":
        return value * 10;
      case "m":
        return value * 1000;
      default:
        return value;
    }
  };

  const handleCalculate = () => {
    const input: MemberInput = {
      memberType,
      barShape,
      diameter,
      numberOfBars,
      cover: convertToMillimeters(cover, "mm"),
      length: convertToMillimeters(length, lengthUnit),
      width: convertToMillimeters(width, widthUnit),
      depth: convertToMillimeters(depth, depthUnit),
      stirrupSpacing: convertToMillimeters(stirrupSpacing, stirrupSpacingUnit),
      height: convertToMillimeters(height, heightUnit),
      tiesSpacing: convertToMillimeters(tiesSpacing, tiesSpacingUnit),
      span: convertToMillimeters(span, spanUnit),
      barSpacing: convertToMillimeters(barSpacing, barSpacingUnit),
      crankDepth: convertToMillimeters(crankDepth, crankDepthUnit),
      breadth: convertToMillimeters(breadth, breadthUnit),
      legProjection: convertToMillimeters(legProjection, legProjectionUnit),
    };
    onCalculate(input);
  };

  const renderFieldWithUnit = (
    label: string,
    id: string,
    value: number,
    onChange: (val: number) => void,
    unit: string,
    onUnitChange: (unit: string) => void,
    tooltip: string
  ) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-input flex-1"
        />
        <Select value={unit} onValueChange={onUnitChange}>
          <SelectTrigger className="w-20 bg-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="mm">mm</SelectItem>
            <SelectItem value="cm">cm</SelectItem>
            <SelectItem value="m">m</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderNumberField = (
    label: string,
    id: string,
    value: number,
    onChange: (val: number) => void,
    tooltip: string
  ) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-input"
      />
    </div>
  );

  const renderMemberSpecificFields = () => {
    switch (memberType) {
      case "beam":
        return (
          <>
            {renderFieldWithUnit("Length", "length", length, setLength, lengthUnit, setLengthUnit, fieldTooltips.length)}
            {renderFieldWithUnit("Width", "width", width, setWidth, widthUnit, setWidthUnit, fieldTooltips.width)}
            {renderFieldWithUnit("Depth", "depth", depth, setDepth, depthUnit, setDepthUnit, fieldTooltips.depth)}
            {renderFieldWithUnit("Stirrup Spacing", "stirrupSpacing", stirrupSpacing, setStirrupSpacing, stirrupSpacingUnit, setStirrupSpacingUnit, fieldTooltips.stirrupSpacing)}
          </>
        );
      
      case "column":
        return (
          <>
            {renderFieldWithUnit("Height", "height", height, setHeight, heightUnit, setHeightUnit, fieldTooltips.height)}
            {renderFieldWithUnit("Width", "width", width, setWidth, widthUnit, setWidthUnit, fieldTooltips.width)}
            {renderFieldWithUnit("Depth", "depth", depth, setDepth, depthUnit, setDepthUnit, fieldTooltips.depth)}
            {renderFieldWithUnit("Ties Spacing", "tiesSpacing", tiesSpacing, setTiesSpacing, tiesSpacingUnit, setTiesSpacingUnit, fieldTooltips.tiesSpacing)}
          </>
        );
      
      case "slab":
        return (
          <>
            {renderFieldWithUnit("Span", "span", span, setSpan, spanUnit, setSpanUnit, fieldTooltips.span)}
            {renderFieldWithUnit("Bar Spacing", "barSpacing", barSpacing, setBarSpacing, barSpacingUnit, setBarSpacingUnit, fieldTooltips.barSpacing)}
            {renderFieldWithUnit("Crank Depth", "crankDepth", crankDepth, setCrankDepth, crankDepthUnit, setCrankDepthUnit, fieldTooltips.crankDepth)}
          </>
        );
      
      case "footing":
        return (
          <>
            {renderFieldWithUnit("Length", "length", length, setLength, lengthUnit, setLengthUnit, fieldTooltips.length)}
            {renderFieldWithUnit("Breadth", "breadth", breadth, setBreadth, breadthUnit, setBreadthUnit, fieldTooltips.breadth)}
            {renderFieldWithUnit("Depth", "depth", depth, setDepth, depthUnit, setDepthUnit, fieldTooltips.depth)}
            {renderFieldWithUnit("Leg Projection", "legProjection", legProjection, setLegProjection, legProjectionUnit, setLegProjectionUnit, fieldTooltips.legProjection)}
          </>
        );
      
      default:
        return renderFieldWithUnit("Length", "length", length, setLength, lengthUnit, setLengthUnit, fieldTooltips.length);
    }
  };

  const getDimensions = () => {
    switch (barShape) {
      case "straight":
        return { A: length };
      case "l-bar":
        return { A: length, B: depth };
      case "u-bar":
        return { A: depth, B: width };
      case "rectangular-stirrup":
        return { A: width, B: depth };
      case "circular-hoop":
        return { A: width / 2 };
      case "crank":
        return { A: length, B: crankDepth };
      default:
        return {};
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6 h-full overflow-y-auto">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
          {editingEntry ? "Edit Entry" : "Member Input"}
        </h2>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="memberType">Member Type</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{fieldTooltips.memberType}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={memberType} onValueChange={(value) => setMemberType(value as MemberType)}>
            <SelectTrigger id="memberType" className="bg-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {memberTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="barShape">Bar Shape (IS 2502)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{fieldTooltips.barShape}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={barShape} onValueChange={(value) => setBarShape(value as BarShape)}>
            <SelectTrigger id="barShape" className="bg-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {barShapes.map((shape) => (
                <SelectItem key={shape.value} value={shape.value}>
                  {shape.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <BarShapePreview shape={barShape} dimensions={getDimensions()} />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="diameter">Bar Diameter</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{fieldTooltips.diameter}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={diameter.toString()} onValueChange={(value) => setDiameter(Number(value))}>
            <SelectTrigger id="diameter" className="bg-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {standardDiameters.map((dia) => (
                <SelectItem key={dia} value={dia.toString()}>
                  {dia} mm
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {renderNumberField("Number of Bars", "numberOfBars", numberOfBars, setNumberOfBars, fieldTooltips.numberOfBars)}
        {renderFieldWithUnit("Cover", "cover", cover, setCover, "mm", () => {}, fieldTooltips.cover)}

        {renderMemberSpecificFields()}

        <Button 
          onClick={handleCalculate} 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Calculator className="mr-2 h-4 w-4" />
          {editingEntry ? "Update Entry" : "Calculate BBS"}
        </Button>
      </div>
    </div>
  );
};