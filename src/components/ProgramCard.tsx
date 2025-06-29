
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Program } from '@/types/Program';
import { ExternalLinkIcon, TrashIcon } from 'lucide-react';

interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  onSelect: (programId: string, selected: boolean) => void;
  onDelete: (programId: string) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  isSelected,
  onSelect,
  onDelete,
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(program.id, checked as boolean)}
            />
            <Badge variant="secondary" className="text-xs">
              {program.academicField}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(program.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <CardTitle className="text-lg leading-tight">
          {program.programName}
        </CardTitle>
        
        <div className="text-sm text-muted-foreground">
          <div className="font-medium">{program.universityName}</div>
          {program.universityLocation && (
            <div>{program.universityLocation}</div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {program.universityOverallRanking && (
            <div>
              <span className="font-medium">Overall Rank:</span> #{program.universityOverallRanking}
            </div>
          )}
          {program.universitySubjectRanking && (
            <div>
              <span className="font-medium">Subject Rank:</span> #{program.universitySubjectRanking}
            </div>
          )}
          {program.programDuration && (
            <div>
              <span className="font-medium">Duration:</span> {program.programDuration}
            </div>
          )}
          {program.totalCredits > 0 && (
            <div>
              <span className="font-medium">Credits:</span> {program.totalCredits}
            </div>
          )}
        </div>
        
        {program.annualTuitionFee > 0 && (
          <div className="text-lg font-semibold text-blue-600">
            ${program.annualTuitionFee.toLocaleString()}/year
          </div>
        )}
        
        {program.admissionRequirements && (
          <div className="text-sm">
            <span className="font-medium">Requirements:</span>
            <p className="text-muted-foreground mt-1 line-clamp-3">
              {program.admissionRequirements}
            </p>
          </div>
        )}
        
        {program.programLink && (
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href={program.programLink} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="h-4 w-4 mr-2" />
              View Program
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
