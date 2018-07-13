/*
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/*global jest, describe, beforeEach, it, expect*/

jest.disableAutomock();

describe('resolveHOC', () => {
  let builders;
  let utils;
  let resolveHOC;

  function parse(src) {
    const root = utils.parse(src);
    return root.get('body', root.node.body.length - 1, 'expression');
  }

  beforeEach(() => {
    const recast = require('recast');
    builders = recast.types.builders;
    resolveHOC = require('../resolveHOC').default;
    utils = require('../../../tests/utils');
  });

  it('resolves simple hoc', () => {
    const path = parse(['hoc(42);'].join('\n'));
    expect(resolveHOC(path)).toEqualASTNode(builders.literal(42));
  });

  it('resolves simple hoc w/ multiple args', () => {
    const path = parse(['hoc1(arg1a, arg1b)(42);'].join('\n'));
    expect(resolveHOC(path)).toEqualASTNode(builders.literal(42));
  });

  it('resolves nested hocs', () => {
    const path = parse(
      ['hoc2(arg2b, arg2b)(', '  hoc1(arg1a, arg2a)(42)', ');'].join('\n'),
    );
    expect(resolveHOC(path)).toEqualASTNode(builders.literal(42));
  });

  it('resolves really nested hocs', () => {
    const path = parse(
      [
        'hoc3(arg3a, arg3b)(',
        '  hoc2(arg2b, arg2b)(',
        '    hoc1(arg1a, arg2a)(42)',
        '  )',
        ');',
      ].join('\n'),
    );
    expect(resolveHOC(path)).toEqualASTNode(builders.literal(42));
  });
});
