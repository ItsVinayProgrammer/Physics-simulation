import React from 'react';
import { Level } from '../types';
import Tooltip from './Tooltip';

interface DashboardProps {
  time: number;
  distance: number;
  displacement: number;
  speed: number;
  velocity: number;
  averageSpeed: number;
  averageVelocity: number;
  level: Level;
  t: any; // Translation object
}

const DataCard: React.FC<{ title: string; value: string; unit: string; tooltipText: string; valueColor?: string }> = ({ title, value, unit, tooltipText, valueColor = 'text-sky-600' }) => (
    <div className="flex-1 bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200/80 text-center min-w-[140px] transition-all duration-300 hover:shadow-lg hover:border-sky-300/50 transform hover:-translate-y-1">
        <div className="flex items-center justify-center space-x-1.5">
            <h3 className="text-base font-medium text-slate-600">{title}</h3>
            <Tooltip text={tooltipText} />
        </div>
        <p className={`text-4xl font-bold ${valueColor} mt-2 tracking-tight`}>
            {value}
            <span className="text-lg font-medium text-slate-400 ml-1">{unit}</span>
        </p>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ time, distance, displacement, speed, velocity, averageSpeed, averageVelocity, level, t }) => {
  const showVectorQuantities = level !== Level.Level1;
  const showScalarSpeed = level !== Level.Level2;
  
  const velocityColor = velocity > 0 ? 'text-emerald-500' : velocity < 0 ? 'text-red-500' : 'text-sky-600';
  const averageVelocityColor = averageVelocity > 0 ? 'text-emerald-500' : averageVelocity < 0 ? 'text-red-500' : 'text-sky-600';

  return (
    <div className="flex flex-row flex-wrap justify-center items-stretch gap-4">
      <DataCard title={t.time} value={time.toFixed(1)} unit="s" tooltipText="Total elapsed time of the simulation." />
      <DataCard title={t.distance} value={distance.toFixed(1)} unit="m" tooltipText="The total path length traveled. This is a scalar quantity and is always positive." />
      
      {showVectorQuantities && (
        <DataCard title={t.displacement} value={displacement.toFixed(1)} unit="m" tooltipText="The shortest distance from the starting point to the final position. It's a vector quantity, so it can be negative." />
      )}

      {showScalarSpeed && (
          <DataCard title={t.speed} value={speed.toFixed(1)} unit="m/s" tooltipText="How fast the object is moving, regardless of direction. This is the magnitude of velocity." />
      )}
      
      {showVectorQuantities && (
        <DataCard title={t.velocity} value={velocity.toFixed(1)} unit="m/s" tooltipText="The rate of change of position. It includes direction, so it can be positive or negative." valueColor={velocityColor} />
      )}

      {showScalarSpeed && (
        <DataCard title={t.averageSpeed} value={averageSpeed.toFixed(1)} unit="m/s" tooltipText="The total distance traveled divided by the total time elapsed. Formula: total distance / total time." />
      )}
      
      {showVectorQuantities && (
          <DataCard title={t.averageVelocity} value={averageVelocity.toFixed(1)} unit="m/s" tooltipText="The total displacement divided by the total time elapsed. Formula: displacement / total time." valueColor={averageVelocityColor} />
      )}
    </div>
  );
};

export default Dashboard;