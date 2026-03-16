// Service worker registration — extracted from inline script
// to comply with Content-Security-Policy script-src 'self'.
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(function () {})
