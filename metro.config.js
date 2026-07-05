// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Tell Metro to watch pnpm’s node_modules folder
config.watchFolders = [path.join(__dirname, 'node_modules')];

// Resolve symlinked modules correctly
config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')];
// Apply NativeWind
module.exports = withNativeWind(config, { input: './global.css' });
