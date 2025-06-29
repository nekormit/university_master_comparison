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

const formatAdmissionRequirements = (requirements: string | null) => {
  if (!requirements) return 'N/A';
  
  // Split by common delimiters and filter out empty strings
  const items = requirements
    .split(/[•\n\r-]/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  if (items.length <= 1) {
    return requirements;
  }
  
  return (
    <ul className="list-disc list-inside space-y-1">
      {items.map((item, index) => (
        <li key={index} className="text-sm">{item}</li>
      ))}
    </ul>
  );
};

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
                      {program.academic_field}
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
                    <div className="font-medium">{program.program_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {program.university_name}
                    </div>
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Location</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.university_location || 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Overall Ranking</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.university_overall_ranking ? `#${program.university_overall_ranking}` : 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Subject Ranking</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.university_subject_ranking ? `#${program.university_subject_ranking}` : 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Duration</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.program_duration || 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Credits</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.total_credits || 'N/A'}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-2 font-medium">Annual Tuition</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    <div className="font-semibold text-blue-600">
                      {program.annual_tuition_fee > 0 
                        ? `$${program.annual_tuition_fee.toLocaleString()}` 
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
                      {formatAdmissionRequirements(program.admission_requirements)}
                    </div>
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className="p-2 font-medium">Program Link</td>
                {programs.map((program) => (
                  <td key={program.id} className="p-2">
                    {program.program_link ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={program.program_link} target="_blank" rel="noopener noreferrer">
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
