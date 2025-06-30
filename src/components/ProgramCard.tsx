import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Program } from '@/types/Program';
import { ExternalLinkIcon, TrashIcon, EditIcon } from 'lucide-react';

interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  onSelect: (programId: string, selected: boolean) => void;
  onEdit: (program: Program) => void;
  onDelete: (programId: string) => void;
}

const formatAdmissionRequirements = (requirements: string | null) => {
  if (!requirements) return null;
  
  // Split by common delimiters and filter out empty strings
  // Updated regex to only split on hyphens that are at the start of lines (bullet points)
  // This prevents splitting compound words like "four-year"
  const items = requirements
    .split(/[•\n\r]|(?:^|\n)\s*-/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  if (items.length <= 1) {
    return <p className="text-muted-foreground mt-1">{requirements}</p>;
  }
  
  return (
    <ul className="text-muted-foreground mt-1 list-disc list-inside space-y-1">
      {items.map((item, index) => (
        <li key={index} className="text-sm">{item}</li>
      ))}
    </ul>
  );
};

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEditClick = () => {
    setShowEditConfirm(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmEdit = () => {
    setShowEditConfirm(false);
    onEdit(program);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    onDelete(program.id);
  };

  return (
    <>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelect(program.id, checked as boolean)}
              />
              <Badge variant="secondary" className="text-xs">
                {program.academic_field}
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditClick}
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
              >
                <EditIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteClick}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <CardTitle className="text-lg leading-tight">
            {program.program_name}
          </CardTitle>
          
          <div className="text-sm text-muted-foreground">
            <div className="font-medium">{program.university_name}</div>
            {program.university_location && (
              <div>{program.university_location}</div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {program.university_overall_ranking && (
              <div>
                <span className="font-medium">Overall Rank:</span> #{program.university_overall_ranking}
              </div>
            )}
            {program.university_subject_ranking && (
              <div>
                <span className="font-medium">Subject Rank:</span> #{program.university_subject_ranking}
              </div>
            )}
            {program.program_duration && (
              <div>
                <span className="font-medium">Duration:</span> {program.program_duration}
              </div>
            )}
            {program.total_credits > 0 && (
              <div>
                <span className="font-medium">Credits:</span> {program.total_credits}
              </div>
            )}
          </div>
          
          {program.annual_tuition_fee > 0 && (
            <div className="text-lg font-semibold text-blue-600">
              ${program.annual_tuition_fee.toLocaleString()}/year
            </div>
          )}
          
          {program.admission_requirements && (
            <div className="text-sm">
              <span className="font-medium">Requirements:</span>
              {formatAdmissionRequirements(program.admission_requirements)}
            </div>
          )}
          
          {program.program_link && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={program.program_link} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="h-4 w-4 mr-2" />
                View Program
              </a>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Edit Confirmation Dialog */}
      <AlertDialog open={showEditConfirm} onOpenChange={setShowEditConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Program</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to edit "{program.program_name}" at {program.university_name}?
              You will be able to modify all program details in the form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEdit} className="bg-blue-600 hover:bg-blue-700">
              Yes, Edit Program
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Program</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{program.program_name}" at {program.university_name}?
              <br />
              <span className="font-medium text-red-600">This action cannot be undone.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Yes, Delete Program
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
