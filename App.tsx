import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Level } from './types';
import type { SimulationDataPoint } from './types';
import { INITIAL_STATE, LEVEL_CONFIG } from './constants';
import Controls from './components/Controls';
import Dashboard from './components/Dashboard';
import Graphs from './components/Graphs';
import SimulationView from './components/SimulationView';
import { translations } from './translations';
import type { Language } from './translations';


export default function App(): React.ReactNode {
  const [level, setLevel] = useState<Level>(Level.Level1);
  const [isVehicleMoving, setIsVehicleMoving] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('ta');
  
  // State for rendering the UI
  const [time, setTime] = useState<number>(INITIAL_STATE.time);
  const [position, setPosition] = useState<number>(INITIAL_STATE.position);
  const [velocity, setVelocity] = useState<number>(INITIAL_STATE.velocity);
  const [acceleration, setAcceleration] = useState<number>(INITIAL_STATE.acceleration);
  const [distance, setDistance] = useState<number>(INITIAL_STATE.distance);
  const [history, setHistory] = useState<SimulationDataPoint[]>(INITIAL_STATE.history);

  // Refs for the high-frequency simulation loop to avoid re-renders and dependency loops
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const simulationStateRef = useRef({ ...INITIAL_STATE });
  const isVehicleMovingRef = useRef(isVehicleMoving);
  
  const t = translations[language];

  useEffect(() => {
    isVehicleMovingRef.current = isVehicleMoving;
  }, [isVehicleMoving]);

  // Keep the simulation's velocity ref in sync with the state from the slider
  useEffect(() => {
    simulationStateRef.current.velocity = velocity;
  }, [velocity]);

  useEffect(() => {
    simulationStateRef.current.acceleration = acceleration;
  }, [acceleration]);
  
  const config = LEVEL_CONFIG[level];

  const resetSimulation = useCallback(() => {
    setIsVehicleMoving(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    const newConfig = LEVEL_CONFIG[level];
    const newInitialState = {
      time: 0,
      position: newConfig.initialPosition,
      velocity: 0,
      acceleration: 0,
      distance: 0,
      history: [{ time: 0, position: newConfig.initialPosition, distance: 0, velocity: 0, acceleration: 0 }],
      minPositionReached: newConfig.initialPosition,
      maxPositionReached: newConfig.initialPosition,
    };

    // Reset React state for UI
    setTime(newInitialState.time);
    setPosition(newInitialState.position);
    setVelocity(newInitialState.velocity);
    setAcceleration(newInitialState.acceleration);
    setDistance(newInitialState.distance);
    setHistory(newInitialState.history);
    
    // Reset simulation ref
    simulationStateRef.current = { ...newInitialState };
  }, [level]);

  useEffect(() => {
    resetSimulation();
  }, [level, resetSimulation]);

  const simulationStep = useCallback((timestamp: number) => {
    if (lastTimestampRef.current === null) {
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(simulationStep);
      return;
    }

    const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = timestamp;

    if (deltaTime > 0.1) { // Avoid large jumps if tab is inactive
        animationFrameRef.current = requestAnimationFrame(simulationStep);
        return;
    }

    const simState = simulationStateRef.current;
    let newPosition = simState.position;
    let distanceTraveled = 0;

    if (isVehicleMovingRef.current) {
        const oldVelocity = simState.velocity;
        let newVelocity = oldVelocity + simState.acceleration * deltaTime;
        newVelocity = Math.max(config.velMin, Math.min(config.velMax, newVelocity));
        simState.velocity = newVelocity;

        const avgVelocity = (oldVelocity + newVelocity) / 2;
        const potentialNewPosition = simState.position + avgVelocity * deltaTime;

        newPosition = Math.max(config.trackMin, Math.min(config.trackMax, potentialNewPosition));
        distanceTraveled = Math.abs(newPosition - simState.position);
    }

    const newDistance = simState.distance + distanceTraveled;
    const newTime = simState.time + deltaTime;
    
    const isAtBoundary = (newPosition === config.trackMax && simState.velocity > 0) ||
                         (newPosition === config.trackMin && simState.velocity < 0);
    const shouldStop = isVehicleMovingRef.current && isAtBoundary;

    // Update refs
    simState.position = newPosition;
    simState.distance = newDistance;
    simState.time = newTime;
    simState.minPositionReached = Math.min(simState.minPositionReached, newPosition);
    simState.maxPositionReached = Math.max(simState.maxPositionReached, newPosition);


    // Periodically update React state to trigger UI re-render
    const lastHistoryTime = simState.history.length > 0 ? simState.history[simState.history.length - 1].time : 0;
    if (newTime - lastHistoryTime > 0.04 || shouldStop) { // Increased update frequency for smoother graphs
        const newHistoryPoint = {
            time: parseFloat(newTime.toFixed(2)),
            position: parseFloat(newPosition.toFixed(2)),
            distance: parseFloat(newDistance.toFixed(2)),
            velocity: parseFloat(simState.velocity.toFixed(2)),
            acceleration: parseFloat(simState.acceleration.toFixed(2)),
        };
        simState.history = [...simState.history, newHistoryPoint];
        
        // Update state for rendering
        setTime(newTime);
        setPosition(newPosition);
        setDistance(newDistance);
        setHistory(simState.history);
        setVelocity(simState.velocity);
    }
    
    if (shouldStop) {
        setIsVehicleMoving(false);
        return;
    }

    if (animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(simulationStep);
    }
  }, [config.trackMin, config.trackMax, config.velMin, config.velMax, setIsVehicleMoving]);

  useEffect(() => {
    if (isVehicleMoving) {
      lastTimestampRef.current = null;
      animationFrameRef.current = requestAnimationFrame(simulationStep);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
        
        // On pause, ensure the UI is perfectly synced with the final ref state
        const simState = simulationStateRef.current;

        const lastHistoryPoint = simState.history[simState.history.length - 1];
        if (!lastHistoryPoint || Math.abs(lastHistoryPoint.time - simState.time) > 0.01) {
          const finalHistoryPoint = {
              time: parseFloat(simState.time.toFixed(2)),
              position: parseFloat(simState.position.toFixed(2)),
              distance: parseFloat(simState.distance.toFixed(2)),
              velocity: parseFloat(simState.velocity.toFixed(2)),
              acceleration: parseFloat(simState.acceleration.toFixed(2)),
          };
          simState.history = [...simState.history, finalHistoryPoint];
        }

        // Update React state
        setTime(simState.time);
        setPosition(simState.position);
        setDistance(simState.distance);
        setHistory([...simState.history]);
        setVelocity(simState.velocity);
      }
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVehicleMoving, simulationStep]);

  const handlePositionChange = (newPosition: number) => {
    if (isVehicleMoving) setIsVehicleMoving(false);

    const simState = simulationStateRef.current;
    const distanceChange = Math.abs(newPosition - simState.position);
    const newDistance = simState.distance + distanceChange;
    
    const pointBefore = {
        time: parseFloat(simState.time.toFixed(2)),
        position: parseFloat(simState.position.toFixed(2)),
        distance: parseFloat(simState.distance.toFixed(2)),
        velocity: 0,
        acceleration: 0,
    };
    const pointAfter = {
        time: parseFloat(simState.time.toFixed(2)),
        position: parseFloat(newPosition.toFixed(2)),
        distance: parseFloat(newDistance.toFixed(2)),
        velocity: 0,
        acceleration: 0,
    };

    const newHistory = [...simState.history];
    const lastPoint = newHistory[newHistory.length - 1];
    if (!lastPoint || lastPoint.time < pointBefore.time || Math.abs(lastPoint.position - pointBefore.position) > 0.01) {
      newHistory.push(pointBefore);
    }
    newHistory.push(pointAfter);

    // Update ref state
    simState.position = newPosition;
    simState.distance = newDistance;
    simState.history = newHistory;
    simState.minPositionReached = Math.min(simState.minPositionReached, newPosition);
    simState.maxPositionReached = Math.max(simState.maxPositionReached, newPosition);


    // Update React state for UI
    setPosition(newPosition);
    setDistance(newDistance);
    setHistory(newHistory);
  };
  
  const handleVelocityChange = (newVelocity: number) => {
    setVelocity(newVelocity);
    if (newVelocity === 0 && simulationStateRef.current.acceleration === 0) {
      setIsVehicleMoving(false);
    }
  };

  const handleTogglePlayPause = () => {
    if (!isVehicleMoving) {
      if (velocity === 0 && acceleration === 0) {
        return; // Don't start if velocity is zero
      }
      // Don't start if already at a boundary and trying to move further out
      if (position >= config.trackMax && velocity > 0) {
        return;
      }
      if (position <= config.trackMin && velocity < 0) {
        return;
      }
    }
    setIsVehicleMoving(prev => !prev);
  };

  const displacement = position - config.initialPosition;
  const speed = Math.abs(velocity);
  const averageSpeed = time > 0 ? distance / time : 0;
  const averageVelocity = time > 0 ? displacement / time : 0;

  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 relative">
          <h1 className="text-4xl font-bold text-sky-600">{t.title}</h1>
           <div className="absolute top-0 right-0 flex space-x-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 text-base rounded-lg transition ${
                language === 'en'
                  ? 'bg-sky-600 text-white font-semibold shadow-md'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-4 py-2 text-base rounded-lg transition ${
                language === 'ta'
                  ? 'bg-sky-600 text-white font-semibold shadow-md'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </header>

        <main className="flex flex-col gap-6">
          <div className="rounded-xl shadow-lg border border-slate-200 relative overflow-hidden">
             <SimulationView 
                position={position}
                velocity={velocity}
                isPlaying={isVehicleMoving}
                trackMin={config.trackMin} 
                trackMax={config.trackMax}
                startPosition={config.initialPosition}
                showDisplacement={level !== Level.Level1}
                minPositionReached={simulationStateRef.current.minPositionReached}
                maxPositionReached={simulationStateRef.current.maxPositionReached}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">{t.controls}</h2>
              <Controls
                level={level}
                setLevel={setLevel}
                resetSimulation={resetSimulation}
                velocity={velocity}
                setVelocity={handleVelocityChange}
                position={position}
                handlePositionChange={handlePositionChange}
                config={config}
                t={t}
                isVehicleMoving={isVehicleMoving}
                onTogglePlayPause={handleTogglePlayPause}
              />
            </div>

            <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20">
               <h2 className="text-xl font-semibold mb-3 text-slate-800">{t.dashboard}</h2>
              <Dashboard
                time={time}
                distance={distance}
                displacement={displacement}
                speed={speed}
                velocity={velocity}
                averageSpeed={averageSpeed}
                averageVelocity={averageVelocity}
                level={level}
                t={t}
              />
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20">
             <h2 className="text-xl font-semibold mb-3 text-slate-800 text-center">{t.graphs}</h2>
            <Graphs history={history} level={level} t={t} />
          </div>
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
        </footer>
      </div>
    </div>
  );
}