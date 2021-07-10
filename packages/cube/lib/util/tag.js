"use strict";
/**
 * Copyright (c) 2020-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
/**
 * tag handling utility for toio cube's operation
 *
 * @hidden
 */
exports.createTagHandler = function () {
    var tag = 0;
    return {
        current: function () {
            return tag;
        },
        next: function () {
            tag = (tag + 1) % 256;
            return tag;
        }
    };
};
