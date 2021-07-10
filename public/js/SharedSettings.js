// サーバースクリプトとクライアントで共通の設定クラス
class SharedSettings
{
    // フィールドサイズ
    // ※背景タイル画像のトリム処理未実装のため、
    // 　「FIELD_WIDTHは、FIELDTILE_WIDTHの定数倍」「FIELD_HEIGHTは、FIELDTILE_HEIGHTの定数倍」にする必要あり。
    static get FIELD_WIDTH() { return 700.0; }//1024 1.46285
    static get FIELD_HEIGHT() { return 500.0; }//1024

    // タンク
    static get TANK_WIDTH() { return 54.7; }//80
    static get TANK_HEIGHT() { return 54.7; }//80

    // 壁サイズ
    static get WALL_WIDTH() { return 170; }//250 170.9
    static get WALL_HEIGHT() { return 8; }//50

    // 弾丸
    static get BULLET_WIDTH() { return 10.3; }//15
    static get BULLET_HEIGHT() { return 10.3; }//15
}

if( typeof module !== 'undefined' && typeof module.exports !== 'undefined' )
{   // サーバー処理（Node.js処理）用の記述
    module.exports = SharedSettings;
}
