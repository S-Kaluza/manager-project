import React, { useState, useEffect } from "react";
import { AnimationContainer } from "@/components/animations/networkAnimation/styledComponents";
import { Network } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

const NODE_COUNT = 55;
const RADIUS_X = 340;
const RADIUS_Y = 170;
const CONNECTION_DISTANCE = 95;

export const animationColors = {
    green: '#d1ff64',
    red: '#ff5252',
    default: '#e6f1ff',
};

interface Point {
    x: number;
    y: number;
    id: number;
    distanceFromCenter: number;
}

interface Connection {
    p1: Point;
    p2: Point;
    key: string;
    delayFactor: number;
}

interface NetworkData {
    nodes: Point[];
    connections: Connection[];
}

interface NetworkAnimationProps {
    activeColor: 'green'| 'red' | 'default';
}

// === FUNKCJA CZYSTA (POZA KOMPONENTEM) ===
const generateNetworkData = (): NetworkData => {
    const generatedNodes: Point[] = [];

    // A. Dodaj węzły
    for (let i = 0; i < NODE_COUNT; i++) {
        const angle = (i / NODE_COUNT) * Math.PI * 2 + (Math.random() * 0.5);
        const r = Math.sqrt(0.02 + Math.random() * 0.98);

        const x = Math.cos(angle) * RADIUS_X * r;
        const y = Math.sin(angle) * RADIUS_Y * r;

        generatedNodes.push({
            x,
            y,
            id: i,
            distanceFromCenter: r
        });
    }

    // B. Generuj połączenia
    const generatedConnections: Connection[] = [];

    for (let i = 0; i < generatedNodes.length; i++) {
        for (let j = i + 1; j < generatedNodes.length; j++) {
            const p1 = generatedNodes[i];
            const p2 = generatedNodes[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

            if (dist < CONNECTION_DISTANCE) {
                generatedConnections.push({
                    p1,
                    p2,
                    key: `${p1.id}-${p2.id}`,
                    delayFactor: Math.max(p1.distanceFromCenter, p2.distanceFromCenter)
                });
            }
        }

        // Połączenia do centrum
        if (generatedNodes[i].distanceFromCenter < 0.45) {
            generatedConnections.push({
                p1: { x: 0, y: 0, id: -1, distanceFromCenter: 0 },
                p2: generatedNodes[i],
                key: `center-${generatedNodes[i].id}`,
                delayFactor: generatedNodes[i].distanceFromCenter
            });
        }
    }

    return { nodes: generatedNodes, connections: generatedConnections };
};

const NetworkAnimation = ({ activeColor }: NetworkAnimationProps) => {
    const theme = useTheme();
    const { custom } = theme.palette;

    const [networkData, setNetworkData] = useState<NetworkData | null>(null);

    useEffect(() => {
        // Używamy setTimeout(..., 0), aby przenieść aktualizację na koniec kolejki zdarzeń (Event Loop).
        // To sprawia, że aktualizacja jest asynchroniczna, co zadowala linter
        // (nie blokuje renderowania synchronicznie) i jest bezpieczne dla hydracji.
        const timer = setTimeout(() => {
            setNetworkData(generateNetworkData());
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    // Renderujemy null do momentu wygenerowania danych (SSR + 1. klatka na kliencie)
    if (!networkData) return null;

    const { nodes, connections } = networkData;

    return (
        <>
            <style>
                {`
                    @keyframes pulse-connection {
                        0% { stroke-opacity: 0.05; stroke: ${custom.slate}; }
                        20% { stroke-opacity: 0.8; stroke: var(--active-color); stroke-width: 2px; }
                        100% { stroke-opacity: 0.15; stroke: ${custom.slate}; stroke-width: 1px; }
                    }

                    @keyframes appear-node {
                        0% { transform: scale(0); opacity: 0; fill: ${custom.slate}; }
                        20% { transform: scale(1.8); opacity: 1; fill: var(--active-color); }
                        100% { transform: scale(1); opacity: 1; fill: ${custom.lightSlate}; }
                    }
                    
                    @keyframes float-web {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-5px); }
                        100% { transform: translateY(0px); }
                    }

                    .web-line {
                        stroke-linecap: round;
                        opacity: 0; 
                        animation: pulse-connection 4s ease-out infinite;
                        transition: stroke 0.5s ease;
                    }

                    .web-node {
                        opacity: 0;
                        animation: appear-node 4s ease-out infinite;
                        cursor: crosshair;
                        transition: fill 0.3s ease, r 0.3s ease;
                    }
                    
                    .web-node:hover {
                        fill: var(--active-color) !important;
                        r: 6px;
                    }
                `}
            </style>

            <AnimationContainer style={{ '--active-color': animationColors[activeColor] } as React.CSSProperties}>
                <svg
                    width="100%"
                    height="100%"
                    viewBox="-400 -250 800 500"
                    style={{ overflow: 'visible' }}
                >
                    <g style={{ animation: 'float-web 6s ease-in-out infinite' }}>
                        {connections.map((conn) => (
                            <line
                                key={conn.key}
                                x1={conn.p1.x}
                                y1={conn.p1.y}
                                x2={conn.p2.x}
                                y2={conn.p2.y}
                                strokeWidth="1"
                                className="web-line"
                                style={{
                                    animationDelay: `${conn.delayFactor * 2}s`,
                                    animationFillMode: 'both'
                                }}
                            />
                        ))}

                        {nodes.map((node) => (
                            <g
                                key={node.id}
                                transform={`translate(${node.x}, ${node.y})`}
                            >
                                <circle
                                    r="3.5"
                                    className="web-node"
                                    style={{
                                        animationDelay: `${node.distanceFromCenter * 2}s`,
                                        animationFillMode: 'both'
                                    }}
                                />
                            </g>
                        ))}
                    </g>

                    <g>
                        <circle
                            r="45"
                            fill={animationColors[activeColor]}
                            style={{
                                animation: 'pulse 3s infinite',
                                opacity: 0.1,
                                filter: 'blur(15px)',
                                transition: 'fill 0.5s ease'
                            }}
                        />

                        <circle
                            r="32"
                            fill="none"
                            stroke={animationColors[activeColor]}
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            strokeOpacity="0.5"
                            style={{
                                animation: 'spin 10s linear infinite',
                                transition: 'stroke 0.5s ease'
                            }}
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 0 0"
                                to="360 0 0"
                                dur="20s"
                                repeatCount="indefinite"
                            />
                        </circle>

                        <circle
                            r="24"
                            fill={custom.navy}
                            stroke={animationColors[activeColor]}
                            strokeWidth="2"
                            style={{ transition: 'stroke 0.5s ease' }}
                        />

                        <foreignObject x="-24" y="-24" width="48" height="48">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                color: animationColors[activeColor],
                                transition: 'color 0.5s ease'
                            }}>
                                <Network size={28} />
                            </div>
                        </foreignObject>
                    </g>
                </svg>
            </AnimationContainer>
        </>
    )
}

export default NetworkAnimation;