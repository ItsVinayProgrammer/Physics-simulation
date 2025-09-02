import React from 'react';
import type { LevelConfig } from '../types';
import { Level } from '../types';
import { ResetIcon, PlayIcon, PauseIcon } from './icons/Icons';

interface ControlsProps {
  level: Level;
  setLevel: (level: Level) => void;
  resetSimulation: () => void;
  velocity: number;
  setVelocity: (velocity: number) => void;
  position: number;
  handlePositionChange: (position: number) => void;
  config: LevelConfig;
  t: any; // Translation object
  isVehicleMoving: boolean;
  onTogglePlayPause: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  level,
  setLevel,
  resetSimulation,
  velocity,
  setVelocity,
  position,
  handlePositionChange,
  config,
  t,
  isVehicleMoving,
  onTogglePlayPause,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="level-select" className="block text-sm font-medium text-slate-600 mb-1">
          {t.learningLevel}
        </label>
        <select
          id="level-select"
          value={level}
          onChange={(e) => setLevel(e.target.value as Level)}
          className="w-full bg-white/80 border-slate-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-slate-800 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        >
          {Object.values(Level)
            .filter((lvl) => lvl !== Level.Level4)
            .map((lvl) => (
              <option key={lvl} value={lvl}>
                {t[lvl]}
              </option>
            ))}
        </select>
      </div>

      <div className="flex items-center justify-center space-x-4 pt-2">
         <button
          onClick={onTogglePlayPause}
          className={`p-4 rounded-full transition-transform transform hover:scale-110 shadow-lg ${
            isVehicleMoving ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600'
          }`}
          aria-label={isVehicleMoving ? t.pauseSimulation : t.startSimulation}
        >
          {isVehicleMoving ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          onClick={resetSimulation}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-transform transform hover:scale-110 shadow-lg"
          aria-label={t.resetSimulation}
        >
          <ResetIcon />
        </button>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <label htmlFor="velocity-slider" className="flex justify-between text-sm font-medium text-slate-600">
            <span>{t.velocity}</span>
            <span>{velocity.toFixed(1)} m/s</span>
          </label>
          <input
            id="velocity-slider"
            type="range"
            min={config.velMin}
            max={config.velMax}
            step="0.1"
            value={velocity}
            onChange={(e) => setVelocity(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer range-thumb-velocity"
          />
        </div>

        {level === Level.Level4 && (
          <div>
            <label htmlFor="position-slider" className="flex justify-between text-sm font-medium text-slate-600">
              <span>{t.position}</span>
              <span>{position.toFixed(1)} m</span>
            </label>
            <input
              id="position-slider"
              type="range"
              min={config.trackMin}
              max={config.trackMax}
              step="0.1"
              value={position}
              onChange={(e) => handlePositionChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer range-thumb-position"
            />
          </div>
        )}
      </div>
       <style>{`
        .range-thumb-velocity::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: #3b82f6; /* A nice blue for velocity */
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }

        .range-thumb-velocity::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3b82f6; /* A nice blue for velocity */
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }
        
        .range-thumb-position::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: #8b5cf6; /* A distinct violet for position */
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }

        .range-thumb-position::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #8b5cf6; /* A distinct violet for position */
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }

        .range-thumb-acceleration::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: #10b981; /* A teal for acceleration */
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }

        .range-thumb-acceleration::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #10b981; /* A teal for acceleration */
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Controls;