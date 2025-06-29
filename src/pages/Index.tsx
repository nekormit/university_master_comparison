
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { usePrograms } from '@/hooks/usePrograms';
import { ProgramForm } from '@/components/ProgramForm';
import { ProgramCard } from '@/components/ProgramCard';
import { ComparisonModal } from '@/components/ComparisonModal';
import { ProgramFormData } from '@/types/Program';
import { toast } from 'sonner';

const Index = () => {
  const {
    programs,
    loading,
    addProgram,
    deleteProgram,
    getFieldCounts,
    getProgramsByField,
    getUniqueFields,
  } = usePrograms();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const fields = getUniqueFields();
  const fieldCounts = getFieldCounts();

  const filteredPrograms = useMemo(() => {
    let filtered = activeTab === 'all' ? programs : getProgramsByField(activeTab);
    
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.program_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.university_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (program.university_location && program.university_location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  }, [programs, activeTab, searchTerm, getProgramsByField]);

  const handleAddProgram = async (data: ProgramFormData) => {
    const newProgram = await addProgram(data);
    
    if (newProgram) {
      // Switch to the tab of the newly added program's field
      if (fields.includes(data.academic_field)) {
        setActiveTab(data.academic_field);
      } else {
        // If it's a new field, the tab will be created and we can switch to it
        setTimeout(() => setActiveTab(data.academic_field), 100);
      }
    }
  };

  const handleDeleteProgram = (id: string) => {
    deleteProgram(id);
    setSelectedPrograms(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleProgramSelect = (programId: string, selected: boolean) => {
    setSelectedPrograms(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(programId);
      } else {
        newSet.delete(programId);
      }
      return newSet;
    });
  };

  const handleCompare = () => {
    if (selectedPrograms.size === 0) {
      toast.error('Please select at least one program to compare');
      return;
    }
    setIsComparisonOpen(true);
  };

  const selectedProgramsData = programs.filter(p => selectedPrograms.has(p.id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading programs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            University Program Database
          </h1>
          <p className="text-slate-600 text-lg">
            Manage and compare university programs across different academic fields
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search programs, universities, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {selectedPrograms.size > 0 && (
              <Button onClick={handleCompare} variant="outline">
                Compare Selected ({selectedPrograms.size})
              </Button>
            )}
            
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All Programs
              <Badge variant="secondary">{programs.length}</Badge>
            </TabsTrigger>
            
            {fields.map((field) => (
              <TabsTrigger key={field} value={field} className="flex items-center gap-2">
                {field}
                <Badge variant="secondary">{fieldCounts[field]}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Programs Tab */}
          <TabsContent value="all">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                All Programs ({programs.length})
              </h2>
            </div>
            
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  {programs.length === 0 ? 'No programs added yet' : 'No programs match your search'}
                </div>
                {programs.length === 0 && (
                  <Button onClick={() => setIsFormOpen(true)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Your First Program
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    isSelected={selectedPrograms.has(program.id)}
                    onSelect={handleProgramSelect}
                    onDelete={handleDeleteProgram}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Field-specific Tabs */}
          {fields.map((field) => (
            <TabsContent key={field} value={field}>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-slate-800">
                  {field} Programs ({fieldCounts[field]})
                </h2>
              </div>
              
              {filteredPrograms.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    No programs match your search in {field}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((program) => (
                    <ProgramCard
                      key={program.id}
                      program={program}
                      isSelected={selectedPrograms.has(program.id)}
                      onSelect={handleProgramSelect}
                      onDelete={handleDeleteProgram}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Modals */}
        <ProgramForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddProgram}
        />
        
        <ComparisonModal
          isOpen={isComparisonOpen}
          onClose={() => setIsComparisonOpen(false)}
          programs={selectedProgramsData}
        />
      </div>
    </div>
  );
};

export default Index;
