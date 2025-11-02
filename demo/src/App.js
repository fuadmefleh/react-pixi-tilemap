import { Application, extend } from '@pixi/react';
import { Container, Sprite, Texture } from 'pixi.js';
import { Tilemap, useTilemapLoader } from 'react-pixi-tilemap'

// Register PixiJS components for use in JSX
extend({ Container, Sprite });

const tilemap = process.env.PUBLIC_URL + '/stages/map.tmx'

const App = () => {
    const map = useTilemapLoader(tilemap)

    return (
        <Application width={window.innerWidth} height={window.innerHeight} options={{ resizeTo: window }}>
            <Tilemap map={map} scale={0.75}>
                {/* These sprites show off the layering order */}
                <sprite texture={Texture.WHITE} x={120} y={380} width={64} height={64} />
                <sprite texture={Texture.WHITE} x={700} y={420} width={64} height={64} />
                <sprite texture={Texture.WHITE} x={500} y={700} width={64} height={64} />
            </Tilemap>
        </Application>
    )
}

export default App;
