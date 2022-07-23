import type { NodePath } from '@babel/traverse';

/**
 * Checks if the input Identifier is part of a destructuring Assignment
 * and the name of the property key matches the input name
 */
export default function isDestructuringAssignment(
  path: NodePath,
  name: string,
): boolean {
  if (!path.isObjectProperty()) {
    return false;
  }

  const id = path.get('key');

  return (
    id.isIdentifier() &&
    id.node.name === name &&
    path.parentPath.isObjectPattern()
  );
}
