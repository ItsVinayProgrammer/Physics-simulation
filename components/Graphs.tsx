import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import type { SimulationDataPoint } from '../types';
import { Level } from '../types';
import { LEVEL_CONFIG } from '../constants';

interface GraphsProps {
  history: SimulationDataPoint[];
  level: Level;
  t: any; // Translation object
}

// Recharts doesn't export its tooltip props, so we define a more detailed one.
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        unit: string;
        color: string;
        dataKey: string;
        payload: SimulationDataPoint;
    }>;
    label?: number;
    t: any; // Translation object
    level: Level;
}


const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, t, level }) => {
    if (active && payload && payload.length && typeof label === 'number') {
        const pointData = payload[0].payload;
        return (
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 p-3 rounded-md shadow-lg">
                <p className="label text-sm text-slate-600 font-bold">{`${t.time}: ${label.toFixed(2)} s`}</p>
                {payload.map((p) => (
                    <p key={p.dataKey} style={{ color: p.color }} className="text-sm">
                        {`${p.name}: ${p.value.toFixed(2)} ${p.unit}`}
                    </p>
                ))}
                {/* Add instantaneous values for Level 3 */}
                {level === Level.Level3 && pointData && pointData.velocity !== undefined && (
                  <>
                    {/* Show speed for distance graph */}
                    {payload.some(p => p.dataKey === 'distance') && (
                      <p className="text-sm text-sky-700 font-semibold mt-1">
                          {`${t.instantaneousSpeed}: ${Math.abs(pointData.velocity).toFixed(2)} m/s`}
                      </p>
                    )}
                    {/* Show velocity for displacement graph */}
                    {payload.some(p => p.dataKey === 'displacement') && (
                      <p className="text-sm text-rose-700 font-semibold mt-1">
                          {`${t.instantaneousVelocity}: ${pointData.velocity.toFixed(2)} m/s`}
                      </p>
                    )}
                  </>
                )}
            </div>
        );
    }
    return null;
};


const Graphs: React.FC<GraphsProps> = ({ history, level, t }) => {
  const needsDisplacementData = level === Level.Level2 || level === Level.Level3;

  const graphData = React.useMemo(() => {
    if (needsDisplacementData) {
      const initialPosition = LEVEL_CONFIG[level].initialPosition;
      return history.map(point => ({
        ...point,
        displacement: parseFloat((point.position - initialPosition).toFixed(2))
      }));
    }
    return history;
  }, [history, level, needsDisplacementData]);
  
  // Custom formatter to hide the '0' on the x-axis
  const xAxisTickFormatter = (tick: number | string) => {
    if (tick === 0) {
      return '';
    }
    return `${tick}`;
  };

  const renderDistanceGraph = () => (
    <div className="h-64">
      <h3 className="text-md font-semibold text-center mb-2 text-slate-600">
        {t.distanceVsTime}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={graphData} margin={{ top: 10, right: 30, left: 20, bottom: 45 }}>
          <XAxis dataKey="time" type="number" stroke="black" domain={['dataMin', 'dataMax']} tickFormatter={xAxisTickFormatter}>
            <Label value={t.timeAxis} offset={-15} position="insideBottom" fill="black" fontWeight="bold" />
          </XAxis>
          <YAxis stroke="black" domain={['auto', 'auto']}>
            <Label value={t.distanceAxis} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="black" fontWeight="bold"/>
          </YAxis>
          <Tooltip content={<CustomTooltip t={t} level={level} />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: 'black' }} />
          <Line isAnimationActive={false} type="monotone" dataKey="distance" name={t.distance} stroke="#0ea5e9" strokeWidth={2} dot={false} unit="m" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderDisplacementGraph = () => (
    <div className="h-64">
      <h3 className="text-md font-semibold text-center mb-2 text-slate-600">{t.displacementVsTime}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={graphData} margin={{ top: 10, right: 30, left: 20, bottom: 45 }}>
          <XAxis dataKey="time" type="number" stroke="black" domain={['dataMin', 'dataMax']} tickFormatter={xAxisTickFormatter}>
            <Label value={t.timeAxis} offset={-15} position="insideBottom" fill="black" fontWeight="bold" />
          </XAxis>
          <YAxis stroke="black" domain={['auto', 'auto']}>
            <Label value={t.displacementAxis} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="black" fontWeight="bold"/>
          </YAxis>
          <Tooltip content={<CustomTooltip t={t} level={level} />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: 'black' }} />
          <Line isAnimationActive={false} type="monotone" dataKey="displacement" name={t.displacement} stroke="#f43f5e" strokeWidth={2} dot={false} unit="m" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  
  const renderVelocityGraph = () => (
    <div className="h-64">
      <h3 className="text-md font-semibold text-center mb-2 text-slate-600">{t.velocityVsTime}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={graphData} margin={{ top: 10, right: 30, left: 20, bottom: 45 }}>
          <XAxis dataKey="time" type="number" stroke="black" domain={['dataMin', 'dataMax']} tickFormatter={xAxisTickFormatter}>
              <Label value={t.timeAxis} offset={-15} position="insideBottom" fill="black" fontWeight="bold" />
          </XAxis>
          <YAxis stroke="black" domain={['auto', 'auto']}>
            <Label value={t.velocityAxis} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="black" fontWeight="bold" />
          </YAxis>
          <Tooltip content={<CustomTooltip t={t} level={level} />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: 'black' }} />
          <Line isAnimationActive={false} type="step" dataKey="velocity" name={t.velocity} stroke="#8b5cf6" strokeWidth={2} dot={false} unit="m/s" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const hasMultipleGraphs = level === Level.Level3 || level === Level.Level4;

  let graphsToRender: React.ReactNode = null;
  switch (level) {
    case Level.Level1:
      graphsToRender = renderDistanceGraph();
      break;
    case Level.Level2:
      graphsToRender = renderDisplacementGraph();
      break;
    case Level.Level3:
      graphsToRender = (
        <>
          {renderDistanceGraph()}
          {renderDisplacementGraph()}
        </>
      );
      break;
    case Level.Level4:
      graphsToRender = (
        <>
          {renderDistanceGraph()}
          {renderVelocityGraph()}
        </>
      );
      break;
    default:
      graphsToRender = null;
  }

  return (
    <div className={`grid gap-6 ${hasMultipleGraphs ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
      {graphsToRender}
    </div>
  );
};

export default Graphs;