import { useState } from "react";
import { MemberInputPanel } from "@/components/MemberInputPanel";
import { BBSTable } from "@/components/BBSTable";
import { TeamInfoCard } from "@/components/TeamInfoCard";
import { BBSEntry, MemberInput } from "@/types/bbs";
import { calculateCuttingLength, calculateTotalWeight } from "@/utils/bbsCalculations";
import { Ruler } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [bbsEntries, setBbsEntries] = useState<BBSEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<(MemberInput & { serialNo: number }) | null>(null);

  const getDimensionsFromInput = (input: MemberInput) => {
    switch (input.barShape) {
      case "straight":
        return { A: input.length };
      case "l-bar":
        return { A: input.length, B: input.depth };
      case "u-bar":
        return { A: input.depth, B: input.width };
      case "rectangular-stirrup":
        return { A: input.width, B: input.depth };
      case "circular-hoop":
        return { A: (input.width || 0) / 2 };
      case "crank":
        return { A: input.length, B: input.crankDepth };
      default:
        return {};
    }
  };

  const handleCalculate = (input: MemberInput) => {
    const cuttingLength = calculateCuttingLength(input);
    const totalLength = (cuttingLength * input.numberOfBars) / 1000;
    const weight = calculateTotalWeight(cuttingLength, input.numberOfBars, input.diameter);

    if (editingEntry) {
      // Update existing entry
      const updatedEntries = bbsEntries.map(entry =>
        entry.serialNo === editingEntry.serialNo
          ? {
              ...entry,
              member: input.memberType,
              barMark: `${input.memberType.charAt(0).toUpperCase()}${entry.serialNo}`,
              shape: input.barShape,
              diameter: input.diameter,
              cuttingLength,
              numberOfBars: input.numberOfBars,
              totalLength,
              weight,
              remarks: `${input.memberType} - ${input.barShape}`,
              dimensions: getDimensionsFromInput(input),
            }
          : entry
      );
      setBbsEntries(updatedEntries);
      setEditingEntry(null);
      toast.success("Entry updated successfully!");
    } else {
      // Add new entry
      const newEntry: BBSEntry = {
        serialNo: bbsEntries.length + 1,
        member: input.memberType,
        barMark: `${input.memberType.charAt(0).toUpperCase()}${bbsEntries.length + 1}`,
        shape: input.barShape,
        diameter: input.diameter,
        cuttingLength,
        numberOfBars: input.numberOfBars,
        totalLength,
        weight,
        remarks: `${input.memberType} - ${input.barShape}`,
        dimensions: getDimensionsFromInput(input),
      };
      setBbsEntries([...bbsEntries, newEntry]);
      toast.success("Entry added successfully!");
    }
  };

  const handleEdit = (entry: BBSEntry) => {
    const editInput: MemberInput & { serialNo: number } = {
      serialNo: entry.serialNo,
      memberType: entry.member,
      barShape: entry.shape,
      diameter: entry.diameter,
      numberOfBars: entry.numberOfBars,
      cover: 25,
      length: entry.dimensions?.A || 3000,
      width: entry.dimensions?.B || 300,
      depth: entry.dimensions?.B || 450,
      stirrupSpacing: 150,
      height: entry.dimensions?.A || 3000,
      tiesSpacing: 200,
      span: entry.dimensions?.A || 3000,
      barSpacing: 150,
      crankDepth: entry.dimensions?.B || 150,
      breadth: entry.dimensions?.B || 1500,
      legProjection: 200,
    };
    setEditingEntry(editInput);
    toast.info("Edit mode activated. Update values and click Calculate.");
  };

  const handleDelete = (serialNo: number) => {
    const updatedEntries = bbsEntries
      .filter(entry => entry.serialNo !== serialNo)
      .map((entry, index) => ({ ...entry, serialNo: index + 1 }));
    setBbsEntries(updatedEntries);
    toast.success("Entry deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-panel">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-engineering rounded-lg">
              <Ruler className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bar Bending Schedule Calculator</h1>
              <p className="text-sm text-muted-foreground">IS 2502 Compliant | Structural Member-Based BBS Generation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Team Info Card */}
      <div className="container mx-auto px-4 pt-6">
        <TeamInfoCard />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Left Panel - Input */}
          <div className="lg:col-span-1">
            <MemberInputPanel onCalculate={handleCalculate} editingEntry={editingEntry} />
          </div>

          {/* Right Panel - BBS Table */}
          <div className="lg:col-span-2">
            <BBSTable entries={bbsEntries} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>
      </main>

      {/* Footer - Fixed at bottom */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-sm text-muted-foreground">
            Built with IS 2502 & IS 1786 Standards | Powered by React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;