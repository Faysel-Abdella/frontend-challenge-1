'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

import { DescriptionField } from './todo-form/DescriptionField';
import { DateTimePicker } from './todo-form/DateTimePicker';
import { LabelPicker } from './todo-form/LabelPicker';
import { ColorPicker } from './todo-form/ColorPicker';
import { useTodoForm } from '@/hooks/useTodoForm';
// import { useTodoForm } from "@/hooks/useTodoForm"

export default function TodoForm() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    dueTime,
    setDueTime,
    selectedLabelValue,
    setSelectedLabelValue,
    status,
    setStatus,
    taskColor,
    setTaskColor,
    isFormExpanded,
    setIsFormExpanded,
    customLabels,
    setCustomLabels,
    handleSubmit,
    resetForm,
    formMode,
  } = useTodoForm();

  return (
    <Card className="p-3 md:p-6 mt-16 mb-10 shadow-sm w-full max-w-5xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!isFormExpanded && e.target.value) {
                  setIsFormExpanded(true);
                }
              }}
              placeholder="What needs to be done?"
              className="text-lg font-medium"
              autoFocus
            />
          </div>

          <AnimatePresence>
            {isFormExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                style={{ paddingTop: 2, paddingBottom: 2 }}
              >
                <DescriptionField
                  value={description}
                  onChange={setDescription}
                />

                <DateTimePicker
                  dueDate={dueDate}
                  setDueDate={setDueDate}
                  dueTime={dueTime}
                  setDueTime={setDueTime}
                />

                <LabelPicker
                  selectedLabelValue={selectedLabelValue}
                  setSelectedLabelValue={setSelectedLabelValue}
                  customLabels={customLabels}
                  setCustomLabels={setCustomLabels}
                />

                <ColorPicker
                  taskColor={taskColor}
                  setTaskColor={setTaskColor}
                />

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="reset" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/70 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {formMode === 'edit' ? 'Update Task' : 'Add Task'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </Card>
  );
}
