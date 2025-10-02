import { Card } from "@/components/ui/card";
import { Users, GraduationCap } from "lucide-react";

export const TeamInfoCard = () => {
  const teamMembers = [
    "ADNAN SHAIKH",
    "SAMEER AHAMAD PALA",
    "JAY DESHMUKH",
    "HRISHIKESH KULKARNI"
  ];

  return (
    <Card className="bg-gradient-engineering border-border p-4 mb-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Project Team</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Users className="h-3 w-3 text-engineering-cyan" />
              <span className="text-foreground font-medium">{index + 1}. {member}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-2 space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="text-primary font-semibold">Under Guidance of:</span>
            Prof. Santosh.S.Thorat
          </p>
          <p className="text-xs text-muted-foreground italic">
            Semester - V (Civil) | Bharati Vidyapeeth College of Engineering, Pune
          </p>
        </div>
      </div>
    </Card>
  );
};
