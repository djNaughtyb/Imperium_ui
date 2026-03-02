import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UniverseThemeProvider } from "./context/UniverseThemeProvider";
import { StudioStateProvider } from "./context/StudioStateProvider";
import { OverlayProvider } from "./context/OverlayProvider";

import StudioShell from "./studio/StudioShell";

import WallpaperLayer from "./layers/WallpaperLayer";
import ParallaxLayer from "./layers/ParallaxLayer";
import AnimatedOverlay from "./layers/AnimatedOverlay";

import ComicsMode from "./modes/ComicsMode";

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