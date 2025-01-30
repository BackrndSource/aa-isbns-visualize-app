import { DeckGL } from 'deck.gl'
import { OrthographicView } from '@deck.gl/core'

import { TileLayer } from '@deck.gl/geo-layers'
import { BitmapLayer } from '@deck.gl/layers'
import { load } from '@loaders.gl/core'
import { clamp } from '@math.gl/core'
import { COUNTRIES } from '../countries.ts'
import { dimensions, INITIAL_VIEW_STATE } from '../settings.ts'
import { addIsbnCheckDigit } from '../utils.ts'

const Deck = ({ layersConfig }) => {
    const layers = layersConfig.map(({ id, url, color, opacity, visible }) => {
        return new TileLayer<ImageBitmap>({
            id,
            opacity: opacity,
            visible: visible,
            pickable: true,
            tileSize: dimensions.tileSize,
            minZoom: -dimensions.maxLevel,
            maxZoom: 0,
            extent: [0, 0, dimensions.width, dimensions.height],
            getTileData: ({ index }) => {
                const { x, y, z } = index
                return load(
                    `${url}/${dimensions.maxLevel + z}/${x}_${y}.png`
                ) as Promise<ImageBitmap>
            },

            renderSubLayers: (props) => {
                const [[left, bottom], [right, top]] = props.tile.boundingBox
                const { width, height } = dimensions
                const { data, ...otherProps } = props
                return new BitmapLayer(otherProps, {
                    image: props.data,
                    bounds: [
                        clamp(left, 0, width),
                        clamp(top, 0, height),
                        clamp(right, 0, width),
                        clamp(bottom, 0, height),
                    ],
                    textureParameters: {
                        minFilter: 'nearest',
                        magFilter: 'nearest',
                    },
                    tintColor: color,
                })
            },
        })
    })

    function calculateIsbnFromDeckInfo({ tile, bitmap, layer }) {
        const x = tile.boundingBox[0][0] + bitmap.pixel[0]
        const y = tile.boundingBox[0][1] + bitmap.pixel[1]
        const position = x + y * layer.props.extent[2]
        return `${addIsbnCheckDigit(position + 978000000000)}`
    }

    function getTooltip(info) {
        const { tile, bitmap } = info
        if (tile && bitmap) {
            if (tile.index.z !== 0) {
                return null
            }
            const isbn = calculateIsbnFromDeckInfo(info)
            const country =
                Object.entries(COUNTRIES).find(([key]) =>
                    isbn.startsWith(key.replace('-', ''))
                )?.[1] || 'Unknown'

            return `${isbn} (${country})`
        }
        return null
    }

    function searchIsbn(info) {
        const { tile, bitmap } = info
        if (tile && bitmap) {
            if (tile.index.z !== 0) {
                return null
            }
            const isbn = calculateIsbnFromDeckInfo(info)
            window.open(`https://annas-archive.org/search?q=${isbn}`, '_blank')
        }
    }

    return (
        <DeckGL
            views={[new OrthographicView({ id: 'ortho' })]}
            initialViewState={{ ortho: INITIAL_VIEW_STATE }}
            controller={true}
            layers={layers}
            getTooltip={getTooltip}
            onClick={searchIsbn}
        />
    )
}

export default Deck
