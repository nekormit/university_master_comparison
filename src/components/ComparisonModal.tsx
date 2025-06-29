
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Program } from '@/types/Program';
import { ExternalLinkIcon } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  programs: Program[];
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  programs,
}) => {
  if (programs.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Program Comparison ({programs.length} programs)</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Field</th>
                {programs.map((program) => (
                  <th key={program.id} className="text-left p-2 min-w-[200px]">
                    <Badge variant="secondary" className="mb-2">
                      {program.academicField}
                    </Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-medium">Program Name</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    <div className="font-medium">{program.programName}</div>
                    <div className="text-sm text-muted-foreground">
                      {program.universityName}
                    </div>
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Location</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.universityLocation || 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Overall Ranking</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.universityOverallRanking ? `#${program.universityOverallRanking}` : 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Subject Ranking</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.universitySubjectRanking ? `#${program.universitySubjectRanking}` : 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Duration</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.programDuration || 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Credits</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.totalCredits || 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Annual Tuition</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    <div className="font-semibold text-blue-600">
                      {program.annualTuitionFee > 0 
                        ? `$${program.annualTuitionFee.toLocaleString()}` 
                        : 'N/A'
                      }
                    </div>
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Admission Requirements</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    <div className="text-sm max-w-xs">
                      {program.admissionRequirements || 'N/A'}
                    </div>
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className="p-2 font-medium">Program Link</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.programLink ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={program.programLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="h-4 w-4 mr-2" />
                          View
                        </a>
                      </Button>
                    ) : (
                      'N/A'
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
