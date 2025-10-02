import { BBSEntry } from "@/types/bbs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarShapePreview } from "./BarShapePreview";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { svg2pdf } from "svg2pdf.js";

interface BBSTableProps {
  entries: BBSEntry[];
  onEdit: (entry: BBSEntry) => void;
  onDelete: (serialNo: number) => void;
}

export const BBSTable = ({ entries, onEdit, onDelete }: BBSTableProps) => {
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  const totalLength = entries.reduce((sum, entry) => sum + entry.totalLength, 0);

  const handleExportCSV = () => {
    const headers = ["S.No", "Member", "Bar Mark", "Shape", "Dia (mm)", "Cutting Length (mm)", "No. of Bars", "Total Length (m)", "Weight (kg)", "Remarks"];
    const rows = entries.map(entry => [
      entry.serialNo,
      entry.member,
      entry.barMark,
      entry.shape,
      entry.diameter,
      entry.cuttingLength,
      entry.numberOfBars,
      entry.totalLength.toFixed(2),
      entry.weight.toFixed(2),
      entry.remarks
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bbs_report.csv";
    a.click();
    toast.success("CSV exported successfully!");
  };

  const handleExportExcel = () => {
    toast.info("Excel export with embedded shapes coming soon!");
  };

  const handleExportPDF = async () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.text("Bar Bending Schedule Report", 14, 15);
    
    // Create a temporary div to render our previews
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);

    // Table data
    const tableData = await Promise.all(entries.map(async (entry) => {
      // Render the shape preview
      const previewDiv = document.createElement('div');
      previewDiv.style.width = '80px';
      previewDiv.style.height = '60px';
      tempDiv.appendChild(previewDiv);
      
      // Create a canvas to render the SVG
      const canvas = document.createElement('canvas');
      canvas.width = 80;
      canvas.height = 60;
      previewDiv.appendChild(canvas);
      
      // Render the preview
      const preview = <BarShapePreview shape={entry.shape} dimensions={entry.dimensions} />;
      
      // Convert SVG to image data
      const svgElement = preview.props.children;
      await svg2pdf(svgElement, doc, {
        x: 0,
        y: 0,
        width: 20,
        height: 15
      });

      // Get image data URL
      const imgData = canvas.toDataURL('image/png');
      previewDiv.removeChild(canvas);
      
      return [
        entry.serialNo,
        { content: entry.member.replace("-", " "), styles: { valign: 'middle' } },
        { content: entry.barMark, styles: { fontStyle: 'bold', valign: 'middle' } },
        { content: entry.shape, styles: { valign: 'middle' } },
        { content: entry.diameter, styles: { valign: 'middle' } },
        { content: entry.cuttingLength.toFixed(0), styles: { valign: 'middle' } },
        { content: entry.numberOfBars, styles: { valign: 'middle' } },
        { content: entry.totalLength.toFixed(2), styles: { valign: 'middle' } },
        { content: entry.weight.toFixed(2), styles: { fontStyle: 'bold', valign: 'middle' } },
        { content: entry.remarks, styles: { fontSize: 7, valign: 'middle' } }
      ];
    }));

    // Clean up
    document.body.removeChild(tempDiv);

    // Add totals row
    tableData.push([
      "", "", "", "", "", "", "Total:",
      { content: totalLength.toFixed(2) + " m", styles: { fontStyle: 'bold' } },
      { content: totalWeight.toFixed(2) + " kg", styles: { fontStyle: 'bold' } },
      ""
    ]);
    
    autoTable(doc, {
      startY: 25,
      head: [["S.No", "Member", "Bar Mark", "Shape", "Dia (mm)", "Cutting Length (mm)", "No. of Bars", "Total Length (m)", "Weight (kg)", "Remarks"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [30, 144, 255] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 20 },
        2: { cellWidth: 15 },
        3: { cellWidth: 25 },
        4: { cellWidth: 15 },
        5: { cellWidth: 20 },
        6: { cellWidth: 15 },
        7: { cellWidth: 15 },
        8: { cellWidth: 15 },
        9: { cellWidth: 25 }
      }
    });
    
    doc.save("bbs_report.pdf");
    toast.success("PDF exported successfully!");
  };

  if (entries.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-lg">No BBS entries yet</p>
          <p className="text-sm text-muted-foreground">Fill in the input form and click Calculate to generate BBS</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground">Bar Bending Schedule</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <FileText className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-foreground">S.No</TableHead>
              <TableHead className="text-foreground">Member</TableHead>
              <TableHead className="text-foreground">Bar Mark</TableHead>
              <TableHead className="text-foreground w-32">Shape</TableHead>
              <TableHead className="text-foreground">Dia (mm)</TableHead>
              <TableHead className="text-foreground">Cutting Length (mm)</TableHead>
              <TableHead className="text-foreground">No. of Bars</TableHead>
              <TableHead className="text-foreground">Total Length (m)</TableHead>
              <TableHead className="text-foreground">Weight (kg)</TableHead>
              <TableHead className="text-foreground">Remarks</TableHead>
              <TableHead className="text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.serialNo} className="border-border">
                <TableCell className="font-mono">{entry.serialNo}</TableCell>
                <TableCell className="capitalize">{entry.member.replace("-", " ")}</TableCell>
                <TableCell className="font-semibold text-primary">{entry.barMark}</TableCell>
                <TableCell>
                  <div className="h-20 w-28">
                    <BarShapePreview shape={entry.shape} dimensions={entry.dimensions} />
                  </div>
                </TableCell>
                <TableCell className="font-mono">{entry.diameter}</TableCell>
                <TableCell className="font-mono">{entry.cuttingLength.toFixed(0)}</TableCell>
                <TableCell className="font-mono">{entry.numberOfBars}</TableCell>
                <TableCell className="font-mono">{entry.totalLength.toFixed(2)}</TableCell>
                <TableCell className="font-mono font-semibold">{entry.weight.toFixed(2)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{entry.remarks}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(entry)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(entry.serialNo)}
                      className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-border bg-muted/50 font-semibold">
              <TableCell colSpan={7} className="text-right">Total:</TableCell>
              <TableCell className="font-mono">{totalLength.toFixed(2)} m</TableCell>
              <TableCell className="font-mono text-primary">{totalWeight.toFixed(2)} kg</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};