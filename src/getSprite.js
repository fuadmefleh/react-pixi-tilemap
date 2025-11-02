import { Rectangle, Texture } from 'pixi.js'
import React from "react"

// Helper function to get directory path from a URL/path string
const getDirname = (filepath) => {
    const lastSlash = filepath.lastIndexOf('/')
    return lastSlash >= 0 ? filepath.substring(0, lastSlash) : ''
}

const getTilesetForGID = (gid, tilesets) => {
    let result
    for (const tileset of tilesets) {
        if (gid >= tileset.firstGid) {
            result = tileset
        }
    }
    return result
}

const getTileTexture = (tile, map, tileset) => {
    const { image, tileHeight, tileWidth } = tileset
    const spriteIndex = tile.gid - tileset.firstGid

    const x = (spriteIndex % (image.width / tileWidth)) * tileWidth
    const y = Math.floor(spriteIndex / (image.height / tileHeight)) * tileHeight

    const rootDir = getDirname(map.path)
    const baseTexture = Texture.from(`${rootDir}/${tileset.image.source}`)

    return new Texture(baseTexture, new Rectangle(x, y, tileHeight, tileWidth))
}

const getTileSprite = (tileType, tile, map) => {
    const tileset = getTilesetForGID(tile.gid, map.tileSets)

    if (tileset) {
        const { x, width, height } = tile
        const texture = getTileTexture(tile, map, tileset)

        // Objects are bottom aligned for some reason. This pushes them up so they align with the rest of the tilemap.
        let y = tile.y
        if (tileType === 'object') {
            y -= height
        }

        return <sprite key={`(${x},${y})`}
            texture={texture}
            x={x}
            y={y}
            width={width}
            height={height}
        />
    }
}

export default getTileSprite
