"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
/**
 * @hidden
 */
var IdSpec = /** @class */ (function () {
    function IdSpec() {
    }
    IdSpec.prototype.parse = function (buffer) {
        if (buffer.byteLength < 1) {
            throw new Error('parse error');
        }
        var type = buffer.readUInt8(0);
        switch (type) {
            case 1:
                if (buffer.byteLength < 11) {
                    break;
                }
                return {
                    buffer: buffer,
                    data: {
                        x: buffer.readUInt16LE(1),
                        y: buffer.readUInt16LE(3),
                        angle: buffer.readUInt16LE(5),
                        sensorX: buffer.readUInt16LE(7),
                        sensorY: buffer.readUInt16LE(9)
                    },
                    dataType: 'id:position-id'
                };
            case 2:
                if (buffer.byteLength < 7) {
                    break;
                }
                return {
                    buffer: buffer,
                    data: {
                        standardId: buffer.readUInt32LE(1),
                        angle: buffer.readUInt16LE(5)
                    },
                    dataType: 'id:standard-id'
                };
            case 3:
                return { buffer: buffer, dataType: 'id:position-id-missed' };
            case 4:
                return { buffer: buffer, dataType: 'id:standard-id-missed' };
            default:
                break;
        }
        // error
        throw new Error('parse error');
    };
    return IdSpec;
}());
exports.IdSpec = IdSpec;
