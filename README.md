# Myriam — scent side quest (iPhone update)

1. Extract the ZIP completely.
2. Open `START-HERE.html` in Chrome, Edge, Firefox, or Safari.

That file contains the complete app, including the picture, styles, and scripts. It works offline. Open it in a normal browser tab; file-preview panes may block JavaScript.

## Behavior

- “Let's go” opens the acceptance screen inside the same file using a native link. It also works if JavaScript is disabled.
- “Maybe another time” jumps away whenever the mouse gets near it, including with reduced-motion enabled. Decorative animations respect reduced-motion preferences.
- On iPhone and other touchscreens, Maybe jumps on finger-down and during a nearby finger drag. It cancels the resulting tap instead of accepting it. Keyboard users can activate Maybe normally. “No thanks” is always available.
- The accepted message is `betbiaa haha wa9teh nemchiw !`. Copy it and send it manually; the app does not send or record anything.

## Editable files

`index.html`, `styles.css`, `script.js`, `yes_style.css`, `yes_script.js`, and `assets/myriam.png` are the editable source. `yes_page.html` also works as a separate acceptance page. `version.json` contains the project version.

After editing the source, run `python build_portable.py` to regenerate `START-HERE.html`. Alternatively, upload the entire folder and use `index.html` directly.
