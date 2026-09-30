# Saga Diorama

An animated pixel-art diorama cycling through one lightsaber duel from each of the nine Star Wars saga films — built as a seamless, hours-long loop for lofi / cinematic ambient video.

**Live:** https://hannibalm-ux.github.io/saga-diorama/ *(after enabling GitHub Pages, see below)*

- 9 scenes × 24 s = **216 s loop**; the last scene transitions back into the first
- Native **480×270**, integer-scaled (exactly 4× at 1920×1080), no smoothing
- Six transitions: saber-line wipe, holographic dissolve, camera pan, display-platform turntable, saber-glow bloom, melt
- Per-scene palettes and effects: lava and falling girders, steam vents, Force lightning, snow gusts, rain and lightning, reflective floors, waving cloth
- One self-contained HTML file, no dependencies

| Ep. | Duel | Setting |
|---|---|---|
| I | Qui-Gon vs Maul | Theed generator |
| II | Yoda vs Dooku | Geonosis hangar |
| III | Obi-Wan vs Anakin | Mustafar |
| IV | Obi-Wan vs Vader | Death Star corridor |
| V | Luke vs Vader | Cloud City shaft |
| VI | Luke vs Vader | Emperor's throne room |
| VII | Kylo vs Rey | Starkiller forest |
| VIII | Rey & Kylo vs Praetorian Guards | Red throne room |
| IX | Rey vs Kylo | Kef Bir wreckage |

## Controls
`F` / double-click: fullscreen · `Space`: pause · `#t=NN` seek to NN seconds · `#s=N` show only scene N · `#pause` start paused

## Recording
Open fullscreen at 1920×1080 and capture with OBS (or seek with `#t=`), then loop the 216 s clip in your editor.

## Build from source
```bash
./build.sh   # src/*.js -> index.html
```

## Windows screensaver
`screensaver/` holds the WinForms + WebView2 host (`Program.cs`). A prebuilt package with `install.bat` is on the **Releases** page. Requires the Microsoft Edge WebView2 Runtime (built into Windows 11). Untested on real Windows at time of writing — issues welcome.

## Disclaimer
Unofficial, non-commercial fan tribute. Star Wars and its characters, names and settings are trademarks/copyrights of Lucasfilm Ltd. / Disney. No film assets are used; all art is procedurally drawn.

## License
Code: MIT (see LICENSE).
