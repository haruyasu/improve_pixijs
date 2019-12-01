import "../css/style.scss";

//CSVファイルを読み込む関数getCSV()の定義
// function getCSV() {
// 	var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
// 	req.open("get", "output.csv", true); // アクセスするファイルを指定
// 	req.send(null); // HTTPリクエストの発行

// 	// レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
// 	req.onload = function() {
// 		g_result = convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ

// 		console.log(g_result);
// 	};
// }

// // 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
// function convertCSVtoArray(str) {
// 	// 読み込んだCSVデータが文字列として渡される
// 	var result = []; // 最終的な二次元配列を入れるための配列
// 	var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
// 	// 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
// 	for (var i = 0; i < tmp.length; ++i) {
// 		result[i] = tmp[i].split(",");
// 	}

// 	// alert(result[1][2]); // 300yen
// 	console.log(result);
// 	return result;
// }

// getCSV(); //最初に実行される

// CSVファイル読み込み
function csvToArray(path) {
	var csvData = new Array();
	var data = new XMLHttpRequest();
	data.open("GET", path, false);
	data.send(null);
	var LF = String.fromCharCode(10);
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length; ++i) {
		var cells = lines[i].split(",");
		if (cells.length != 1) {
			csvData.push(cells);
		}
	}
	return csvData;
}

// ページロード時に実行
window.onload = function() {
	var data = csvToArray("output.csv");
	// console.log(data);
};

// var elem = document.getElementById("range");
// var target = document.getElementById("value");
// var rangeValue = function(elem, target) {
// 	return function(evt) {
// 		target.innerHTML = elem.value;
// 	};
// };
// elem.addEventListener("input", rangeValue(elem, target));

var slider1 = document.getElementById("slider");
var leftValue = document.getElementById("leftvalue");
// var rightValue = document.getElementById("rightvalue");

var setButton = document.getElementById("set-sliders");

var initialStartMinute = 540,
	initialEndMinute = 780,
	step = 10;

var slider = noUiSlider.create(slider1, {
	// start: [initialStartMinute, initialEndMinute],
	start: initialStartMinute,
	connect: "lower",
	step: step,
	animate: true,
	animationDuration: 300,
	range: {
		min: initialStartMinute,
		max: initialEndMinute
	}
});

var count = 540;
var countup = function(){
	slider1.noUiSlider.set(count = count + 10);
}

setButton.addEventListener("click", function() {
	var id = setInterval(function(){
		countup();
		if(count > 660){　
			clearInterval(id);　//idをclearIntervalで指定している
		}
	}, 500);
	count = 540;
});




// var B = n(238);

// function b(t) {
// 	gt = document.getElementById("slider-time"), B.create(gt, {
// 		start: 0,
// 		step: 10,
// 		behaviour: "snap",
// 		range: {
// 			min: [0],
// 			max: [t]
// 		}
// 	}), $("#slider-time .noUi-handle").on("mousemove", function () {
// 		J = !0
// 	}), $("#slider-time .noUi-handle").on("mouseout", function () {
// 		J = !1
// 	}), gt.noUiSlider.on("end", _), gt.noUiSlider.on("start", T)
// }

// b(100);

var convertValuesToTime = function(values, handle) {
	var hours = 0,
		minutes = 0,
		sliderTime = 0;

	if (handle === 0) {
		hours = convertToHour(values[0]);
		minutes = convertToMinute(values[0], hours);
		sliderTime = formatHoursAndMinutes(hours, minutes);
		leftValue.innerHTML = sliderTime;
		return sliderTime;
	}

	hours = convertToHour(values[1]);
	minutes = convertToMinute(values[1], hours);
	sliderTime = formatHoursAndMinutes(hours, minutes);
	rightValue.innerHTML = formatHoursAndMinutes(hours, minutes);

	return sliderTime;
};

var convertToHour = function(value) {
	return Math.floor(value / 60);
};
var convertToMinute = function(value, hour) {
	return value - hour * 60;
};
var formatHoursAndMinutes = function(hours, minutes) {
	if (hours.toString().length == 1) hours = "0" + hours;
	if (minutes.toString().length == 1) minutes = "0" + minutes;
	return hours + ":" + minutes;
};

// slider.on("update", function(values, handle) {
// 	var sliderTime = 0;
// 	sliderTime = convertValuesToTime(values, handle);
//     // console.log(sliderTime);

//     resultCsv = csvToArray("output.csv");

//     for (var i = 0; i < 7; ++i) {
//         if (sliderTime == resultCsv[i][0]) {
//             console.log(resultCsv[i][3])
//         }
//     }
// });

// function slider(t) {
//     gt = document.getElementById("slider-time"), B.create(gt, {
//         start: 0,
//         step: 10,
//         behaviour: "snap",
//         range: {
//             min: [0],
//             max: [t]
//         }
//     }), $("#slider-time .noUi-handle").on("mousemove", function () {
//         J = !0
//     }), $("#slider-time .noUi-handle").on("mouseout", function () {
//         J = !1
//     }), gt.noUiSlider.on("end", _), gt.noUiSlider.on("start", T)
// }

// slider(100)

/**
 * pixijs基礎サンプル
 */

/** =======================================================================================
 * 1.3 Pixiアプリケーションを生成する
 */

// Pixiアプリケーション生成
let app = new PIXI.Application({
	width: 600, // スクリーン(ビュー)横幅
	height: 600, // スクリーン(ビュー)縦幅
	backgroundColor: 0x1099bb, // 背景色 16進 0xRRGGBB
	autoDensity: true
});
// HTMLの<main id="app"></main>の中に上で作ったPIXIアプリケーション(app)のビュー(canvas)を突っ込む
let el = document.getElementById("app");
el.appendChild(app.view);

/** =======================================================================================
 * 1.4 スプライトや図形を表示する
 */

/**
 * スプライト(PIXI.Sprite)
 */

//  // 画像を読み込み、テクスチャにする
// let butaTexture = new PIXI.Texture.from('./img/buta.png');
// // 読み込んだテクスチャから、スプライトを生成する
// let butaSprite = new PIXI.Sprite(butaTexture);
// // ぶたの基準点を設定(%) 0.5はそれぞれの中心 位置・回転の基準になる
// butaSprite.anchor.x = 0.5;
// butaSprite.anchor.y = 0.5;
// // ぶたの位置決め
// butaSprite.x = app.screen.width / 2;        // ビューの幅 / 2 = x中央
// butaSprite.y = app.screen.height / 2;       // ビューの高さ / 2 = y中央
// // 表示領域に追加する
// app.stage.addChild(butaSprite);

// // 別のぶたを作る
// let butaSprite2 = new PIXI.Sprite(butaTexture); // テクスチャは同じものを使いまわせる
// // 基準点を設定 set()を使うとx,y同時に設定できる
// butaSprite2.anchor.set(0.5);
// // 大きさを変えてみる
// butaSprite2.scale.x = 1.5;
// butaSprite2.scale.y = 1.5;
// // 半透明にしてみる
// butaSprite2.alpha = 0.9;
// // 回転してみる
// butaSprite2.rotation = Math.PI / 3;          // (ラジアンで指定)
// // butaSprite2.angle = 60;                        // (度数で指定)
// // 色味を変えてみる
// butaSprite2.tint = 0xffff00;                // (基準は0xffffff)

// butaSprite2.x = app.screen.width / 2 + 150;
// butaSprite2.y = app.screen.height / 2;
// app.stage.addChild(butaSprite2);

/**
 * 図形(PIXI.Graphics) draw~~()はここに書いたもの以外にもあります
 */

// // 楕円を作る
// let ellipse = new PIXI.Graphics()       // メソッドチェーンで描画するので、;(セミコロン)を付けない
// .beginFill(0xff0000)                    // endFill()までの描画に対する塗りつぶし色指定
// .drawEllipse(0,0,30,20)                 // (中心のx座標, 中心のy座標, 幅, 高さ)
// .endFill();                              // ここまでに描いた図形を塗りつぶす

// // 基準点を設定(px) 図形(PIXI.Graphicsにはpivotはないので注意)
// ellipse.pivot.x = 15
// ellipse.pivot.y = 10
// ellipse.x = 100;
// ellipse.y = 100;
// ellipse.rotation = Math.PI / 6;
// app.stage.addChild(ellipse);

// // 多角形を作る
// let polygon = new PIXI.Graphics()
// .beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
// .drawPolygon([  // 頂点を配列で渡す [x1,y1,x2,y2,....]
//                 0, 0,
//                 25, -20,
//                 50, 0,
//                 50, 20,
//                 25, 40,
//                 0, 20
//             ])
// .endFill();
// polygon.x = 100;
// polygon.y = 100;
// app.stage.addChild(polygon)

let bucket1 = new PIXI.Graphics()
	.lineStyle(2, 0x808080, 1)
	.beginFill(0xee82ee, 1.0) // 第二引数で透明度を指定できる
	.drawPolygon([
		// 頂点を配列で渡す [x1,y1,x2,y2,....]
		0,
		0,
		30,
		0,
		30,
		30,
		0,
		30
	])
	.endFill();
bucket1.x = 270;
bucket1.y = 270;
app.stage.addChild(bucket1);

let bucket2 = new PIXI.Graphics()
	.lineStyle(2, 0x808080, 1)
	.beginFill(0xff1493, 1.0) // 第二引数で透明度を指定できる
	.drawPolygon([
		// 頂点を配列で渡す [x1,y1,x2,y2,....]
		0,
		0,
		30,
		0,
		30,
		30,
		0,
		30
	])
	.endFill();
bucket2.x = 270;
bucket2.y = 300;
app.stage.addChild(bucket2);

let bucket3 = new PIXI.Graphics()
	.lineStyle(2, 0x808080, 1)
	.beginFill(0xffff00, 1.0) // 第二引数で透明度を指定できる
	.drawPolygon([
		// 頂点を配列で渡す [x1,y1,x2,y2,....]
		0,
		0,
		30,
		0,
		30,
		30,
		0,
		30
	])
	.endFill();
bucket3.x = 300;
bucket3.y = 300;
app.stage.addChild(bucket3);

// var test = require('./test.js');

// const yaml = require('js-yaml');
// const fs = require('fs');

// function loadYamlFile(filename) {
// 	const yamlText = fs.readFileSync(filename, 'utf8')
// 	return yaml.safeLoad(yamlText);
// }

// const data = loadYamlFile('./yaml_provisional_stations.yaml');
// console.log(data);

// station1
let station1 = new PIXI.Graphics()
	.lineStyle(2, 0xffbd01, 1)
	.beginFill(0xffa500, 1.0) // 第二引数で透明度を指定できる
	.drawPolygon([
		// 頂点を配列で渡す [x1,y1,x2,y2,....]
		0,
		0,
		30,
		0,
		30,
		50,
		0,
		50
	])
	.endFill();
station1.x = 250;
station1.y = 75;
app.stage.addChild(station1);

let station2 = new PIXI.Graphics()
	.lineStyle(2, 0xffbd01, 1)
	.beginFill(0xffa500, 1.0) // 第二引数で透明度を指定できる
	.drawPolygon([
		// 頂点を配列で渡す [x1,y1,x2,y2,....]
		0,
		0,
		50,
		0,
		50,
		30,
		0,
		30
	])
	.endFill();
station2.x = 475;
station2.y = 300;
app.stage.addChild(station2);

let station3 = new PIXI.Graphics()
	.lineStyle(2, 0xffbd01, 1)
	.beginFill(0xffa500, 1.0) // 第二引数で透明度を指定できる
	.drawPolygon([
		// 頂点を配列で渡す [x1,y1,x2,y2,....]
		0,
		0,
		30,
		0,
		30,
		50,
		0,
		50
	])
	.endFill();
station3.x = 350;
station3.y = 475;
app.stage.addChild(station3);

let station4 = new PIXI.Graphics()
	.lineStyle(2, 0xffbd01, 1)
	.beginFill(0xffa500, 1.0) // 第二引数で透明度を指定できる
	.drawPolygon([
		// 頂点を配列で渡す [x1,y1,x2,y2,....]
		0,
		0,
		50,
		0,
		50,
		30,
		0,
		30
	])
	.endFill();
station4.x = 75;
station4.y = 250;
app.stage.addChild(station4);

const cart = new PIXI.Graphics();
cart.lineStyle(4, 0x000000, 0.7);
cart.beginFill(0xb0c4de);
cart.drawRect(270, 270, 60, 60);
cart.endFill();

app.stage.addChild(cart);

// // 円を作る(テクスチャを貼る)
// let circle = new PIXI.Graphics()
// // 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
// .beginTextureFill(butaTexture, 0x00ffff, 1, new PIXI.Matrix(1,0,0,1,-35,-35))
// .lineStyle(2, 0x000000)     // 線のスタイル指定(幅, 色) これ以外に透明度, alignment(線の位置)などが指定可能
// .drawCircle(0,0,30)
// .endFill();
// circle.x = 200;
// circle.y = 100;
// app.stage.addChild(circle);

// 線を描く
let line = new PIXI.Graphics()
	.lineStyle(5, 0x000000) // 線のスタイル指定(幅, 色) これ以外に透明度, alignment(線の位置)などが指定可能
	.moveTo(100, 100) // 開始点に移動
	.lineTo(500, 100) // (x,y)に向かって直線を引く
	.lineTo(500, 500)
	.lineTo(100, 500)
	.lineTo(100, 100);
// .moveTo(50,0)             // 現在地を移動
line.x = 0;
line.y = 0;
app.stage.addChild(line);

/** =======================================================================================
 * 1.5 コンテナを作ってオブジェクトをまとめる
 */

// // 新しいコンテナを生成
// let sampleContainer = new PIXI.Container();

// // ステージのあたりに作ったコンテナを配置する
// sampleContainer.x = 100;
// sampleContainer.y = app.screen.height - 200;
// app.stage.addChild(sampleContainer);

// // 新しいコンテナにオブジェクトを入れていく
// // 背景色用の長方形
// let background = new PIXI.Graphics()
// .beginFill(0xffff00)
// .drawRect(0,0,400,200)
// .endFill();

// // コンテナに入れる
// sampleContainer.addChild(background);

// // 大量のロッカーをぶち込む
// let lockerTexture = new PIXI.Texture.from('./img/locker.png')
// let lockers = new Array()
// for (let i=0; i < 2; i++) {
//     for(let j=0; j < 13; j++ ) {
//         let locker = new PIXI.Sprite(lockerTexture);
//         locker.scale.x = locker.scale.y = 0.25;
//         locker.x = j * 30 + 10;
//         locker.y = i * 100 + 20;
//         sampleContainer.addChild(locker);
//         lockers.push(locker)
//     }
// }

// // コンテナを適当に動かしたり回転させたりしてみる
// // sampleContainer.x += 50;
// // sampleContainer.y -= 50;
// // sampleContainer.rotation = -Math.PI / 3;
// // sampleContainer.scale.x = sampleContainer.scale.y = 1.5;

/** =======================================================================================
 * 1.6 オブジェクトがクリックされたときになんかする
 */

// // 中央のぶたのインタラクション(イベント)を有効化
// butaSprite.interactive = true;

// // ぶたにマウスが重なった時、表示をポインターにする
// butaSprite.buttonMode = true;

// // 中央のぶたスプライトにクリックイベントのリスナーを設定する
// // オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
// butaSprite.on('pointertap',showAlert);

// // イベントハンドラの定義
// function showAlert(e) {
//     console.log(e);
//     alert('ぶたがクリック(タップ)されました');
// }

// // リスナーを解除する(on()の逆)
// // butaSprite.off('pointertap',showAlert);

/** =======================================================================================
 * 1.7 オブジェクトをドラッグして動かす
 */

// // でかいぶたのインタラクション(イベント)を有効化
// butaSprite2.interactive = true;

// // ぶたにマウスが重なった時、表示をポインターにする
// butaSprite2.buttonMode = true;

// // でかいぶたスプライトにイベントリスナーを設定する
// // .on()をつなげて連続で設定することができる
// butaSprite2.on('pointerdown',  onButaPointerDown)    // ぶたの上でマウスがクリック(orタップ)されたとき
//            .on('pointerup',   onButaPointerUp);      // ぶたの上でマウスクリックが外れたとき

// // ぶたの上でマウスがクリック(orタップ)されたときの処理定義
// function onButaPointerDown() {
//     butaSprite2.on('pointermove', moveButa);    // ドラッグイベントリスナーを設定

//     // 分かる人向けTIPS:
//     // ドラッグ処理が重かったり、でかいぶたが他のオブジェクトの下に入ったりするとpointerupを拾えず、
//     // ドラッグイベントのリスナーが解除されない場合がある。
//     // こうなるとマウスをクリックした状態でなくても、でかいぶたにマウスが重なるとぶたが追従してくる。
//     // これはwindowにマウスクリック解除時のリスナーを設定することで解除できる...かも
//     // window.addEventListener('pointerup', onButaPointerUp);
// }

// // ぶたをドラッグ中の処理定義
// function moveButa(e) {
//     // PIXI.interaction.InteractionData.getLoalPosition(オブジェクト)
//     // イベント発火地点(=ドラッグ中のマウス位置)がapp.stageのどこの位置にあるかを取得
//     let position = e.data.getLocalPosition(app.stage);

//     // 位置変更
//     butaSprite2.x = position.x;
//     butaSprite2.y = position.y;
// }

// // ぶたの上でマウスクリックが外れたときの処理定義
// function onButaPointerUp() {
//     butaSprite2.off('pointermove', moveButa);    // ドラッグイベントリスナーを解除
// }

/** =======================================================================================
 * 1.8 オブジェクトの前後関係(描画順序)を変更する
 */

// zIndexによる自動ソートを有効化(どんなコンテナでも設定可能)
app.stage.sortableChildren = true;

// でかいぶたを最前面に描画(どのオブジェクトもzIndexの初期値は0)
bucket1.zIndex = 11;
bucket2.zIndex = 11;
bucket3.zIndex = 11;
station1.zIndex = 10;
station2.zIndex = 10;
station3.zIndex = 10;
station4.zIndex = 10;

// でかいぶたを最背面に描画
// butaSprite2.zIndex = -1;

/** =======================================================================================
 * 1.9 毎フレーム何らかの処理を実行する
 */

// var resultCsv = csvToArray("output.csv");


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}






// console.log(getJSON());

// var a1 = new Array();
// var a2 = new Array();
// for (var i = 0; i < resultCsv.length; ++i) {
// 	if ("A1" == resultCsv[i][1]) {
// 		a1.push(resultCsv[i]);
// 	}
// 	else if ("A2" == resultCsv[i][1]) {
// 		a2.push(resultCsv[i]);
// 	}
// }

// console.log(a1);
// console.log(a2);

const stationWidth = 30;
const bucketWidth = 30;

const stationInfo = new Array();
stationInfo.push({ name: "home1", x: "270", y: "270", dir: "-" });
stationInfo.push({ name: "home2", x: "270", y: "300", dir: "-" });
stationInfo.push({ name: "home3", x: "300", y: "300", dir: "-" });
stationInfo.push({ name: "station1", x: "250", y: "85", dir: "right" });
stationInfo.push({ name: "station2", x: "483", y: "300", dir: "down" });
stationInfo.push({ name: "station3", x: "350", y: "485", dir: "left" });
stationInfo.push({ name: "station4", x: "85", y: "250", dir: "up" });

// console.log(stationInfo);

const bucketInfo = new Array();
bucketInfo.push({ name: "A1", bucket: bucket1 });
bucketInfo.push({ name: "A2", bucket: bucket2 });
bucketInfo.push({ name: "A3", bucket: bucket3 });

var stackNum = 0;

// var resultCsv = [];


// let station1_arrive = new PIXI.Text("0", {
// 	fontSize: 15,
// 	fill: 0x000000
// });
// station1_arrive.x = 230;
// station1_arrive.y = 130;
// app.stage.addChild(station1_arrive);

// let station1_loading = new PIXI.Text("0", {
// 	fontSize: 15,
// 	fill: 0x000000
// });
// station1_loading.x = 260;
// station1_loading.y = 130;
// app.stage.addChild(station1_loading);

// let station1_departure = new PIXI.Text("0", {
// 	fontSize: 15,
// 	fill: 0x000000
// });
// station1_departure.x = 290;
// station1_departure.y = 130;
// app.stage.addChild(station1_departure);

// var station1_arrive_num = 0;
// var station1_loading_num = 0;
// var station1_departure_num = 0;

readTextFile("output.json", function(text){
	var data = JSON.parse(text);
	// console.log(data);

	slider.on("update", function(values, handle) {
		var sliderTime = convertValuesToTime(values, handle);

		// console.log(data[sliderTime]["A1"]["location"])
		// console.log(data[sliderTime]["A1"]["state"])
		// console.log(stationInfo.findIndex(({ name }) => name === data[sliderTime]["A1"]["location"]));
		
		if (data[sliderTime]) {
			var bucketKey = Object.keys(data[sliderTime]);

			for (var i = 0; i < bucketKey.length; ++i) {
				var stationIndex = stationInfo.findIndex(({ name }) => name === data[sliderTime][bucketKey[i]]["location"]);
				var bucketIndex = bucketInfo.findIndex(({ name }) => name === bucketKey[i]);
				var stationX = Number(stationInfo[stationIndex].x);
				var stationY = Number(stationInfo[stationIndex].y);
				var bucketState = data[sliderTime][bucketKey[i]]["state"];
				var stationDir = stationInfo[stationIndex].dir;

				// if (bucketState == "arrive") {
				// 	station1_arrive_num += 1;
				// 	station1_arrive.text = String(station1_arrive_num);
				// 	station1_departure_num = 0;
				// 	station1_departure.text = "0";
				// 	station1_loading_num = 0;
				// 	station1_loading.text = "0";
				// }
				// else if (bucketState == "departure") {
				// 	station1_departure_num += 1;
				// 	station1_departure.text = String(station1_departure_num);
				// 	station1_arrive_num = 0;
				// 	station1_arrive.text = "0";
				// 	station1_loading_num = 0;
				// 	station1_loading.text = "0";
				// }
				// else if (bucketState == "loading" || bucketState == "unloading") {
				// 	station1_loading_num += 1;
				// 	station1_loading.text = String(station1_loading_num);
				// 	station1_arrive_num = 0;
				// 	station1_arrive.text = "0";
				// 	station1_departure_num = 0;
				// 	station1_departure.text = "0";
				// }
				// else {
				// 	station1_arrive_num = 0;
				// 	station1_departure_num = 0;
				// 	station1_loading_num = 0;
				// 	station1_arrive.text = "0";
				// 	station1_departure.text = "0";
				// 	station1_loading.text = "0";
				// }




				if (bucketState == "arrive" && stationDir == "right") {
					bucketInfo[bucketIndex].bucket.x = stationX - stationWidth;
					bucketInfo[bucketIndex].bucket.y = stationY;
				} else if (bucketState == "arrive" && stationDir == "down") {
					bucketInfo[bucketIndex].bucket.x = stationX;
					bucketInfo[bucketIndex].bucket.y =
						stationY - stationWidth;
				} else if (bucketState == "arrive" && stationDir == "left") {
					bucketInfo[bucketIndex].bucket.x =
						stationX + stationWidth;
					bucketInfo[bucketIndex].bucket.y = stationY;
				} else if (bucketState == "arrive" && stationDir == "up") {
					bucketInfo[bucketIndex].bucket.x = stationX;
					bucketInfo[bucketIndex].bucket.y =
						stationY + stationWidth;
				} else if (bucketState == "departure" && stationDir == "right") {
					bucketInfo[bucketIndex].bucket.x =
						stationX + stationWidth;
					bucketInfo[bucketIndex].bucket.y = stationY;
				} else if (bucketState == "departure" && stationDir == "down") {
					bucketInfo[bucketIndex].bucket.x = stationX;
					bucketInfo[bucketIndex].bucket.y =
						stationY + stationWidth;
				} else if (bucketState == "departure" && stationDir == "left") {
					bucketInfo[bucketIndex].bucket.x =
						stationX - stationWidth;
					bucketInfo[bucketIndex].bucket.y = stationY;
				} else if (bucketState == "departure" && stationDir == "up") {
					bucketInfo[bucketIndex].bucket.x = stationX;
					bucketInfo[bucketIndex].bucket.y =
						stationY - stationWidth;
				} else if (bucketState == "delivering" && stationDir == "right") {
					bucketInfo[bucketIndex].bucket.x =
						stationX - stationWidth * 3;
					bucketInfo[bucketIndex].bucket.y = stationY;
				} else if (bucketState == "delivering" && stationDir == "down") {
					bucketInfo[bucketIndex].bucket.x = stationX;
					bucketInfo[bucketIndex].bucket.y =
						stationY - stationWidth * 3;
				} else if (bucketState == "delivering" && stationDir == "left") {
					bucketInfo[bucketIndex].bucket.x =
						stationX + stationWidth * 3;
					bucketInfo[bucketIndex].bucket.y = stationY;
				} else if (bucketState == "delivering" && stationDir == "up") {
					bucketInfo[bucketIndex].bucket.x = stationX;
					bucketInfo[bucketIndex].bucket.y =
						stationY + stationWidth * 3;
				} else {
					bucketInfo[bucketIndex].bucket.x = stationX;
					bucketInfo[bucketIndex].bucket.y = stationY;
				}
			}
		}
	});
});



// slider.on("update", function(values, handle) {
// 	var sliderTime = convertValuesToTime(values, handle);


// 	for (var i = 0; i < resultCsv.length; ++i) {
// 		var state = resultCsv[i][2];
// 		var stationName = resultCsv[i][3];
// 		var bucketName = resultCsv[i][1];
// 		var bucketIndex = bucketInfo.findIndex(({ name }) => name === bucketName);

// 		if (sliderTime == resultCsv[i][0]) {



// 			for (var j = 0; j < stationInfo.length; ++j) {
// 				var stationX = Number(stationInfo[j].x);
// 				var stationY = Number(stationInfo[j].y);
// 				var stationDir = stationInfo[j].dir;

// 				if (stationInfo[j].name == stationName) {
// 					if (state == "arrive" && stationDir == "right") {

// 						stackNum += 1;

// 						// console.log("stackNum: " + stackNum);
// 						// console.log("Index: " + bucketIndex)

// 						bucketInfo[bucketIndex].bucket.x = stationX - stationWidth * stackNum;
// 						bucketInfo[bucketIndex].bucket.y = stationY;

// 					} else if (state == "arrive" && stationDir == "down") {
// 						bucketInfo[bucketIndex].bucket.x = stationX;
// 						bucketInfo[bucketIndex].bucket.y =
// 							stationY - stationWidth;
// 					} else if (state == "arrive" && stationDir == "left") {
// 						bucketInfo[bucketIndex].bucket.x =
// 							stationX + stationWidth;
// 						bucketInfo[bucketIndex].bucket.y = stationY;
// 					} else if (state == "arrive" && stationDir == "up") {
// 						bucketInfo[bucketIndex].bucket.x = stationX;
// 						bucketInfo[bucketIndex].bucket.y =
// 							stationY + stationWidth;
// 					} else if (state == "departure" && stationDir == "right") {
// 						bucketInfo[bucketIndex].bucket.x =
// 							stationX + stationWidth;
// 						bucketInfo[bucketIndex].bucket.y = stationY;

// 						stackNum = 0;

// 					} else if (state == "departure" && stationDir == "down") {
// 						bucketInfo[bucketIndex].bucket.x = stationX;
// 						bucketInfo[bucketIndex].bucket.y =
// 							stationY + stationWidth;
// 					} else if (state == "departure" && stationDir == "left") {
// 						bucketInfo[bucketIndex].bucket.x =
// 							stationX - stationWidth;
// 						bucketInfo[bucketIndex].bucket.y = stationY;
// 					} else if (state == "departure" && stationDir == "up") {
// 						bucketInfo[bucketIndex].bucket.x = stationX;
// 						bucketInfo[bucketIndex].bucket.y =
// 							stationY - stationWidth;
// 					} else if (state == "delivering" && stationDir == "right") {
// 						bucketInfo[bucketIndex].bucket.x =
// 							stationX - stationWidth * 3;
// 						bucketInfo[bucketIndex].bucket.y = stationY;

// 						stackNum = 0;

// 					} else if (state == "delivering" && stationDir == "down") {
// 						bucketInfo[bucketIndex].bucket.x = stationX;
// 						bucketInfo[bucketIndex].bucket.y =
// 							stationY - stationWidth * 3;
// 					} else if (state == "delivering" && stationDir == "left") {
// 						bucketInfo[bucketIndex].bucket.x =
// 							stationX + stationWidth * 3;
// 						bucketInfo[bucketIndex].bucket.y = stationY;
// 					} else if (state == "delivering" && stationDir == "up") {
// 						bucketInfo[bucketIndex].bucket.x = stationX;
// 						bucketInfo[bucketIndex].bucket.y =
// 							stationY + stationWidth * 3;
// 					} else {
// 						bucketInfo[bucketIndex].bucket.x = stationX;
// 						bucketInfo[bucketIndex].bucket.y = stationY;

// 						stackNum = 0;
// 					}
// 				}
// 			}

// 			// stackNum = 0;
// 		}
// 	}

// 	// console.log("X: " + bucket1.x);
// 	// console.log("Y: " + bucket1.y);

// });

// // フレーム更新時の処理(≒ループ処理)を追加する
// app.ticker.add(animate);
// let amountTime = 0;

// // 処理の定義
function animate(delta) {
	// ぶたがはまってる円を回転する
	// bucket1.rotation += 0.2;

	// ぶたがはまってる円を左右に動かす(適当なのでほっとくとどんどんずれていきます)
	// amountTime += delta; // delta(app.ticker.deltaTime) : 前のフレームから今のフレームまでの経過時間を正規化した値？
	// amountTime += app.ticker.deltaMS;    // app.ticker.deltaMS  : 前のフレームから今のフレームまでの経過時間(ms)

	console.log("X: " + cart.x);
	console.log("Y: " + cart.y);

	// if (bucket1.x >= 85 && bucket1.x < 482 && bucket1.y == 85) {
	// 	bucket1.x += 2;
	// } else if (bucket1.x == 483 && bucket1.y < 482) {
	// 	bucket1.y += 2;
	// } else if (bucket1.x > 85 && bucket1.x < 484 && bucket1.y == 483) {
	// 	bucket1.x -= 2;
	// } else if (bucket1.x == 85 && bucket1.y < 484) {
	// 	bucket1.y -= 2;
	// }

	if (cart.x >= 0 && cart.x < 482 && cart.y == 0) {
		cart.x += 2;
	} else if (cart.x == 483 && cart.y < 482) {
		cart.y += 2;
	} else if (cart.x > 85 && cart.x < 484 && cart.y == 483) {
		cart.x -= 2;
	} else if (cart.x == 85 && cart.y < 484) {
		cart.y -= 2;
	}

	// if (Math.cos(amountTime / 100) > 0) {
	//     // 右に動かす
	//     bucket1.x += 2;
	// }
	// else {
	//     // 左に動かす
	//     bucket1.x -= 2;
	// }
}

// // 毎フレーム処理を解除する
// app.ticker.remove(animate);

/** =======================================================================================
 * 1.10 キーボードが押されたときにオブジェクトを動かす
 */

// // 押されたキーの情報を格納する配列を用意
// const LEFT = 0;
// const UP = 1;
// const RIGHT = 2;
// const DOWN = 3;

// let pushed = [];
// pushed[LEFT] = false;
// pushed[UP] = false;
// pushed[RIGHT] = false;
// pushed[DOWN] = false;

// // あるキーが押されたときのイベントリスナーを設定
// window.addEventListener('keydown', function(e) {
//    pushed[e.keyCode-37] = true;
// });

// // あるキーが離されたときのイベントリスナーを設定
// window.addEventListener('keyup', function(e) {
//     pushed[e.keyCode-37] = false;
// });

// // let frameCount = 0;
// let locker = lockers[0];

// app.ticker.add((delta) => { // なんじゃこれという人向け: function(delta)の省略形です(厳密には違う)
//     if (pushed[LEFT]) {
//         // ←キーが押されていた場合
//         locker.x -= 5;
//     }
//     if (pushed[UP]) {
//         // ↑キーが押されていた場合
//         locker.y -= 5;
//     }
//     if (pushed[RIGHT]) {
//         // →キーが押されていた場合
//         locker.x += 5;
//     }
//     if (pushed[DOWN]) {
//         // ↓キーが押されていた場合
//         locker.y += 5;
//     }

//     // 前の移動からxxフレーム以上経ってたら処理したい、という場合は上でコメントアウトしているframeCountを使って、
//     // frameCount += deltaなどで経過フレームを数えてif( frameCount >= xx) {やりたい処理 & カウントリセット}
//     // などとするとよいでしょう
// });

/** =======================================================================================
 * 1.11 パラパラ(フレーム)アニメーションするスプライトを作る (素材がないため断念)
 * [Animated Sprite - Jet - PixiJS Examples](https://pixijs.io/examples/#/sprite/animatedsprite-jet.js)
 */

/** =======================================================================================
 * 1.12 Tickerを使わずにアニメーションする(別ライブラリを併用)
 */

// // ロッカーを4つほど取り出す
// let l1 = lockers[1];
// let l2 = lockers[2];
// let l3 = lockers[3];
// let l4 = lockers[4];

// // TweenMax.to( 対象オブジェクト,
// //              完了までの時間(秒),
// //              {
// //                  pixi: {
// //                       パラメータ名1: 目標値1, パラメータ名2: 目標値2, ... ,
// //                  }
// //                   ease: イージングの形式,
// //                   repeat: 繰り返し回数 (デフォルトは0、 反復の場合は折り返しもカウントに含む),
// //                   yoyo: アニメーションを反復するか否か(true/false デフォルトはfalse),
// //                   delay: アニメーション開始までの遅延時間(秒),
// //                   onComplete: アニメーション完了時に実行するコールバック
// //             }
// // )

// // 1回だけリピートする
// TweenMax.to(l1, 0.5,
//         {
//             pixi: {
//                 y: l1.y - 200,
//             },
//             ease: Power0.easeNone,
//             repeat: 1
//         }
//     );

// // 反復で1回リピートし、完了時に色を変える
// TweenMax.to(l2, 0.5,
//     {
//         pixi: {
//             y: l2.y - 200,
//         },
//         ease: Power1.easeInOut,
//         repeat: 2,
//         yoyo: true,
//         onComplete: () => { l2.tint = 0xff0000 } // 完了時に色を変える
//     }
// );

// // 無限リピート
// TweenMax.to(l3, 0.5,
//     {
//         pixi: {
//             y: l3.y - 200,
//         },
//         ease: Power1.easeInOut,
//         repeat: -1,
//         yoyo: true
//     }
// );

// // 色々詰め込み
// // 回転
// TweenMax.to(l4, 1.0, { pixi: { angle: 359}, ease: Power0.easeNone, repeat: -1,});
// // 色々
// let l4Tween = TweenMax.to(l4, 1.0,
//     {
//         pixi: {
//             y: l4.y - 200,
//             scaleX: l4.scale.x * 1.5,
//             scaleY: l4.scale.y * 1.5,
//             tint: 0xff0000,
//         },
//         ease: Power1.easeInOut,
//         repeat: -1,
//         yoyo: true
//     }
// );

// // 戻り値のtweenを使ってアニメーションの一時停止や再開ができる
// // setTimeout(() => { l4Tween.pause() }, 1000);    // 1秒後に最後のロッカーの回転以外のアニメーションを停止

/** =======================================================================================
 * 1.13 テキストを表示する(+外部フォントの適用)
 */

PIXI.TextMetrics.BASELINE_SYMBOL += "あ｜"; // 日本語を見切れずに表示するためのおまじない

// デフォルトのフォントでテキストを表示する
// new PIXI.Text(文字列, テキストスタイル(オブジェクト))
let text = new PIXI.Text("HOME", {
	//   fontFamily: 'Arial',   // フォント
	fontSize: 15,
	fill: 0x000000 // 文字色
	//   stroke: 0xffffff,      // アウトラインの色
	//   strokeThickness: 3,    // アウトラインの太さ
	//   align: 'center',       // 文字揃え(複数行の場合に有効)
});
text.x = 275;
text.y = 250;
// text.text = '0123\n456789';   // テキストの書き換え
app.stage.addChild(text);

let text2 = new PIXI.Text("STATION1", {
	fontSize: 15,
	fill: 0x000000
});
text2.x = 230;
text2.y = 50;
app.stage.addChild(text2);

let text3 = new PIXI.Text("STATION2", {
	fontSize: 15,
	fill: 0x000000
});
text3.x = 400;
text3.y = 305;
app.stage.addChild(text3);

let text4 = new PIXI.Text("STATION3", {
	fontSize: 15,
	fill: 0x000000
});
text4.x = 328;
text4.y = 453;
app.stage.addChild(text4);

let text5 = new PIXI.Text("STATION4", {
	fontSize: 15,
	fill: 0x000000
});
text5.x = 130;
text5.y = 255;
app.stage.addChild(text5);

// // 外部フォントをロードする
// WebFont.load (
// {
//     // Google Fontsの場合
//     google:
//     {
//         families: ['Noto+Serif+JP']
//     },
//     // カスタム(自分のサーバーにファイルがあるとか)の場合
//     custom:
//     {
//         families: ['幻ノにじみ明朝'],
//         urls: ['./css/font.css']    // @font-faceを定義したcssのURL
//     },
//     active: () =>
//     {
//         // フォント読み込み成功時
//         // Google Fontsから読み込んだフォントでテキストを表示する(なぜか漢字が読み込まれない)
//         let text2 =  new PIXI.Text('あいうアイウABC漢字',
//                 {
//                     fontFamily: 'Noto Serif JP',
//                     fontSize: 50,
//                     fill : 0x000000,      // 文字色
//                 });
//         text2.x = 10;
//         text2.y = 100;
//         app.stage.addChild(text2);

//         // カスタムフォントでテキストを表示する
//         let text3 =  new PIXI.Text('あいうアイウABC漢字',
//                 {
//                     fontFamily: '幻ノにじみ明朝',
//                     fontSize: 50,
//                     fill : 0x000000,      // 文字色
//                 });
//         text3.x = 10;
//         text3.y = 200;
//         app.stage.addChild(text3);
//     },
//     inactive: () =>
//     {
//         // フォント読み込み失敗時
//         console.log('font loading failed');
//     }
// });

/** =======================================================================================
 * 1.14 点とオブジェクトの衝突判定
 */

// // 1.9で使ったロッカーを使用する(分かりやすいように基準点を中心に変更)
// locker.anchor.set(0.5);
// bucket1.anchor.set(0.5);

// // PIXI.Point(平面上の点オブジェクト)を生成
let p = new PIXI.Point();

// // いくつかのオブジェクトをinteractiveにする(ぶたとでかいぶたは既にinteractive)
station1.interactive = true;
// bucket1.interactive = true;

// circle.interactive = true;
// ellipse.interactive = true;
// polygon.interactive = true;
// l1.interactive = true;
// l2.interactive = true;
// l3.interactive = true;

// // 適当に名前をつける
// butaSprite.namae = "ぶた";
// butaSprite2.namae = "でかいぶた";
// circle.namae = "円"
// ellipse.namae = "楕円"
// polygon.namae = "六角形"
// l1.namae = "ロッカー1"
// l2.namae = "ロッカー2"
// l3.namae = "ロッカー3"

// setTimeout(() => {
// 	app.ticker.add(() => {
// 		p.x = bucket1.transform.worldTransform.tx;
// 		p.y = bucket1.transform.worldTransform.ty;

// 		let hitObject = app.renderer.plugins.interaction.hitTest(
// 			p,
// 			app.stage.station1
// 		);

// 		if (hitObject != null) {
// 			console.log("Hit!!!!!!!!!");
// 			bucket1.beginFill(0xdc143c, 1.0);
// 			bucket1.drawRect(0, 0, 30, 30);
// 		}
// 		// else {
// 		//     bucket1.beginFill(0xee82ee, 1.0);
// 		//     bucket1.drawRect(0, 0, 30, 30);
// 		// }
// 	});
// }, 100);

// // オブジェクトの配置完了をちょっと待ってから衝突判定のループを回す (※これはクソコードなので実践で使用しないでください)
// setTimeout( () => {
//     app.ticker.add(() => {
//         // pにlockerのワールド座標点を代入
//         // (普通のx,yは親コンテナ基準のローカル座標。これはルートコンテナ(ここではapp.stage))基準の座標)
//         p.x = locker.transform.worldTransform.tx;
//         p.y = locker.transform.worldTransform.ty;

//         // 衝突判定(hitTest()はinteractiveがtrueのオブジェクトにのみ有効)
//         let hitObject = app.renderer.plugins.interaction.hitTest(p, app.stage);  // (判定対象の点, 対象とするオブジェクトの入ったコンテナ)
//         if (hitObject != null) {
//             // 何かに衝突したら1.13のテキストオブジェクトに書き出す
//             text.text = hitObject.namae + 'にぶつかった';
//         }
//         else {
//             text.text = 'なんもぶつかってない';
//         }
//     });
// }, 100);

/** =======================================================================================
 * 1.15 オブジェクトの衝突判定領域をカスタマイズする
 */

// // hitArea用の形を作る(これはPIXI.Graphicsと異なり、描画オブジェクトではない)
// let customHitArea = new PIXI.Polygon(
//     [   // 頂点の渡し方はdrawPolygon()と同じ
//         -25,30,
//         5,35,
//         35,15,
//         15,-35,
//         -20,-35,
//         -35,-10,
//     ]
// )

// // hitArea確認用の同じ形のPIXI.Graphics
// let debug = new PIXI.Graphics()
// .beginFill(0x000000, 0.75)
// .drawPolygon([
//               -25,30,
//               5,35,
//               35,15,
//               15,-35,
//               -20,-35,
//               -35,-10,
//             ])
// .endFill();
// butaSprite.hitArea = customHitArea; // カスタム衝突判定領域を設定
// butaSprite.addChild(debug);         // 実はスプライトにもaddChild()できる

// // 分かりやすいようぶたを大きくする
// butaSprite.scale.x = butaSprite.scale.y = 1.5;

// // hitAreaは移動・回転・拡大縮小およびpivotの変更には追従するが、anchor(基準点)の変更には追従してくれない
// // butaSprite.anchor.x += 0.1;



