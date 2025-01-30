export const ROOT_URL = 'tiles'
export const DATASETS = [
    'cadal_ssno',
    'cerlalc',
    'duxiu_ssid',
    'edsebk',
    'gbooks',
    'goodreads',
    'ia',
    'isbndb',
    'isbngrp',
    'libby',
    'md5',
    'nexusstc_download',
    'nexusstc',
    'oclc',
    'ol',
    'rgb',
    'trantor',
]

export const dimensions: {
    width: number
    height: number
    tileSize: number
    maxLevel: number
} = {
    width: 50_000,
    height: 50_000,
    tileSize: 5000,
    maxLevel: 4,
}

import type { OrthographicViewState } from '@deck.gl/core'
export const INITIAL_VIEW_STATE: OrthographicViewState = {
    target: [25_000, 20_000, 0],
    zoom: -7,
}
