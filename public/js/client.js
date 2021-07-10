'use strict';	// 厳格モードとする

// オブジェクト
const socket = io.connect();	// クライアントからサーバーへの接続要求

// キャンバス
const canvas = document.querySelector('#canvas-2d');

// キャンバスオブジェクト
const screen = new Screen(socket, canvas);

// キャンバスの描画開始
screen.animate(0);

// ページがunloadされる時（閉じる時、再読み込み時、別ページへ移動時）は、通信を切断する
$(window).on(
    'beforeunload',
    (event) => {
        socket.disconnect();
    });

let cube = null;

// document.getElementById('connect').addEventListener('click', async () => {
//   cube = await new NearestScanner().start();
//   document.getElementById('address').innerHTML = cube.address;
//   document.getElementById('id').innerHTML = cube.id;

//   document.body.className = 'cube-connecting';

//   await cube.connect();
//   cube.on('battery:battery', info => (document.getElementById('battery').innerHTML = info.level));
//   cube.on('button:press', info => (document.getElementById('button').innerHTML = info.pressed));
//   cube.on('sensor:collision', info => (document.getElementById('collision').innerHTML = info.isCollisionDetected));
//   cube.on('id:position-id', info => (document.getElementById('position-id').innerHTML = JSON.stringify(info)));
//   cube.on('id:position-id-missed', () => (document.getElementById('position-id').innerHTML = ''));
//   cube.on('id:standard-id', info => (document.getElementById('standard-id').innerHTML = JSON.stringify(info)));
//   cube.on('id:standard-id-missed', () => (document.getElementById('standard-id').innerHTML = ''));

//   document.body.className = 'cube-connected';
// });

// document.getElementById('move-forward').addEventListener('mousedown', async () => cube.move(30, 30, 0));


// キーの入力（キーダウン、キーアップ）の処理
let objMovement = {};	// 動作
$(document).on(
    'keydown keyup',
    (event) => {
        const KeyToCommand = {
            'ArrowUp': 'forward',
            'ArrowDown': 'back',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
        };
        const command = KeyToCommand[event.key];
        if (command) {
            if (event.type === 'keydown') {
                objMovement[command] = true;
            }
            else // if( event.type === 'keyup' )
            {
                objMovement[command] = false;
            }
            // サーバーに イベント名'change-my-movement'と、objMovementオブジェクトを送信
            socket.emit('change-my-movement', objMovement);
        }

        if (' ' === event.key
            && 'keydown' === event.type) {
            // サーバーに イベント名'shoot'を送信
            socket.emit('shoot');
        }
    });


// let cube = null;

// document.getElementById('connect').addEventListener('click', async () => {
//   cube = await new NearestScanner().start();
//   document.getElementById('address').innerHTML = cube.address;
//   document.getElementById('id').innerHTML = cube.id;

//   document.body.className = 'cube-connecting';

//   await cube.connect();
//   cube.on('battery:battery', info => (document.getElementById('battery').innerHTML = info.level));
//   cube.on('button:press', info => (document.getElementById('button').innerHTML = info.pressed));
//   cube.on('sensor:collision', info => (document.getElementById('collision').innerHTML = info.isCollisionDetected));
//   cube.on('id:position-id', info => (document.getElementById('position-id').innerHTML = JSON.stringify(info)));
//   cube.on('id:position-id-missed', () => (document.getElementById('position-id').innerHTML = ''));
//   cube.on('id:standard-id', info => (document.getElementById('standard-id').innerHTML = JSON.stringify(info)));
//   cube.on('id:standard-id-missed', () => (document.getElementById('standard-id').innerHTML = ''));

//   document.body.className = 'cube-connected';
// });

// document.getElementById('getBatteryStatus').addEventListener('click', async () => {
//   const e = document.getElementById('battery');
//   e.innerHTML = '';
//   e.innerHTML = (await cube.getBatteryStatus()).level;
// });

// document.getElementById('getButtonStatus').addEventListener('click', async () => {
//   const e = document.getElementById('button');
//   e.innerHTML = '';
//   e.innerHTML = (await cube.getButtonStatus()).pressed;
// });

// document.getElementById('getCollisionStatus').addEventListener('click', async () => {
//   const e = document.getElementById('collision');
//   e.innerHTML = '';
//   e.innerHTML = (await cube.getCollisionStatus()).isCollisionDetected;
// });

// document.getElementById('getSlopeStatus').addEventListener('click', async () => {
//   const e = document.getElementById('slope');
//   e.innerHTML = '';
//   e.innerHTML = (await cube.getSlopeStatus()).isSloped;
// });

// document.getElementById('move-forward').addEventListener('touchstart', async () => cube.move(30, 30, 0));
// document.getElementById('move-backward').addEventListener('touchstart', async () => cube.move(-30, -30, 0));
// document.getElementById('move-left').addEventListener('touchstart', async () => cube.move(-30, 30, 0));
// document.getElementById('move-right').addEventListener('touchstart', async () => cube.move(30, -30, 0));
// document.getElementById('move').addEventListener('touchstart', async ev => ev.preventDefault());
// document.getElementById('move').addEventListener('touchend', async () => cube.stop());
// document.getElementById('move').addEventListener('touchend', async ev => ev.preventDefault());

// document.getElementById('move-forward').addEventListener('mousedown', async () => cube.move(30, 30, 0));
// document.getElementById('move-backward').addEventListener('mousedown', async () => cube.move(-30, -30, 0));
// document.getElementById('move-left').addEventListener('mousedown', async () => cube.move(-30, 30, 0));
// document.getElementById('move-right').addEventListener('mousedown', async () => cube.move(30, -30, 0));
// document.getElementById('move').addEventListener('mouseup', async () => cube.stop());
// document.getElementById('move').addEventListener('mouseleave', async () => cube.stop());

// document.getElementById('turnOnLight-red').addEventListener('click', () => cube.turnOnLight({ red: 255, durationMs: 0 }));
// document.getElementById('turnOnLight-green').addEventListener('click', () => cube.turnOnLight({ green: 255, durationMs: 0 }));
// document.getElementById('turnOnLight-blue').addEventListener('click', () => cube.turnOnLight({ blue: 255, durationMs: 0 }));
// document.getElementById('turnOffLight').addEventListener('click', () => cube.turnOffLight());

// document.getElementById('playPresetSound').addEventListener('click', ev => {
//   if (ev.target.dataset.soundId) {
//     cube.playPresetSound(ev.target.dataset.soundId);
//   }
// });


// スタートボタン
$('#start-button').on(
    'click',
    () => {
        // サーバーに'enter-the-game'を送信
        const objConfig = { strNickName: $('#nickname').val() };
        socket.emit('enter-the-game',
            objConfig);
        $('#start-screen').hide();
    });
