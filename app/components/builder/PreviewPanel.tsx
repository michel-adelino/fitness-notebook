'use client';

import React, { forwardRef } from 'react';
import { useBuilder } from '@/app/context/BuilderContext';
import { Eye, Dumbbell, Calendar, Target, TrendingUp } from 'lucide-react';

export const PreviewPanel = forwardRef<HTMLDivElement>((props, ref) => {
  const { notebookPage, selectedTemplate } = useBuilder();

  // Convert mm to pixels (1mm ≈ 3.779527559 pixels at 96 DPI)
  const mmToPx = (mm: number) => mm * 3.779527559;
  const pageWidth = mmToPx(notebookPage.pageSize.width);
  const pageHeight = mmToPx(notebookPage.pageSize.height);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength': return '💪';
      case 'cardio': return '🏃';
      case 'flexibility': return '🧘';
      default: return '📝';
    }
  };

  // Render table-based template
  const renderTableTemplate = () => {
    if (!selectedTemplate.tableColumns || notebookPage.exercises.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: notebookPage.colors.accentColor + '15' }}>
            <Dumbbell className="w-10 h-10" style={{ color: notebookPage.colors.accentColor }} />
          </div>
          <p className="text-gray-400 font-medium">No exercises added yet</p>
        </div>
      );
    }

    return (
      <div className="px-8 py-6">
        <table className="w-full border-collapse" style={{ borderColor: notebookPage.colors.lineColor }}>
          <thead>
            <tr style={{ backgroundColor: notebookPage.colors.accentColor + '15' }}>
              {selectedTemplate.tableColumns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left font-bold text-sm border-b-2"
                  style={{
                    color: notebookPage.colors.headingColor,
                    borderColor: notebookPage.colors.accentColor,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notebookPage.exercises
              .sort((a, b) => a.order - b.order)
              .map((exercise, idx) => (
                <tr
                  key={exercise.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? 'transparent' : notebookPage.colors.accentColor + '05',
                  }}
                >
                  <td className="px-4 py-3 border-b font-semibold" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                    {exercise.name}
                  </td>
                  {selectedTemplate.id === 'table' && (
                    <>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.sets || '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.reps || '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.weight ? `${exercise.weight}kg` : '-'}
                      </td>
                      <td className="px-4 py-3 border-b" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.notes || '-'}
                      </td>
                    </>
                  )}
                  {selectedTemplate.id === 'weekly' && (
                    <>
                      <td className="px-4 py-3 border-b" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {selectedTemplate.sections[idx % selectedTemplate.sections.length] || '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.sets || '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.reps || '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.weight ? `${exercise.weight}kg` : '-'}
                      </td>
                    </>
                  )}
                  {selectedTemplate.id === 'tracker' && (
                    <>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.sets || '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.reps || '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.weight ? `${exercise.weight}kg` : '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.weight ? `${exercise.weight}kg` : '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.accentColor }}>
                        ↗
                      </td>
                    </>
                  )}
                  {selectedTemplate.id === 'progressive' && (
                    <>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.weight ? `${exercise.weight}kg` : '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.weight ? `${(exercise.weight || 0) + 2.5}kg` : '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.weight ? `${(exercise.weight || 0) + 5}kg` : '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.headingColor }}>
                        {exercise.weight ? `${(exercise.weight || 0) + 7.5}kg` : '-'}
                      </td>
                      <td className="px-4 py-3 border-b text-center font-semibold" style={{ borderColor: notebookPage.colors.lineColor + '30', color: notebookPage.colors.accentColor }}>
                        {exercise.sets && exercise.reps && exercise.weight
                          ? `${(exercise.sets * exercise.reps * exercise.weight).toFixed(1)}kg`
                          : '-'}
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render section-based template (log, split, fullbody)
  const renderSectionTemplate = () => {
    if (notebookPage.exercises.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: notebookPage.colors.accentColor + '15' }}>
            <Dumbbell className="w-10 h-10" style={{ color: notebookPage.colors.accentColor }} />
          </div>
          <p className="text-gray-400 font-medium">No exercises added yet</p>
        </div>
      );
    }

    const exercisesPerSection = Math.ceil(notebookPage.exercises.length / selectedTemplate.sections.length);
    const sortedExercises = notebookPage.exercises.sort((a, b) => a.order - b.order);

    return (
      <div className="px-8 py-6 space-y-6">
        {selectedTemplate.sections.map((section, sectionIdx) => {
          const sectionExercises = sortedExercises.slice(
            sectionIdx * exercisesPerSection,
            (sectionIdx + 1) * exercisesPerSection
          );

          return (
            <div key={sectionIdx} className="mb-6">
              <h3
                className="text-lg font-bold mb-3 pb-2 border-b-2"
                style={{
                  color: notebookPage.colors.headingColor,
                  borderColor: notebookPage.colors.accentColor,
                }}
              >
                {section}
              </h3>
              <div className="space-y-2">
                {sectionExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                    style={{
                      borderColor: notebookPage.colors.lineColor + '30',
                      backgroundColor: notebookPage.colors.accentColor + '05',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getCategoryIcon(exercise.category)}</span>
                      <span className="font-semibold" style={{ color: notebookPage.colors.headingColor }}>
                        {exercise.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm" style={{ color: notebookPage.colors.headingColor + 'aa' }}>
                      {exercise.sets && <span>{exercise.sets} sets</span>}
                      {exercise.reps && <span>{exercise.reps} reps</span>}
                      {exercise.weight && exercise.weight > 0 && <span>{exercise.weight}kg</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render card-based template (default)
  const renderCardTemplate = () => {
    if (notebookPage.exercises.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: notebookPage.colors.accentColor + '15' }}>
            <Dumbbell className="w-10 h-10" style={{ color: notebookPage.colors.accentColor }} />
          </div>
          <p className="text-gray-400 font-medium">No exercises added yet</p>
          <p className="text-gray-300 text-sm mt-1">Start building your workout plan</p>
        </div>
      );
    }

    return (
      <div className="px-8 py-6 space-y-3">
        {notebookPage.exercises
          .sort((a, b) => a.order - b.order)
          .map((exercise, index) => (
            <div
              key={exercise.id}
              className="relative p-4 rounded-xl border transition-all"
              style={{
                borderColor: notebookPage.colors.lineColor + '20',
                backgroundColor: index % 2 === 0 ? 'transparent' : notebookPage.colors.accentColor + '05',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shadow-sm"
                    style={{
                      backgroundColor: notebookPage.colors.accentColor + '15',
                    }}
                  >
                    {getCategoryIcon(exercise.category)}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold text-lg mb-1"
                      style={{ color: notebookPage.colors.headingColor }}
                    >
                      {exercise.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-medium">
                      <span
                        className="px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: notebookPage.colors.accentColor + '20',
                          color: notebookPage.colors.accentColor,
                        }}
                      >
                        {exercise.category}
                      </span>
                      {exercise.sets && exercise.reps && (
                        <span className="text-gray-500">
                          {exercise.sets} × {exercise.reps}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {exercise.sets && (
                  <div className="text-center p-2.5 rounded-lg" style={{ backgroundColor: notebookPage.colors.accentColor + '08' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: notebookPage.colors.headingColor + 'aa' }}>
                      Sets
                    </div>
                    <div className="text-lg font-bold" style={{ color: notebookPage.colors.headingColor }}>
                      {exercise.sets}
                    </div>
                  </div>
                )}
                {exercise.reps && (
                  <div className="text-center p-2.5 rounded-lg" style={{ backgroundColor: notebookPage.colors.accentColor + '08' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: notebookPage.colors.headingColor + 'aa' }}>
                      Reps
                    </div>
                    <div className="text-lg font-bold" style={{ color: notebookPage.colors.headingColor }}>
                      {exercise.reps}
                    </div>
                  </div>
                )}
                {exercise.weight && exercise.weight > 0 && (
                  <div className="text-center p-2.5 rounded-lg" style={{ backgroundColor: notebookPage.colors.accentColor + '08' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: notebookPage.colors.headingColor + 'aa' }}>
                      Weight
                    </div>
                    <div className="text-lg font-bold" style={{ color: notebookPage.colors.headingColor }}>
                      {exercise.weight}kg
                    </div>
                  </div>
                )}
                {exercise.category === 'cardio' && exercise.notes && (
                  <div className="col-span-3 p-2.5 rounded-lg" style={{ backgroundColor: notebookPage.colors.accentColor + '08' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: notebookPage.colors.headingColor + 'aa' }}>
                      Duration/Distance
                    </div>
                    <div className="text-sm font-semibold" style={{ color: notebookPage.colors.headingColor }}>
                      {exercise.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    );
  };

  // Determine which template to render
  const renderContent = () => {
    if (selectedTemplate.hasTable) {
      return renderTableTemplate();
    } else if (selectedTemplate.sections.length > 0 && ['log', 'split', 'fullbody'].includes(selectedTemplate.layout)) {
      return renderSectionTemplate();
    } else {
      return renderCardTemplate();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
          <Eye className="w-4 h-4 text-green-700" />
        </div>
        <h3 className="font-semibold text-gray-900">Live Preview</h3>
      </div>

      <div className="flex justify-center overflow-auto bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-xl">
        <div
          ref={ref}
          className="bg-white shadow-2xl rounded-lg"
          style={{
            width: `${pageWidth}px`,
            minHeight: `${pageHeight}px`,
            boxSizing: 'border-box',
            overflow: 'visible',
          }}
        >
          {/* Modern Header with Branding */}
          <div
            className="relative px-8 pt-8 pb-6"
            style={{
              background: `linear-gradient(135deg, ${notebookPage.colors.accentColor}15 0%, ${notebookPage.colors.accentColor}05 100%)`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {notebookPage.personalization.name ? (
                  <h1
                    className="text-3xl font-bold mb-2 tracking-tight"
                    style={{ color: notebookPage.colors.headingColor }}
                  >
                    {notebookPage.personalization.name}'s
                  </h1>
                ) : (
                  <h1
                    className="text-3xl font-bold mb-2 tracking-tight"
                    style={{ color: notebookPage.colors.headingColor }}
                  >
                    My Fitness
                  </h1>
                )}
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" style={{ color: notebookPage.colors.accentColor }} />
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: notebookPage.colors.accentColor }}
                  >
                    {selectedTemplate.name}
                  </h2>
                </div>
              </div>
              {notebookPage.personalization.initials && (
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${notebookPage.colors.accentColor} 0%, ${notebookPage.colors.accentColor}dd 100%)`,
                  }}
                >
                  {notebookPage.personalization.initials}
                </div>
              )}
            </div>

            {/* Date/Info Bar */}
            <div className="flex items-center gap-4 text-sm" style={{ color: notebookPage.colors.headingColor + 'aa' }}>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              {notebookPage.exercises.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  <span>{notebookPage.exercises.length} {notebookPage.exercises.length === 1 ? 'Exercise' : 'Exercises'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Template Sections - Only show if not table template */}
          {!selectedTemplate.hasTable && selectedTemplate.sections.length > 0 && (
            <div className="px-8 py-4 border-b" style={{ borderColor: notebookPage.colors.lineColor + '30' }}>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.sections.map((section, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                    style={{
                      backgroundColor: `${notebookPage.colors.accentColor}15`,
                      color: notebookPage.colors.accentColor,
                      border: `1px solid ${notebookPage.colors.accentColor}30`,
                    }}
                  >
                    {section}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render content based on template type */}
          {renderContent()}

          {/* Quote Footer - Modern Design */}
          {notebookPage.personalization.quote && (
            <div
              className="px-8 py-6 mt-auto border-t"
              style={{
                borderColor: notebookPage.colors.lineColor + '30',
                background: `linear-gradient(135deg, ${notebookPage.colors.accentColor}08 0%, ${notebookPage.colors.accentColor}03 100%)`,
              }}
            >
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: notebookPage.colors.accentColor }} />
                <p className="text-sm italic leading-relaxed" style={{ color: notebookPage.colors.headingColor }}>
                  "{notebookPage.personalization.quote}"
                </p>
              </div>
            </div>
          )}

          {/* Bottom Branding */}
          <div className="px-8 py-4 border-t text-center" style={{ borderColor: notebookPage.colors.lineColor + '20' }}>
            <div className="flex items-center justify-center gap-2">
              <Dumbbell className="w-4 h-4" style={{ color: notebookPage.colors.accentColor }} />
              <span className="text-xs font-medium" style={{ color: notebookPage.colors.headingColor + '80' }}>
                Fitness Notebook
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PreviewPanel.displayName = 'PreviewPanel';
