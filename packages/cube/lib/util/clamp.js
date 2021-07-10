"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
/**
 * clamp function
 *
 * @param value - the value to be clamped
 * @param min - the lower bound of the clamping range
 * @param max - the upper bound of the clamping range
 *
 * @hidden
 */
function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
exports.clamp = clamp;
