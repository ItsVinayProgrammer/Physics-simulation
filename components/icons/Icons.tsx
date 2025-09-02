import React from 'react';

export const PlayIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PauseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ResetIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9a9 9 0 0114.23-5.77M20 15a9 9 0 01-14.23 5.77" />
  </svg>
);

export const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const VehicleIcon: React.FC<{ direction: 'left' | 'right'; isPlaying: boolean; velocity: number }> = ({ direction, isPlaying, velocity }) => {
    return (
        <div className={isPlaying && velocity !== 0 ? 'vehicle-animation' : ''}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-32 drop-shadow-lg"
                viewBox="0 0 120 60"
                style={{ transform: direction === 'left' ? 'scaleX(-1)' : 'none' }}
            >
                <g>
                    {/* Bus Body */}
                    <path d="M110,25 H30 C20,25 20,15 10,15 H5 V45 H115 V35 C115,28 110,25 110,25 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
                    <rect x="25" y="10" width="60" height="15" fill="#f59e0b" stroke="#b45309" strokeWidth="2" rx="5" />
                    
                    {/* Stripe */}
                    <rect x="0" y="32" width="115" height="6" fill="#000" />
                    
                    {/* Windows */}
                    <rect x="30" y="14" width="10" height="8" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1" />
                    <rect x="45" y="14" width="10" height="8" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1" />
                    <rect x="60" y="14" width="10" height="8" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1" />
                    <rect x="90" y="28" width="20" height="15" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1" /> {/* Door */}

                    {/* Lights */}
                    <circle cx="112" cy="22" r="3" fill="#ef4444" />
                    <circle cx="8" cy="28" r="3" fill="white" stroke="black" strokeWidth="0.5" />
                    
                    {/* Wheels */}
                    <g>
                        <circle cx="25" cy="45" r="10" fill="#27272a" stroke="#18181b" strokeWidth="2" />
                        <circle cx="25" cy="45" r="8" fill="#d4d4d8" />
                        <circle cx="25" cy="45" r="3" fill="#27272a" />
                        <circle cx="25" cy="40.5" r="2" fill="#27272a" />
                        <circle cx="25" cy="49.5" r="2" fill="#27272a" />
                        <circle cx="29.5" cy="45" r="2" fill="#27272a" />
                        <circle cx="20.5" cy="45" r="2" fill="#27272a" />
                    </g>
                    <g>
                        <circle cx="85" cy="45" r="10" fill="#27272a" stroke="#18181b" strokeWidth="2" />
                        <circle cx="85" cy="45" r="8" fill="#d4d4d8" />
                        <circle cx="85" cy="45" r="3" fill="#27272a" />
                        <circle cx="85" cy="40.5" r="2" fill="#27272a" />
                        <circle cx="85" cy="49.5" r="2" fill="#27272a" />
                        <circle cx="89.5" cy="45" r="2" fill="#27272a" />
                        <circle cx="80.5" cy="45" r="2" fill="#27272a" />
                    </g>
                </g>
            </svg>
        </div>
    );
};


export const TreeIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" className={className} style={style} >
        <g>
            <rect x="40" y="80" width="20" height="20" fill="#78350f" />
            <path d="M 85,80 C 85,60 75,50 65,50 C 65,35 70,25 60,20 C 50,15 45,25 40,35 C 30,30 20,40 20,55 C 10,60 15,80 15,80 Z" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
        </g>
    </svg>
);

export const HouseIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} style={style}>
        <g>
            {/* Roof */}
            <path d="M 0,40 L 50,0 L 100,40 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            {/* Chimney */}
            <rect x="70" y="12" width="15" height="25" fill="#fca5a5" stroke="#991b1b" strokeWidth="2" />
            {/* Walls */}
            <rect x="10" y="40" width="80" height="60" fill="#fed7aa" stroke="#b45309" strokeWidth="2" />
            {/* Door */}
            <rect x="40" y="60" width="20" height="40" fill="#a16207" stroke="#b45309" strokeWidth="2" />
            <circle cx="55" cy="80" r="2" fill="#fde047" />
             {/* Window */}
            <rect x="65" y="55" width="20" height="20" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
             <line x1="75" y1="55" x2="75" y2="75" stroke="#1e3a8a" strokeWidth="2" />
            <line x1="65" y1="65" x2="85" y2="65" stroke="#1e3a8a" strokeWidth="2" />
        </g>
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,5.5A1.5,1.5 0 0,1 13.5,7A1.5,1.5 0 0,1 12,8.5A1.5,1.5 0 0,1 10.5,7A1.5,1.5 0 0,1 12,5.5M12,2L9.8,4.2L12,6.5L14.2,4.2L12,2M18.5,5.5A1.5,1.5 0 0,1 20,7A1.5,1.5 0 0,1 18.5,8.5A1.5,1.5 0 0,1 17,7A1.5,1.5 0 0,1 18.5,5.5M5.5,5.5A1.5,1.5 0 0,1 7,7A1.5,1.5 0 0,1 5.5,8.5A1.5,1.5 0 0,1 4,7A1.5,1.5 0 0,1 5.5,5.5M22,12L19.8,9.8L17.5,12L19.8,14.2L22,12M6.5,12L4.2,9.8L2,12L4.2,14.2L6.5,12M12,17.5A1.5,1.5 0 0,1 10.5,19A1.5,1.5 0 0,1 12,20.5A1.5,1.5 0 0,1 13.5,19A1.5,1.5 0 0,1 12,17.5M18.5,15.5A1.5,1.5 0 0,1 17,17A1.5,1.5 0 0,1 18.5,18.5A1.5,1.5 0 0,1 20,17A1.5,1.5 0 0,1 18.5,15.5M5.5,15.5A1.5,1.5 0 0,1 4,17A1.5,1.5 0 0,1 5.5,18.5A1.5,1.5 0 0,1 7,17A1.5,1.5 0 0,1 5.5,15.5Z" />
    </svg>
);

export const CloudIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z" />
    </svg>
);
