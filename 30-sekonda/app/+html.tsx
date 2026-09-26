import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

/**
 * HTML shell for the web build. Makes the web version behave like an app on a
 * phone: no pinch-zoom or double-tap zoom while tapping words quickly, dark
 * browser chrome, full-bleed under notches, and a dark background before the
 * JavaScript loads.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#1A1A2E" />
        <meta name="color-scheme" content="dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="30 Sekonda" />
        <title>30 Sekonda</title>
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: webStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const webStyles = `
html, body { background-color: #1A1A2E; }
body { overscroll-behavior: none; -webkit-tap-highlight-color: transparent; }
* { touch-action: manipulation; }
`;
