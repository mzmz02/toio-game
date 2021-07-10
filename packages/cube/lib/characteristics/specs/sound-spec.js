"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
var clamp_1 = require("../../util/clamp");
// prettier-ignore
var Note;
(function (Note) {
    Note[Note["C0"] = 0] = "C0";
    Note[Note["CS0"] = 1] = "CS0";
    Note[Note["D0"] = 2] = "D0";
    Note[Note["DS0"] = 3] = "DS0";
    Note[Note["E0"] = 4] = "E0";
    Note[Note["F0"] = 5] = "F0";
    Note[Note["FS0"] = 6] = "FS0";
    Note[Note["G0"] = 7] = "G0";
    Note[Note["GS0"] = 8] = "GS0";
    Note[Note["A0"] = 9] = "A0";
    Note[Note["AS0"] = 10] = "AS0";
    Note[Note["B0"] = 11] = "B0";
    Note[Note["C1"] = 12] = "C1";
    Note[Note["CS1"] = 13] = "CS1";
    Note[Note["D1"] = 14] = "D1";
    Note[Note["DS1"] = 15] = "DS1";
    Note[Note["E1"] = 16] = "E1";
    Note[Note["F1"] = 17] = "F1";
    Note[Note["FS1"] = 18] = "FS1";
    Note[Note["G1"] = 19] = "G1";
    Note[Note["GS1"] = 20] = "GS1";
    Note[Note["A1"] = 21] = "A1";
    Note[Note["AS1"] = 22] = "AS1";
    Note[Note["B1"] = 23] = "B1";
    Note[Note["C2"] = 24] = "C2";
    Note[Note["CS2"] = 25] = "CS2";
    Note[Note["D2"] = 26] = "D2";
    Note[Note["DS2"] = 27] = "DS2";
    Note[Note["E2"] = 28] = "E2";
    Note[Note["F2"] = 29] = "F2";
    Note[Note["FS2"] = 30] = "FS2";
    Note[Note["G2"] = 31] = "G2";
    Note[Note["GS2"] = 32] = "GS2";
    Note[Note["A2"] = 33] = "A2";
    Note[Note["AS2"] = 34] = "AS2";
    Note[Note["B2"] = 35] = "B2";
    Note[Note["C3"] = 36] = "C3";
    Note[Note["CS3"] = 37] = "CS3";
    Note[Note["D3"] = 38] = "D3";
    Note[Note["DS3"] = 39] = "DS3";
    Note[Note["E3"] = 40] = "E3";
    Note[Note["F3"] = 41] = "F3";
    Note[Note["FS3"] = 42] = "FS3";
    Note[Note["G3"] = 43] = "G3";
    Note[Note["GS3"] = 44] = "GS3";
    Note[Note["A3"] = 45] = "A3";
    Note[Note["AS3"] = 46] = "AS3";
    Note[Note["B3"] = 47] = "B3";
    Note[Note["C4"] = 48] = "C4";
    Note[Note["CS4"] = 49] = "CS4";
    Note[Note["D4"] = 50] = "D4";
    Note[Note["DS4"] = 51] = "DS4";
    Note[Note["E4"] = 52] = "E4";
    Note[Note["F4"] = 53] = "F4";
    Note[Note["FS4"] = 54] = "FS4";
    Note[Note["G4"] = 55] = "G4";
    Note[Note["GS4"] = 56] = "GS4";
    Note[Note["A4"] = 57] = "A4";
    Note[Note["AS4"] = 58] = "AS4";
    Note[Note["B4"] = 59] = "B4";
    Note[Note["C5"] = 60] = "C5";
    Note[Note["CS5"] = 61] = "CS5";
    Note[Note["D5"] = 62] = "D5";
    Note[Note["DS5"] = 63] = "DS5";
    Note[Note["E5"] = 64] = "E5";
    Note[Note["F5"] = 65] = "F5";
    Note[Note["FS5"] = 66] = "FS5";
    Note[Note["G5"] = 67] = "G5";
    Note[Note["GS5"] = 68] = "GS5";
    Note[Note["A5"] = 69] = "A5";
    Note[Note["AS5"] = 70] = "AS5";
    Note[Note["B5"] = 71] = "B5";
    Note[Note["C6"] = 72] = "C6";
    Note[Note["CS6"] = 73] = "CS6";
    Note[Note["D6"] = 74] = "D6";
    Note[Note["DS6"] = 75] = "DS6";
    Note[Note["E6"] = 76] = "E6";
    Note[Note["F6"] = 77] = "F6";
    Note[Note["FS6"] = 78] = "FS6";
    Note[Note["G6"] = 79] = "G6";
    Note[Note["GS6"] = 80] = "GS6";
    Note[Note["A6"] = 81] = "A6";
    Note[Note["AS6"] = 82] = "AS6";
    Note[Note["B6"] = 83] = "B6";
    Note[Note["C7"] = 84] = "C7";
    Note[Note["CS7"] = 85] = "CS7";
    Note[Note["D7"] = 86] = "D7";
    Note[Note["DS7"] = 87] = "DS7";
    Note[Note["E7"] = 88] = "E7";
    Note[Note["F7"] = 89] = "F7";
    Note[Note["FS7"] = 90] = "FS7";
    Note[Note["G7"] = 91] = "G7";
    Note[Note["GS7"] = 92] = "GS7";
    Note[Note["A7"] = 93] = "A7";
    Note[Note["AS7"] = 94] = "AS7";
    Note[Note["B7"] = 95] = "B7";
    Note[Note["C8"] = 96] = "C8";
    Note[Note["CS8"] = 97] = "CS8";
    Note[Note["D8"] = 98] = "D8";
    Note[Note["DS8"] = 99] = "DS8";
    Note[Note["E8"] = 100] = "E8";
    Note[Note["F8"] = 101] = "F8";
    Note[Note["FS8"] = 102] = "FS8";
    Note[Note["G8"] = 103] = "G8";
    Note[Note["GS8"] = 104] = "GS8";
    Note[Note["A8"] = 105] = "A8";
    Note[Note["AS8"] = 106] = "AS8";
    Note[Note["B8"] = 107] = "B8";
    Note[Note["C9"] = 108] = "C9";
    Note[Note["CS9"] = 109] = "CS9";
    Note[Note["D9"] = 110] = "D9";
    Note[Note["DS9"] = 111] = "DS9";
    Note[Note["E9"] = 112] = "E9";
    Note[Note["F9"] = 113] = "F9";
    Note[Note["FS9"] = 114] = "FS9";
    Note[Note["G9"] = 115] = "G9";
    Note[Note["GS9"] = 116] = "GS9";
    Note[Note["A9"] = 117] = "A9";
    Note[Note["AS9"] = 118] = "AS9";
    Note[Note["B9"] = 119] = "B9";
    Note[Note["C10"] = 120] = "C10";
    Note[Note["CS10"] = 121] = "CS10";
    Note[Note["D10"] = 122] = "D10";
    Note[Note["DS10"] = 123] = "DS10";
    Note[Note["E10"] = 124] = "E10";
    Note[Note["F10"] = 125] = "F10";
    Note[Note["FS10"] = 126] = "FS10";
    Note[Note["G10"] = 127] = "G10";
    Note[Note["NO_SOUND"] = 128] = "NO_SOUND";
})(Note = exports.Note || (exports.Note = {}));
/**
 * @hidden
 */
var SoundSpec = /** @class */ (function () {
    function SoundSpec() {
    }
    SoundSpec.prototype.playPresetSound = function (soundId) {
        var arrangedSoundId = clamp_1.clamp(soundId, 0, 10);
        return {
            buffer: Buffer.from([2, arrangedSoundId, 255]),
            data: {
                soundId: arrangedSoundId
            }
        };
    };
    SoundSpec.prototype.playSound = function (operations, repeatCount) {
        var arrangedData = {
            operations: [],
            repeatCount: clamp_1.clamp(repeatCount, 0, 255),
            totalDurationMs: 0
        };
        var numOperations = Math.min(operations.length, 59);
        var buffer = Buffer.alloc(3 + 3 * numOperations);
        buffer.writeUInt8(3, 0); // control type
        buffer.writeUInt8(arrangedData.repeatCount, 1);
        buffer.writeUInt8(numOperations, 2);
        var totalDurationMs = 0;
        for (var i = 0; i < numOperations; i++) {
            var operation = operations[i];
            var duration = clamp_1.clamp(operation.durationMs / 10, 1, 255);
            var noteName = operation.noteName;
            // build arranged data
            totalDurationMs += duration;
            arrangedData.operations.push({
                durationMs: duration * 10,
                noteName: noteName
            });
            // build buffer
            buffer.writeUInt8(duration, 3 + 3 * i); // duration
            buffer.writeUInt8(noteName, 4 + 3 * i); // note name
            buffer.writeUInt8(255, 5 + 3 * i); // loudness
        }
        arrangedData.totalDurationMs = totalDurationMs * 10 * arrangedData.repeatCount;
        return {
            buffer: buffer,
            data: arrangedData
        };
    };
    SoundSpec.prototype.stopSound = function () {
        return {
            buffer: Buffer.from([1])
        };
    };
    return SoundSpec;
}());
exports.SoundSpec = SoundSpec;
