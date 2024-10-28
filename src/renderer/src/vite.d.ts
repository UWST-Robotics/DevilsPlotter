/// <reference types="vite/client" />
/// <reference types="electron-vite/env" />


/**
 * Bridge between the main and renderer processes for Electron API calls.
 * Type and implementation are defined in the preload script.
 */
declare const electronAPI: import("../../preload/preload.ts").default | undefined; // <-- Uses "import" to use d.ts as an ambient module

/**
 * Application version string. Imported from package.json during the build process.
 */
declare const APP_VERSION: string | null;