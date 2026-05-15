import { useState } from 'react';
import HomePage from './HomePage';
import Chakra3DVisualizer from './Chakra3DVisualizer';
import NatalChartDecoder from './NatalChartDecoder';
import BibleConceptAtlas from './BibleConceptAtlas';
import VitaminsMineralsAtlas from './VitaminsMineralsAtlas';

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'chakra') return <Chakra3DVisualizer onBack={() => setPage('home')} />;
  if (page === 'astrology') return <NatalChartDecoder onBack={() => setPage('home')} />;
  if (page === 'biblical') return <BibleConceptAtlas onBack={() => setPage('home')} />;
  if (page === 'nutrients') return <VitaminsMineralsAtlas onBack={() => setPage('home')} />;
  return <HomePage onNavigate={setPage} />;
}
