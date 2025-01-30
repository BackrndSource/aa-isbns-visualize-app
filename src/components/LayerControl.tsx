import reactCSS from 'reactcss'
import DatasetCard from './DatasetCard'
import Stack from '@mui/material/Stack'

export default function LayerControl({ layersConfig, setLayersConfig }) {
    const handleColorChange = (index, color) => {
        const updatedLayers = [...layersConfig]
        updatedLayers[index].color = [color.rgb.r, color.rgb.g, color.rgb.b]
        updatedLayers[index].visible = false // Fix color not change, force render
        setLayersConfig(updatedLayers)

        setTimeout(() => {
            // Fix color not change, force render
            const updatedLayers = [...layersConfig]
            updatedLayers[index].visible = true
            setLayersConfig(updatedLayers)
        }, 10)
    }

    const handleOpacityChange = (index, value) => {
        const updatedLayers = [...layersConfig]
        updatedLayers[index].opacity = value
        setLayersConfig(updatedLayers)
    }

    const handleVisibleChange = (index, value) => {
        const updatedLayers = [...layersConfig]
        updatedLayers[index].visible = value
        setLayersConfig(updatedLayers)
    }

    const styles = reactCSS({
        default: {
            stack: {
                position: 'absolute',
                zIndex: '2',
                gap: '.5rem',
                maxHeight: '100dvh',
                overflowY: 'auto',
                padding: '.5rem .5rem 8rem .5rem',
                backdropFilter: 'blur(10px)',
            },
        },
    })

    return (
        <Stack sx={styles.stack}>
            {layersConfig.map((layerConfig, index) => (
                <DatasetCard
                    layerConfig={layerConfig}
                    onColorChange={(color) => handleColorChange(index, color)}
                    onVisibleChange={(value) =>
                        handleVisibleChange(index, value)
                    }
                    onOpacityChange={(value) =>
                        handleOpacityChange(index, value)
                    }
                />
            ))}
        </Stack>
    )
}
