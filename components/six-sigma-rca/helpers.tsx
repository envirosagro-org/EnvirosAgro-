import React from 'react';
import { DefinePhase } from './DefinePhase';
import { MeasurePhase } from './MeasurePhase';
import { AnalyzePhase } from './AnalyzePhase';
import { ImprovePhase } from './ImprovePhase';
import { ControlPhase } from './ControlPhase';

export const renderPhaseContent = (activePhase: string) => {
  switch (activePhase) {
    case 'DEFINE':
      return <DefinePhase />;
    case 'MEASURE':
      return <MeasurePhase />;
    case 'ANALYZE':
      return <AnalyzePhase />;
    case 'IMPROVE':
      return <ImprovePhase />;
    case 'CONTROL':
      return <ControlPhase />;
    default:
      return null;
  }
};