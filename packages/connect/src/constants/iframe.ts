// Message called from iframe.html inline script before "window.onload" event. This is first message from iframe to window.opener.
export const BOOTSTRAP = '@trezor/connect/iframe/bootstrap';
// Message from iframe.js to window.opener, called after "window.onload" event. This is second message from iframe to window.opener.
export const LOADED = '@trezor/connect/iframe/loaded';
// Message from window.opener to iframe.js
export const INIT = '@trezor/connect/iframe/init';
// Error message from iframe.js to window.opener. Could be thrown during iframe initialization process
export const ERROR = '@trezor/connect/iframe/error';
// Message from window.opener to iframe. Call method
export const CALL = '@trezor/connect/iframe/call';
