const plugins = [
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ],
  'lodash',
  '@babel/plugin-syntax-dynamic-import',
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true,
    },
  ],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
];

module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    env: {
      development: {
        plugins: [...plugins, '@babel/plugin-transform-react-jsx-source'],
      },
      production: {
        plugins,
      },
    },
  };
};
