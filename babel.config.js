module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'API_KEY',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],

    'react-native-reanimated/plugin',
  ],
};
