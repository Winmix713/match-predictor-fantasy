
import React from 'react';
import MatchCard from './MatchCard';
import { Calendar, TrendingUp } from 'lucide-react';
import { teams, hungarianLeague } from '../data/teams';
import { generateHeadToHead } from '../data/teams';
import { MatchProps } from '../types/match';

// Generate mock matches
const generateMockMatches = () => {
  const mockMatches: MatchProps[] = [];
  
  // Generate matches with predetermined teams
  mockMatches.push({
    id: 1,
    time: '19:00',
    homeTeam: teams[0], // Ferencváros
    awayTeam: teams[3], // Újpest
    isSelectable: true,
    league: hungarianLeague,
    headToHead: generateHeadToHead(teams[0].id, teams[3].id)
  });
  
  mockMatches.push({
    id: 2,
    time: '16:30',
    homeTeam: teams[2], // Debrecen
    awayTeam: teams[1], // Puskás Akadémia
    isSelectable: true,
    league: hungarianLeague,
    headToHead: generateHeadToHead(teams[2].id, teams[1].id)
  });
  
  // Add a match with empty teams
  mockMatches.push({
    id: 3,
    time: '21:00',
    homeTeam: null,
    awayTeam: null,
    isSelectable: true,
    league: hungarianLeague
  });
  
  return mockMatches;
};

const UpcomingMatches = () => {
  const matches = generateMockMatches();
  
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-black/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                Mai kiemelt mérkőzések
              </h2>
            </div>
            <p className="text-gray-400">Válassz csapatokat és küldd el tippjeidet</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-blue-500/10 rounded-lg px-4 py-2 border border-blue-500/20">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">
              <strong className="text-blue-300">2 547</strong> tipp ma
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {matches.map(match => (
            <MatchCard 
              key={match.id}
              {...match}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
