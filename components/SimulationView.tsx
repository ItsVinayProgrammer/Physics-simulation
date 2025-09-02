import React from 'react';
import { VehicleIcon, TreeIcon, HouseIcon, SunIcon, CloudIcon } from './icons/Icons';

interface SimulationViewProps {
  position: number;
  velocity: number;
  isPlaying: boolean;
  trackMin: number;
  trackMax: number;
  startPosition: number;
  showDisplacement: boolean;
  minPositionReached: number;
  maxPositionReached: number;
}

const SimulationView: React.FC<SimulationViewProps> = ({ 
  position, velocity, isPlaying, trackMin, trackMax, startPosition, showDisplacement, minPositionReached, maxPositionReached
}) => {
  const trackLength = trackMax - trackMin;
  const vehiclePositionPercentage = ((position - trackMin) / trackLength) * 100;
  const startPositionPercentage = ((startPosition - trackMin) / trackLength) * 100;

  const displacementStart = Math.min(vehiclePositionPercentage, startPositionPercentage);
  const displacementWidth = Math.abs(vehiclePositionPercentage - startPositionPercentage);
  
  const distanceStartPercentage = ((minPositionReached - trackMin) / trackLength) * 100;
  const distanceWidthPercentage = ((maxPositionReached - minPositionReached) / trackLength) * 100;

  const [direction, setDirection] = React.useState<'left' | 'right'>('right');
  React.useEffect(() => {
    if (velocity > 0) {
      setDirection('right');
    } else if (velocity < 0) {
      setDirection('left');
    }
  }, [velocity]);

  return (
    <div className="w-full h-96 rounded-xl relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-400 flex flex-col justify-end">
      {/* Sky scenery */}
      <SunIcon className="absolute w-20 h-20 text-yellow-300 top-4 right-8 sun-animation" />
      <CloudIcon className="absolute w-28 h-28 text-white/80 top-8 left-0 opacity-70 cloud-animation" />
      <CloudIcon className="absolute w-20 h-20 text-white/70 top-4 left-[20%] opacity-50 cloud-animation-fast" />

      {/* Ground & Scenery Container */}
      <div className="w-full h-48 relative bg-gradient-to-t from-green-500 to-green-400">
        
        {/* Scenery - positioned relative to the ground plane */}
        <TreeIcon className="absolute w-24 h-24 text-green-700 bottom-20" style={{left: '2%'}} />
        <HouseIcon className="absolute w-20 h-20 bottom-20" style={{left: '8%'}} />
        <TreeIcon className="absolute w-36 h-36 text-green-600 bottom-20" style={{left: '15%'}} />
        <TreeIcon className="absolute w-20 h-20 text-green-800/80 bottom-24 opacity-90" style={{left: '40%'}} />
        <TreeIcon className="absolute w-28 h-28 text-green-700 bottom-20" style={{left: '70%'}} />
        <HouseIcon className="absolute w-28 h-28 bottom-20" style={{left: '80%'}} />


        {/* Road & Vehicle Container - pinned to the bottom of the ground */}
        <div className="absolute bottom-0 left-0 w-full h-24">
          {/* Distance Travelled Trail */}
          <div
              className="absolute top-1/2 -translate-y-1/2 h-16 bg-cyan-400/20"
              style={{
                  left: `${distanceStartPercentage}%`,
                  width: `${distanceWidthPercentage}%`,
              }}
              title={`Total path covered from ${minPositionReached.toFixed(1)}m to ${maxPositionReached.toFixed(1)}m`}
          />

          {/* Road */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-16 bg-slate-600 shadow-inner">
              {/* Top white line */}
              <div className="absolute top-1 w-full h-1 bg-slate-200/90"></div>
              {/* Dashed yellow center line */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-repeat-x bg-[length:40px_4px] bg-center" 
                style={{backgroundImage: 'linear-gradient(to right, #f59e0b 80%, transparent 20%)'}}>
              </div>
              {/* Bottom white line */}
              <div className="absolute bottom-1 w-full h-1 bg-slate-200/90"></div>
          </div>

          {/* Start Position Marker (House) */}
          <div 
            className="absolute top-1/2 -translate-y-[90%] -translate-x-1/2 flex flex-col items-center" 
            style={{ left: `${startPositionPercentage}%` }}
          >
            <HouseIcon className="w-20 h-20" />
            <span className="text-sm text-slate-100 font-bold mt-1 bg-slate-800/50 px-2 py-0.5 rounded">Start</span>
          </div>

          {/* Displacement Vector */}
          {showDisplacement && (
            <div
              className="absolute top-[calc(50%+32px)] -translate-y-1/2 h-1.5 bg-pink-500 opacity-75 rounded-full"
              style={{
                left: `${displacementStart}%`,
                width: `${displacementWidth}%`,
              }}
            ></div>
          )}

          {/* Vehicle Icon */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-[70%] transition-transform duration-75 ease-linear"
            style={{ left: `${vehiclePositionPercentage}%` }}
          >
            <VehicleIcon direction={direction} isPlaying={isPlaying} velocity={velocity} />
          </div>
        </div>
        
         <div className="absolute bottom-1 w-full flex justify-between text-xs text-slate-100 font-bold px-2">
          <span>{trackMin}m</span>
          <span>{trackMax}m</span>
        </div>
      </div>
    </div>
  );
};

export default SimulationView;