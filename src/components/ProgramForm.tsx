
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProgramFormData } from '@/types/Program';

interface ProgramFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProgramFormData) => void;
}

export const ProgramForm: React.FC<ProgramFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProgramFormData>({
    academic_field: '',
    university_name: '',
    university_location: '',
    university_overall_ranking: null,
    university_subject_ranking: null,
    program_name: '',
    program_link: '',
    program_duration: '',
    admission_requirements: '',
    total_credits: 0,
    annual_tuition_fee: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.academic_field || !formData.university_name || !formData.program_name) {
      return;
    }

    onSubmit(formData);
    onClose();
    
    // Reset form
    setFormData({
      academic_field: '',
      university_name: '',
      university_location: '',
      university_overall_ranking: null,
      university_subject_ranking: null,
      program_name: '',
      program_link: '',
      program_duration: '',
      admission_requirements: '',
      total_credits: 0,
      annual_tuition_fee: 0,
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
              <Label htmlFor="academic_field">Academic Field *</Label>
              <Input
                id="academic_field"
                value={formData.academic_field}
                onChange={(e) => handleInputChange('academic_field', e.target.value)}
                placeholder="e.g., Computer Science"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="university_name">University Name *</Label>
              <Input
                id="university_name"
                value={formData.university_name}
                onChange={(e) => handleInputChange('university_name', e.target.value)}
                placeholder="e.g., Stanford University"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="university_location">University Location</Label>
              <Input
                id="university_location"
                value={formData.university_location}
                onChange={(e) => handleInputChange('university_location', e.target.value)}
                placeholder="e.g., Stanford, CA, USA"
              />
            </div>
            
            <div>
              <Label htmlFor="program_name">Program Name *</Label>
              <Input
                id="program_name"
                value={formData.program_name}
                onChange={(e) => handleInputChange('program_name', e.target.value)}
                placeholder="e.g., Master of Science in Computer Science"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="university_overall_ranking">University Overall Ranking</Label>
              <Input
                id="university_overall_ranking"
                type="number"
                value={formData.university_overall_ranking || ''}
                onChange={(e) => handleInputChange('university_overall_ranking', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="e.g., 5"
              />
            </div>
            
            <div>
              <Label htmlFor="university_subject_ranking">University Subject Ranking</Label>
              <Input
                id="university_subject_ranking"
                type="number"
                value={formData.university_subject_ranking || ''}
                onChange={(e) => handleInputChange('university_subject_ranking', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="e.g., 2"
              />
            </div>
            
            <div>
              <Label htmlFor="program_duration">Program Duration</Label>
              <Input
                id="program_duration"
                value={formData.program_duration}
                onChange={(e) => handleInputChange('program_duration', e.target.value)}
                placeholder="e.g., 2 years"
              />
            </div>
            
            <div>
              <Label htmlFor="total_credits">Total Credits</Label>
              <Input
                id="total_credits"
                type="number"
                value={formData.total_credits}
                onChange={(e) => handleInputChange('total_credits', parseInt(e.target.value) || 0)}
                placeholder="e.g., 45"
              />
            </div>
            
            <div>
              <Label htmlFor="annual_tuition_fee">Annual Tuition Fee (2025)</Label>
              <Input
                id="annual_tuition_fee"
                type="number"
                value={formData.annual_tuition_fee}
                onChange={(e) => handleInputChange('annual_tuition_fee', parseInt(e.target.value) || 0)}
                placeholder="e.g., 55000"
              />
            </div>
            
            <div>
              <Label htmlFor="program_link">Program Link</Label>
              <Input
                id="program_link"
                type="url"
                value={formData.program_link}
                onChange={(e) => handleInputChange('program_link', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="admission_requirements">Admission Requirements</Label>
            <Textarea
              id="admission_requirements"
              value={formData.admission_requirements}
              onChange={(e) => handleInputChange('admission_requirements', e.target.value)}
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
