module.exports = {
  preset: 'react-native',
  moduleIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
  },
};
