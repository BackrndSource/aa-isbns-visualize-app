import './App.css'
import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import { ROOT_URL } from './settings.ts'

import Deck from './components/Deck'
import LayerControl from './components/LayerControl.tsx'

import { DATASETS } from './settings.ts'

export default function App() {
    function createLayersConfig() {
        let layersConfig = []

        for (let dataset of DATASETS) {
            if (dataset != 'md5') {
                layersConfig.push({
                    id: dataset,
                    url: `${ROOT_URL}/${dataset}_isbns_files`,
                    color: [255, 0, 0],
                    opacity: 0.8,
                    visible: false,
                })
            }
        }

        layersConfig.push({
            // md5 should be the last to be always the top-layer. Be able to reorder layers should be better solution :)
            id: 'md5',
            url: `${ROOT_URL}/md5_isbns_files`,
            color: [0, 255, 0],
            opacity: 0.8,
            visible: true,
        })

        return layersConfig
    }

    const [layersConfig, setLayersConfig] = useState(createLayersConfig())

    return (
        <>
            <Deck layersConfig={layersConfig}></Deck>
            <LayerControl
                layersConfig={layersConfig}
                setLayersConfig={setLayersConfig}
            />
        </>
    )
}

export function renderToDOM(container: HTMLDivElement) {
    createRoot(container).render(<App />)
}
