module.exports = {
    // Entry point for your application
    entry: './src/index.js', // Replace with your actual entry point file
  
    // Output configuration
    output: {
      filename: 'bundle.js', // Output filename
      path: path.resolve(__dirname, 'dist'), // Output directory (adjust if needed)
    },
  
    // Fallback configuration for the `util` module (replace with polyfill if needed)
    resolve: {
      fallback: {
        "util": false ,// Replace with "util": require.resolve("timers-browserify") for polyfill
        "crypto": require.resolve("crypto-browserify")
      }
    },
  
    // Loaders to handle different file types (optional)
    module: {
      rules: [
        // Add loaders for specific file types (e.g., JavaScript, CSS) here
      ]
    },
  };
  