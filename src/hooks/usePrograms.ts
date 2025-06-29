
import { useState, useEffect } from 'react';
import { Program, ProgramFormData } from '@/types/Program';

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    try {
      const savedPrograms = localStorage.getItem('university-programs');
      if (savedPrograms) {
        setPrograms(JSON.parse(savedPrograms));
      }
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePrograms = (newPrograms: Program[]) => {
    try {
      localStorage.setItem('university-programs', JSON.stringify(newPrograms));
      setPrograms(newPrograms);
    } catch (error) {
      console.error('Error saving programs:', error);
    }
  };

  const addProgram = (programData: ProgramFormData) => {
    const newProgram: Program = {
      ...programData,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    };
    
    const updatedPrograms = [...programs, newProgram];
    savePrograms(updatedPrograms);
    return newProgram;
  };

  const deleteProgram = (id: string) => {
    const updatedPrograms = programs.filter(p => p.id !== id);
    savePrograms(updatedPrograms);
  };

  const getFieldCounts = () => {
    const counts: Record<string, number> = {};
    programs.forEach(program => {
      counts[program.academicField] = (counts[program.academicField] || 0) + 1;
    });
    return counts;
  };

  const getProgramsByField = (field: string) => {
    return programs.filter(program => program.academicField === field);
  };

  const getUniqueFields = () => {
    return Array.from(new Set(programs.map(p => p.academicField))).sort();
  };

  return {
    programs,
    loading,
    addProgram,
    deleteProgram,
    getFieldCounts,
    getProgramsByField,
    getUniqueFields,
  };
};
