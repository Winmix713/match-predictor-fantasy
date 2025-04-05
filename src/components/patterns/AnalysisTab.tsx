
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, LineChart, BarChart4, Filter, PieChart } from 'lucide-react';
import { DataSource, PatternDefinition, PatternDetectionResult } from '../../types/match';

interface AnalysisTabProps {
  dataSources: DataSource[];
  predefinedPatterns: PatternDefinition[];
  patternResults: PatternDetectionResult[];
  handleRunAnalysis: () => void;
  handleExportReport: () => void;
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({ 
  dataSources, 
  predefinedPatterns, 
  patternResults,
  handleRunAnalysis,
  handleExportReport
}) => {
  const getSignificanceBadge = (significance: string) => {
    switch (significance) {
      case 'high':
        return <Badge className="bg-emerald-500">Magas jelentőség</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Közepes jelentőség</Badge>;
      case 'low':
        return <Badge className="bg-gray-500">Alacsony jelentőség</Badge>;
      default:
        return <Badge className="bg-gray-500">{significance}</Badge>;
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Minta Elemzés</h3>
        <div className="flex gap-2">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
            onClick={handleRunAnalysis}
          >
            <LineChart className="h-4 w-4" />
            <span>Elemzés indítása</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900/40 rounded-lg p-4 border border-white/5">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-400" />
            Elemzési beállítások
          </h4>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Adatforrások</label>
              <div className="flex flex-wrap gap-1">
                {dataSources.map(source => (
                  <Badge key={source.id} className="bg-blue-500/20 text-blue-400">
                    {source.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Elemzendő minták</label>
              <div className="flex flex-wrap gap-1">
                {predefinedPatterns.map(pattern => (
                  <Badge key={pattern.id} className="bg-purple-500/20 text-purple-400">
                    {pattern.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Statisztikai konfidencia minimum</label>
              <div className="font-medium text-white">75%</div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Minimum mérkőzés szám</label>
              <div className="font-medium text-white">10</div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-2 bg-black/20 border-white/10">
              Beállítások módosítása
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-900/40 rounded-lg p-4 border border-white/5 md:col-span-2">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <BarChart4 className="h-4 w-4 text-blue-400" />
            Elemzési eredmények
          </h4>
          
          {patternResults.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {patternResults.map(result => (
                  <div key={result.patternId} className="bg-black/20 p-3 rounded-md border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-medium">{result.patternName}</h5>
                      {getSignificanceBadge(result.significance)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <div className="text-xs text-gray-400">Megbízhatóság</div>
                        <div className="text-lg font-bold text-emerald-400">{result.confidenceScore}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Gyakoriság</div>
                        <div className="text-lg font-bold text-blue-400">{result.frequency}%</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 mb-1">Megfigyelt esetek</div>
                    <div className="text-sm font-medium text-white">{result.matches.length} mérkőzés</div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-2 text-blue-400 hover:text-blue-300 hover:bg-blue-950/20"
                    >
                      Részletek megtekintése
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
                onClick={handleExportReport}
              >
                <Download className="h-4 w-4 mr-2" />
                Elemzési jelentés exportálása
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-blue-400" />
              </div>
              <h5 className="text-white font-medium mb-2">Még nincs elemzési eredmény</h5>
              <p className="text-gray-400 text-sm mb-4">Indítson el egy új elemzést a minták alapján</p>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleRunAnalysis}
              >
                Elemzés indítása
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Additional visualizations for analysis results */}
      <div className="bg-gray-900/40 rounded-lg p-4 mb-6 border border-white/5">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <PieChart className="h-4 w-4 text-blue-400" />
          Mintaeloszlás vizualizáció
        </h4>
        
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-4">
              <BarChart4 className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-gray-400">Diagramok az elemzés futtatása után jelennek meg</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisTab;
