import { useState } from 'react';
import HomePage from './HomePage';
import Chakra3DVisualizer from './Chakra3DVisualizer';
import NatalChartDecoder from './NatalChartDecoder';
import BibleConceptAtlas from './BibleConceptAtlas';
import PsychologyPortal from './PsychologyPortal';
import InnerBalanceAtlas from './InnerBalanceAtlas';
import FrameworkAtlas from './FrameworkAtlas';
import NevilleGoddardPortal from './NevilleGoddardPortal';

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'chakra')       return <Chakra3DVisualizer onBack={() => setPage('home')} />;
  if (page === 'astrology')    return <NatalChartDecoder onBack={() => setPage('home')} />;
  if (page === 'biblical')     return <BibleConceptAtlas onBack={() => setPage('home')} />;
  if (page === 'psychology')   return <PsychologyPortal onBack={() => setPage('home')} onNavigate={setPage} />;
  if (page === 'innerbalance') return <InnerBalanceAtlas onBack={() => setPage('home')} onNavigate={setPage} />;
  if (page === 'frameworks')   return <FrameworkAtlas onBack={() => setPage('home')} />;
  if (page === 'neville')      return <NevilleGoddardPortal onBack={() => setPage('home')} />;
  return <HomePage onNavigate={setPage} />;
}
