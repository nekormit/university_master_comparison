
import { useState, useEffect } from 'react';
import { Program, ProgramFormData } from '@/types/Program';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading programs:', error);
        toast.error('Failed to load programs');
        return;
      }

      setPrograms(data || []);
    } catch (error) {
      console.error('Error loading programs:', error);
      toast.error('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  const addProgram = async (programData: ProgramFormData) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .insert([programData])
        .select()
        .single();

      if (error) {
        console.error('Error adding program:', error);
        toast.error('Failed to add program');
        return null;
      }

      setPrograms(prev => [data, ...prev]);
      toast.success('Program added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding program:', error);
      toast.error('Failed to add program');
      return null;
    }
  };

  const deleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting program:', error);
        toast.error('Failed to delete program');
        return;
      }

      setPrograms(prev => prev.filter(p => p.id !== id));
      toast.success('Program deleted successfully');
    } catch (error) {
      console.error('Error deleting program:', error);
      toast.error('Failed to delete program');
    }
  };

  const getFieldCounts = () => {
    const counts: Record<string, number> = {};
    programs.forEach(program => {
      counts[program.academic_field] = (counts[program.academic_field] || 0) + 1;
    });
    return counts;
  };

  const getProgramsByField = (field: string) => {
    return programs.filter(program => program.academic_field === field);
  };

  const getUniqueFields = () => {
    return Array.from(new Set(programs.map(p => p.academic_field))).sort();
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
