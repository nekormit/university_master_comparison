
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProgramFormData } from '@/types/Program';
import { toast } from 'sonner';

interface ProgramFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProgramFormData) => void;
}

export const ProgramForm: React.FC<ProgramFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProgramFormData>({
    academicField: '',
    universityName: '',
    universityLocation: '',
    universityOverallRanking: null,
    universitySubjectRanking: null,
    programName: '',
    programLink: '',
    programDuration: '',
    admissionRequirements: '',
    totalCredits: 0,
    annualTuitionFee: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.academicField || !formData.universityName || !formData.programName) {
      toast.error('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
    toast.success('Program added successfully!');
    onClose();
    
    // Reset form
    setFormData({
      academicField: '',
      universityName: '',
      universityLocation: '',
      universityOverallRanking: null,
      universitySubjectRanking: null,
      programName: '',
      programLink: '',
      programDuration: '',
      admissionRequirements: '',
      totalCredits: 0,
      annualTuitionFee: 0,
    });
  };

  const handleInputChange = (field: keyof ProgramFormData, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add University Program</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="academicField">Academic Field *</Label>
              <Input
                id="academicField"
                value={formData.academicField}
                onChange={(e) => handleInputChange('academicField', e.target.value)}
                placeholder="e.g., Computer Science"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="universityName">University Name *</Label>
              <Input
                id="universityName"
                value={formData.universityName}
                onChange={(e) => handleInputChange('universityName', e.target.value)}
                placeholder="e.g., Stanford University"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="universityLocation">University Location</Label>
              <Input
                id="universityLocation"
                value={formData.universityLocation}
                onChange={(e) => handleInputChange('universityLocation', e.target.value)}
                placeholder="e.g., Stanford, CA, USA"
              />
            </div>
            
            <div>
              <Label htmlFor="programName">Program Name *</Label>
              <Input
                id="programName"
                value={formData.programName}
                onChange={(e) => handleInputChange('programName', e.target.value)}
                placeholder="e.g., Master of Science in Computer Science"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="universityOverallRanking">University Overall Ranking</Label>
              <Input
                id="universityOverallRanking"
                type="number"
                value={formData.universityOverallRanking || ''}
                onChange={(e) => handleInputChange('universityOverallRanking', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="e.g., 5"
              />
            </div>
            
            <div>
              <Label htmlFor="universitySubjectRanking">University Subject Ranking</Label>
              <Input
                id="universitySubjectRanking"
                type="number"
                value={formData.universitySubjectRanking || ''}
                onChange={(e) => handleInputChange('universitySubjectRanking', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="e.g., 2"
              />
            </div>
            
            <div>
              <Label htmlFor="programDuration">Program Duration</Label>
              <Input
                id="programDuration"
                value={formData.programDuration}
                onChange={(e) => handleInputChange('programDuration', e.target.value)}
                placeholder="e.g., 2 years"
              />
            </div>
            
            <div>
              <Label htmlFor="totalCredits">Total Credits</Label>
              <Input
                id="totalCredits"
                type="number"
                value={formData.totalCredits}
                onChange={(e) => handleInputChange('totalCredits', parseInt(e.target.value) || 0)}
                placeholder="e.g., 45"
              />
            </div>
            
            <div>
              <Label htmlFor="annualTuitionFee">Annual Tuition Fee (2025)</Label>
              <Input
                id="annualTuitionFee"
                type="number"
                value={formData.annualTuitionFee}
                onChange={(e) => handleInputChange('annualTuitionFee', parseInt(e.target.value) || 0)}
                placeholder="e.g., 55000"
              />
            </div>
            
            <div>
              <Label htmlFor="programLink">Program Link</Label>
              <Input
                id="programLink"
                type="url"
                value={formData.programLink}
                onChange={(e) => handleInputChange('programLink', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="admissionRequirements">Admission Requirements</Label>
            <Textarea
              id="admissionRequirements"
              value={formData.admissionRequirements}
              onChange={(e) => handleInputChange('admissionRequirements', e.target.value)}
              placeholder="Enter detailed admission requirements..."
              rows={4}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Program
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
