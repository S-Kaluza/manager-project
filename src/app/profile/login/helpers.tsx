import {CubeMesh, Face} from "@/app/profile/StyledComponents";

export const getHSLA = (colorName, hueAdjustment = 0) => {
    switch (colorName) {
        case 'red': return { h: 0, s: 100, l: 50 };
        case 'green': return { h: 120, s: 100, l: 50 };
        case 'yellow': return { h: 50 + hueAdjustment, s: 100, l: 50 }; // Base yellow is usually ~50-60
        default: return { h: 0, s: 0, l: 100 };
    }
};

export const Cube = ({ colorBase }) => {
    // Standard cube face transforms
    const faces = [
        { id: 1, rotate: 'rotateY(0deg)', translate: 50 },    // Front
        { id: 2, rotate: 'rotateY(180deg)', translate: 50 },  // Back
        { id: 3, rotate: 'rotateY(90deg)', translate: 50 },   // Right
        { id: 4, rotate: 'rotateY(-90deg)', translate: 50 },  // Left
        { id: 5, rotate: 'rotateX(90deg)', translate: 50 },   // Top
        { id: 6, rotate: 'rotateX(-90deg)', translate: 50 },  // Bottom
    ];

    return (
        <CubeMesh>
            {faces.map(face => (
                <Face
                    key={face.id}
                    rotate={face.rotate}
                    translate={face.translate}
                    colorBase={colorBase}
                />
            ))}
        </CubeMesh>
    );
};