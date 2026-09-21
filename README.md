# KiKoGame – No Challenge

Experimental KiKoGame condition in which the **challenge-related gamification
elements are removed** while the remaining KiKoGame design is retained.

## Removed in this condition

- Asteroids / comets
- Collision hazards
- Three-life / health system
- Healing keys
- Collision sound
- Healing sound
- Game-over due to lost lives
- "Repair the spaceship" restart mechanic

## Retained

- KiKoGame start screen and logo
- Space narrative / AIity
- Spaceship avatar and arrow-key navigation
- Moving cosmos background
- Five departments and all assessment questions
- Department progress display
- Quiz feedback and final score
- AIity planet / mission completion
- Background music and click sound
- Pause screen and rule review

## Rules

This build loads exactly **9** rules images:

`PICS/Rules/Rules/Ru1.png` through `Ru9.png`

## Before deploying

Copy the retained binary assets from the normal KiKoGame repository into the
`PICS` folders in this repository. See `PICS/ASSETS_TO_COPY.txt`.

## Vercel

Static app:

- Framework Preset: Other
- Root Directory: `./`
- No build command
- No output directory
- No environment variables
