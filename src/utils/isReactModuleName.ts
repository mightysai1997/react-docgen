const reactModules = [
  'react',
  'react/addons',
  'react-native',
  'proptypes',
  'prop-types',
];

/**
 * Takes a module name (string) and returns true if it refers to a root react
 * module name.
 *
 * TODO TESTME
 */
export default function isReactModuleName(moduleName: string): boolean {
  return reactModules.includes(moduleName.toLowerCase());
}
