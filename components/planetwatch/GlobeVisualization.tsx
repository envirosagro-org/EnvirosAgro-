
import React from 'react';
import Globe from 'react-globe.gl';

export const GlobeVisualization = () => {
    const data = [
        {
            lat: -23.5505,
            lng: -46.6333,
            size: 0.5,
            color: 'red'
        }
    ];

    return (
        <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            pointsData={data}
            pointAltitude="size"
            pointColor="color"
        />
    );
};
