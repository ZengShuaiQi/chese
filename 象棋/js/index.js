var game = game || {};

//初始化
game.init = function (chess) {

    this.selected = 0;//选中的棋子的位置
    this.lastStep = 0;//上一步走法
    this.chess = chess;
    this.width = 520;
    this.height = 567;
    this.image = "stype_2";//图片路径
    this.space = 57;
    this.imageList = [];//棋子集合
    this.pointStartX = 0;
    this.pos = new Position();
    this.chess.style.width = this.width + 'px';
    this.chess.style.height = this.height + 'px';
    this.chess.style.background = "url('" + this.image + "/bg.png') center center no-repeat"
    this.loadImages(this.image);
    this.mvs=[0];//存放每步走法的数组
    this.pcs=[0];//存放每步吃掉的棋子
    this.distance = 0;//深度


    this.pieceNameE = [//棋子英文名称
        "oo", null, null, null, null, null, null, null,
        "rk", "ra", "rb", "rn", "rr", "rc", "rp", null,
        "bk", "ba", "bb", "bn", "br", "bc", "bp", null,
    ];
    this.pieceNameC = [//棋子中文名称
        "棋盘", null, null, null, null, null, null, null,
        "红帅", "红仕", "红相", "红馬", "红車", "红砲", "红兵", null,
        "黑将", "黑士", "黑象", "黑馬", "黑車", "黑炮", "黑卒", null,
    ];
};

game.args = {
    //红子 中文/图片地址/阵营/权重
    'c': {text: "车", img: 'rr'},
    'm': {text: "马", img: 'rn'},
    'x': {text: "相", img: 'rb'},
    's': {text: "仕", img: 'ra'},
    'j': {text: "将", img: 'rk'},
    'p': {text: "炮", img: 'rc'},
    'z': {text: "兵", img: 'rp'},

    //蓝子
    'C': {text: "車", img: 'br'},
    'M': {text: "馬", img: 'bn'},
    'X': {text: "象", img: 'bb'},
    'S': {text: "士", img: 'ba'},
    'J': {text: "帅", img: 'bk'},
    'P': {text: "炮", img: 'bc'},
    'Z': {text: "卒", img: 'bp'}
};
game.loadImages = function (image) {

    //加载棋子图片棋子
    for (var i in game.args) {
        game[i] = {};
        game[i].img = new Image();
        game[i].img.src = image + "/" + game.args[i].img + ".png";
    }

};
//获取棋子上边距
game.getTop = function (p) {
    return (this.pos.RANK_Y(p) - 3) * this.space;
};
//获取棋子左边距
game.getLeft = function (p) {
    return (this.pos.FILE_X(p) - 3) * this.space;
};

//创建棋盘
game.createMans = function () {

    //解析fen格式串
    this.pos.fromFen("rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1");
    console.log(this.pos.fenArr);
    this.pos.isJiang();
    //遍历一维数组
    for (var i = 0; i < 256; i++) {
        //判断是否在真实棋盘上
        if (!this.pos.isInBoard(i)) {
            this.imageList.push(null);
            continue;
        }
        //创建图片对象
        var img = new Image();
        img.style.width = '54px';
        img.style.height = '54px';
        img.style.position = 'absolute';
        img.style.left = this.getLeft(i) + 'px';
        img.style.top = this.getTop(i) + 'px';
        this.imageList.push(img);
        this.chess.appendChild(img);

        //为每个图片对象注册鼠标按下事件
        img.onclick = function (i) {
            return function () {
                this.clickQiZi(i);
            }.bind(this)
        }.call(this,i);

    }

};

//开始判断并执行走棋
game.addMove = function (mow) {

    if (!this.pos.legalMove(mow)) {
        return;
    }

    this.mvs.push(mow);//用数组保存每一步走法

    this.pcs.push(this.pos.fenArr[this.pos.end(mow)]);

    this.distance=this.distance+1;
    if (!this.pos.makeMove(mow)) {
        this.mvs.pop();//没有成功执行走棋，将存在数组的走法删去
        return;
    }
    this.redisplayPiece(mow);
    this.pos.isJiang();
    this.isGameOver();
};

//重新显示棋子
game.redisplayPiece = function (mow) {

    var startPoint = this.pos.start(mow);
    var endPoint = this.pos.end(mow);

    if (this.lastStep > 0) {
        this.drawPieces(this.pos.start(this.lastStep), false);
        this.drawPieces(this.pos.end(this.lastStep), false);
    }

    this.drawPieces(startPoint, true);
    this.drawPieces(endPoint, true);

    this.selected = 0;//表示未选中棋子
    this.lastStep = mow;//保存这一步走法以便下步走法判断
    // if (this.pos.player === 0) {
    //     this.pos.player = 1;
    // }else if (this.pos.player === 1) {
    //     this.pos.player = 0;
    // }


};

//棋子点击事件
game.clickQiZi = function (i) {
    var no = this.pos.fenArr[i];
    console.log(no);

    if ((no & this.pos.SIDE_TAG(this.pos.player)) !== 0) {
        if (this.lastStep > 0) {
            this.drawPieces(this.pos.start(this.lastStep), false);
            this.drawPieces(this.pos.end(this.lastStep), false);
        }
        if (this.selected) {
            this.drawPieces(this.selected, false);
        }
        this.drawPieces(i, true);
        this.selected = i;

    } else if (this.selected > 0) {
        this.addMove(this.pos.move(this.selected, i));

    }
};

game.drawPieces = function (i, selected) {
    var img = this.imageList[i];
    img.src = this.image + '/' + this.pieceNameE[this.pos.fenArr[i]] + '.png';
    img.style.backgroundImage = selected ? "url(" + this.image + "/oos.png)" : "";
};

//刷新棋盘，为图片对象添加图片
game.flushBoard = function () {
    for (var i = 0; i < 256; i++) {
        if (this.pos.isInBoard(i)) {

            this.drawPieces(i);
        }

    }
};
//删除预先加载的图片对象
game.deleteImg = function () {
    for (var i in game.args) {
        delete game[i];
    }
};
//判断还有没有将存在
game.isGameOver = function () {
    var origin = 3<<4;
    var end = 3<<5;
    for (var i = origin; i < end; i++) {
        if(this.pos.fenArr[i]-this.pos.SIDE_TAG(1) === 0){
            game.gameOver = false;
            break;
        }
    }
    if(game.gameOver){
        alert('多强哦');
    }
    game.gameOver = true;
};
//悔棋
game.undo = function(){
    console.log(this.mvs);
    if(this.distance>0){
        var mow = this.mvs[this.distance];

        var startPoint = this.pos.start(mow);
        var endPoint = this.pos.end(mow);

        this.pos.fenArr[startPoint] = this.pos.fenArr[endPoint];

        this.pos.fenArr[endPoint] = this.pcs[this.distance];

        this.redisplayPiece(mow);
        this.mvs.pop();
        this.pcs.pop();
        this.distance = this.distance-1;
    }
};

window.onload = function () {
    game.createMans();
    game.flushBoard();
    game.deleteImg();


    $('#btn').click(function () {
        game.undo();
    })
};
var chess = document.getElementById('chess');
game.init(chess);