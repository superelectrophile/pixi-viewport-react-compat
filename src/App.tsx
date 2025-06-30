import { useRef, useEffect, useState } from "react";
import "./App.css";
import {
  Graphics,
  GraphicsContext,
  Container,
  Sprite,
  Texture,
  Assets,
} from "pixi.js";
import { Viewport } from "./Viewport";
import { Application, extend } from "@pixi/react";
import reactSvg from "/react.svg?no-inline";
import viteSvg from "/vite.svg?no-inline";

// extend tells @pixi/react what Pixi.js components are available
extend({ Container, Graphics, Sprite });

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const graphicsRef = useRef(new GraphicsContext());
  const [reactTexture, setReactTexture] = useState<Texture>(Texture.EMPTY);
  const [viteTexture, setViteTexture] = useState<Texture>(Texture.EMPTY);

  const [iconScale, setIconScale] = useState(2);

  useEffect(() => {
    (async () => {
      const graphics = new Graphics(graphicsRef.current);
      graphics.clear();
      graphics.setFillStyle({ color: "red" });
      graphics.rect(0, 0, 100, 100);
      graphics.fill();
      graphics.setFillStyle({ color: "blue" });
      graphics.circle(200, 300, 50);
      graphics.fill();

      const reactTexture = await Assets.load({
        src: reactSvg,
        data: {
          resolution: 4,
        },
      });
      setReactTexture(reactTexture);

      const viteTexture = await Assets.load({
        src: viteSvg,
        data: {
          resolution: 4,
        },
      });
      setViteTexture(viteTexture);
    })();
  }, []);

  return (
    <>
      <h1>Pixi-Viewport working with React Demo</h1>
      <p>Try clicking on logos.</p>
      <div id="pixi-container" ref={containerRef}>
        <Application
          resizeTo={containerRef}
          background="black"
          antialias={true}
          autoDensity={true}
          resolution={2}
        >
          {/* Arguments to pixi-viewport constructor work as normal */}
          <Viewport passiveWheel={false}>
            <pixiContainer>
              <pixiSprite
                anchor={0.5}
                texture={reactTexture}
                eventMode={"static"}
                x={400}
                y={200}
                scale={iconScale}
                onClick={() => {
                  setIconScale(iconScale + 0.1);
                }}
              />
              <pixiSprite
                anchor={0.5}
                texture={viteTexture}
                eventMode={"static"}
                x={600}
                y={200}
                scale={iconScale}
                onClick={() => {
                  setIconScale(iconScale - 0.1);
                }}
              />
              <pixiGraphics draw={() => {}} context={graphicsRef.current} />
              <pixiGraphics
                x={200}
                y={200}
                draw={() => {}}
                context={graphicsRef.current}
              />
            </pixiContainer>
          </Viewport>
        </Application>
      </div>
    </>
  );
}

export default App;
