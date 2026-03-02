import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UniverseThemeProvider } from "./src/context/UniverseThemeProvider";
import { StudioStateProvider } from "./src/context/StudioStateProvider";
import { OverlayProvider } from "./src/context/OverlayProvider";

import StudioShell from "./src/studio/StudioShell";

import WallpaperLayer from "./src/layers/WallpaperLayer";
import ParallaxLayer from "./src/layers/ParallaxLayer";
import AnimatedOverlay from "./src/layers/AnimatedOverlay";

import ComicsMode from "./src/modes/ComicsMode";

export default function App() {
  return (
    <UniverseThemeProvider>
      <StudioStateProvider>
        <OverlayProvider>
          <Router>
            <div className="relative w-full h-full overflow-hidden">

              {/* Cinematic Layers */}
              <WallpaperLayer />
              <ParallaxLayer depth={2} />
              <AnimatedOverlay />

              {/* Main Studio Frame */}
              <StudioShell>
                <Routes>
                  <Route path="/comics" element={<ComicsMode />} />
                </Routes>
              </StudioShell>

            </div>
          </Router>
        </OverlayProvider>
      </StudioStateProvider>
    </UniverseThemeProvider>
  );
}