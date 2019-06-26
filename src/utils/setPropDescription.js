/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import type { PropDescriptor } from '../types';
import type Documentation from '../Documentation';
import getPropertyName from './getPropertyName';
import { getDocblock } from './docblock';

export default (documentation: Documentation, propertyPath: NodePath) => {
  const propName = getPropertyName(propertyPath);
  if (!propName) return;

  const propDescriptor: PropDescriptor = documentation.getPropDescriptor(
    propName,
  );
  if (propDescriptor.description) {
    return;
  } else {
    propDescriptor.description = getDocblock(propertyPath) || '';
    if (propDescriptor.description.includes('Appearance:')) {
      propDescriptor.createControl = true;
    }

    const { fields } = propDescriptor;
    const { description } = propDescriptor;
    // Account for flow Refinement
    if (description === undefined || fields === undefined) {
      return;
    }
    const splitLines = description.split('\n');
    const lines = splitLines.filter(line => line.includes('@'));
    lines.forEach(field => {
      if (field.includes(' ')) {
        fields.push({
          [field.substring(1, field.indexOf(' '))]: field.substring(
            field.indexOf(' ') + 1,
          ),
        });
      } else {
        fields.push({ [field.substring(1)]: true });
      }
    });
  }
};
