import reactCSS from 'reactcss'
import Slider from '@mui/material/Slider'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'

import ColorPicker from './ColorPicker'

export default function DatasetCard(props) {
    const layerConfig = props.layerConfig

    const handleColorChange = (color) => {
        props.onColorChange(color)
    }

    const handleOpacityChange = (e) => {
        props.onOpacityChange(e.target.value)
    }

    const handleVisibleChange = (e) => {
        props.onVisibleChange(e.target.checked)
    }

    const styles = reactCSS({
        default: {
            card: {
                padding: '0 1rem',
                background: 'rgba(30,30,30,.75)',
                color: '#d1d1d1',
            },
        },
    })

    return (
        <Paper style={styles.card} elevation={3}>
            <Stack
                alignItems="center"
                justifyContent={'space-between'}
                direction="row"
                gap={'1rem'}
            >
                <Checkbox
                    checked={layerConfig.visible}
                    onChange={handleVisibleChange}
                    sx={{
                        color: `rgb(${layerConfig.color[0]}, ${layerConfig.color[1]}, ${layerConfig.color[2]})`,
                        '&.Mui-checked': {
                            color: `rgb(${layerConfig.color[0]}, ${layerConfig.color[1]}, ${layerConfig.color[2]})`,
                        },
                    }}
                />
                <span>{layerConfig.id}</span>
                <Slider
                    value={layerConfig.opacity}
                    sx={{ width: '5rem' }}
                    aria-label="Opacity"
                    onChange={handleOpacityChange}
                    valueLabelDisplay="auto"
                    size="small"
                    step={0.01}
                    min={0}
                    max={1}
                    defaultValue={1}
                />
                <ColorPicker
                    color={{
                        r: layerConfig.color[0],
                        g: layerConfig.color[1],
                        b: layerConfig.color[2],
                        a: 1,
                    }}
                    onChange={handleColorChange}
                />
            </Stack>
        </Paper>
    )
}
