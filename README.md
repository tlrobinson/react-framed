react-framed
============

react-framed provides 4 React components which are useful for rendering content in iframes or popup windows with varying degrees of isolation.

The components, `SameOriginFrame`, `SameOriginWindow`, `CrossOriginFrame`, and `CrossOriginWindow`, are just the 4 permutations of the `SameOrigin` or `CrossOrigin` higher-order components with the `Window` and `Frame` components:

* `Frame`: Renders an `<iframe>`.
* `Window`: Renders a pop-up window using `window.open()`.
* `SameOrigin`: Allows rendering of child components directly, provides some isolation.
* `CrossOrigin`: Renders an external html file in an iframe, passes props via `postMessage`. Provides full isolation.
