//位置
function Position() {
    this.fenArr = [];//一维数组
    // 棋盘范围
    this.RANK_TOP = 3;//上边开始坐标
    this.RANK_BOTTOM = 12;//下边结束坐标
    this.FILE_LEFT = 3;//左边结束坐标
    this.FILE_RIGHT = 11;//右边结束坐标

    // 棋子编号
    this.jiang = 0;		// 将
    this.shi = 1;	// 士
    this.xiang = 2;	// 象
    this.ma = 3;	// 马
    this.che = 4;		// 车
    this.pao = 5;	// 炮
    this.zu = 6;		// 卒


    //辅助数组，判断棋子是否在棋盘中
    this.IN_BOARD_ = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 20,19,18,17,16,17,18,19,20, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 21,0, 0, 0, 0, 0, 21,0, 0, 0, 0, 0,
    // 0, 0, 0, 22,0,22,0,  22,0,22, 0, 22, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 14,0,14,0,  14,0,14, 0, 14, 0, 0, 0, 0,
    // 0, 0, 0, 0, 13,0, 0, 0, 0, 0, 13,0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 12,11,10,9, 8, 9, 10,11,12, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    // 辅助数组，用于校验将（帅）、士（仕）、象（相）的走法是否合法
    this.legal_gridView = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,

    ];

    // 辅助数组，用于校验马的走法是否合理。如果合理，返回对应马脚的方向；否则，返回0
    this.legal_ma = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, -16, 0, -16, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 16, 0, 16, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
    ];


    //辅助数组 用于判断是否在九宫格内
    this.in_gridView = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    //存放帅的方向的辅助数组
    this.jiang_dire = [-16, -1, 1, 16];
    //存放马的合理走法的辅助数组
    this.ma_move = [[-33, -31], [-18, 14], [-14, 18], [31, 33]];
}

Position.prototype.isInGridView = function (end) {
    return this.in_gridView[end] === 1;
};

// 获得红黑标记(红子是8，黑子是16)
Position.prototype.SIDE_TAG = function (sd) {
    return 8 + (sd << 3);
};

// 获取走法的起点
Position.prototype.start = function (mow) {
    return mow & 255;
};

// 获取走法的终点
Position.prototype.end = function (mow) {
    return mow >> 8;
};

// 将一个走法的起点和终点，转化为一个整型数字
Position.prototype.move = function (sqSrc, sqDst) {
    return sqSrc + (sqDst << 8);
};

//判断是否在棋盘中
Position.prototype.isInBoard = function (p) {
    return this.IN_BOARD_[p] !== 0;
};
//初始化一维数组,每一位都为0
Position.prototype.pushArr = function () {
    this.player = 0;//红为0，黑为1
    for (var i = 0; i < 256; i++) {
        this.fenArr.push(0);

    }
};


// 根据一维矩阵，获取二维矩阵行数
Position.prototype.RANK_Y = function (p) {
    return p >> 4;
};

// 根据一维矩阵，获取二维矩阵列数
Position.prototype.FILE_X = function (p) {
    return p & 15;
};


//得到ASCII码
Position.prototype.ASCII = function (c) {
    return c.charCodeAt(0);
};

//通过ASCII码得到字符串
Position.prototype.CHR = function (n) {
    return String.fromCharCode(n);
};
//获取各种棋子的英文大写编号
Position.prototype.returnNum = function (n) {
    switch (n) {
        case "K":
            return this.jiang;
        case "A":
            return this.shi;
        case "B":
            return this.xiang;
        case "N":
            return this.ma;
        case "R":
            return this.che;
        case "C":
            return this.pao;
        case "P":
            return this.zu;
        default:
            return -1;
    }

};
//将解析到的棋子编号添加到一维数组中
Position.prototype.addArr = function (p, n) {
    this.fenArr[p] = n;
};

// 将二维矩阵转换为一维矩阵
Position.prototype.COORD_XY = function (x, y) {
    return x + (y << 4);
};

//解析fen串

//rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1
Position.prototype.fromFen = function (fen) {
    this.pushArr();
    var x = this.FILE_LEFT;
    var y = this.RANK_TOP;
    var index = 0;
    var c = fen.charAt(index);
    while (c !== ' ') {
        if (c === '/') {
            x = this.FILE_LEFT;
            y++;
            if (y > this.RANK_BOTTOM) {
                break;
            }
        } else if (c >= '1' && c <= '9') {
            x += (this.ASCII(c) - this.ASCII('0'));
        } else if (c >= 'A' && c <= "Z") {
            if (x <= this.FILE_RIGHT) {
                var num = this.returnNum(c);
                this.addArr(this.COORD_XY(x, y), num + 8);
                x++;
            }
        } else if (c >= 'a' && c <= 'z') {
            if (x <= this.FILE_RIGHT) {
                var num = this.returnNum(this.CHR(this.ASCII(c) - this.ASCII('a') + this.ASCII('A')));
                this.addArr(this.COORD_XY(x, y), num + 16);
                x++;
            }
        }
        index++;
        if (index === fen.length) {
            break;
        }
        c = fen.charAt(index);
    }
    if (index === fen.length) {
        return;
    }

};
//判断将(帅)是否只走一步(通过辅助数组判断)
Position.prototype.jiangMove = function (start, end) {
    return this.legal_gridView[start - end + 256] === 1;
};
//判断士走法是否只走一步(通过辅助数组判断)
Position.prototype.shiMove = function (startPoint, endPoint) {
    return this.legal_gridView[startPoint - endPoint + 256] === 2;
};
//判断象走法是否只走一步(通过辅助数组判断)
Position.prototype.xiangMove = function (startPoint, endPoint) {
    return this.legal_gridView[startPoint - endPoint + 256] === 3;
};
//判断象有没有过河(0-127或者128-255的二进制右起第八位相同，进行异或运算不会超过127，跟128进行与运算始终为0)
Position.prototype.crossRiver = function (startPoint, endPoint) {
    return ((endPoint ^ startPoint) & 128) === 0;
};
//判断象眼有无棋子
Position.prototype.xiangyan = function (startPoint, endPoint) {
    return this.fenArr[(startPoint + endPoint) >> 1] === 0;
};
//如果走法合法就根据数组得到马眼坐标，否则得到起点坐标
Position.prototype.maMove = function (startPoint, endPoint) {
    return startPoint + this.legal_ma[endPoint - startPoint + 256];
};
//判断兵有没有过河
Position.prototype.zuRiver = function (startPoint, player) {
    return (startPoint & 128) === (player << 7);
};

//车或者炮走同一行
Position.prototype.sameRow = function (startPoint, endPoint) {
    return ((startPoint ^ endPoint) & 240) === 0;
};
//车或者炮走同一列
Position.prototype.sameRank = function (startPoint, endPoint) {
    return ((startPoint ^ endPoint) & 15) === 0;
};


//判断走法是否合法
Position.prototype.legalMove = function (mow) {

    var startPoint = this.start(mow);//获取走法起点位置

    var startPieces = this.fenArr[startPoint];//获取起点棋子编号

    var sideTag = this.SIDE_TAG(this.player);//红黑标记 ，红方是8，黑方是16
    var endPoint = this.end(mow);//获取走法终点位置
    var endPieces = this.fenArr[endPoint];//获取终点棋子
    if ((startPieces & sideTag) === 0) {//起点不是本方棋子或者根本没有棋子，返回false代表走法不合法
        return false;
    }
    if ((endPieces & sideTag) !== 0) {//终点是本方棋子不合法
        return false;
    }

    switch (startPieces - sideTag) {
        case this.jiang://判断帅走法是否合法
            if(!this.crossRiver(startPoint,endPoint)){
                if(this.sameRank(startPoint,endPoint)){
                    var direction = -16;
                    var temp =startPoint;
                    temp+=direction;
                    while((this.fenArr[temp]===0)&&(temp!==endPoint)){
                        temp+=direction;
                    }
                    return temp ===endPoint;
                }
            }
            return this.isInGridView(endPoint) && this.jiangMove(startPoint, endPoint);
        case this.shi://判断士走法是否合法
            return this.isInGridView(endPoint) && this.shiMove(startPoint, endPoint);
        case this.xiang://判断象走法是否合法
            return this.crossRiver(startPoint, endPoint) && this.xiangMove(startPoint, endPoint)
                && this.xiangyan(startPoint, endPoint);
        case this.ma://判断马走法是否合法
            var maMove = this.maMove(startPoint, endPoint);
            return startPoint !== maMove && this.fenArr[maMove] === 0;

        case this.che:
        case this.pao://判断车和炮走法是否合法
            var direction;//方向
            if (this.sameRow(startPoint, endPoint)) {//如果同行判断左右
                console.log("同行");
                direction = startPoint > endPoint ? -1 : 1;
            } else if (this.sameRank(startPoint, endPoint)) {//如果同行判断前后
                console.log("同列");

                direction = startPoint > endPoint ? -16 : 16
            } else {//不同行不同列走法不合法
                console.log("不合法");
                return false;
            }
            var temp = startPoint + direction;
            while (temp !== endPoint && this.fenArr[temp] === 0) {
                temp += direction;
            }
            if (temp === endPoint) {
                return this.fenArr[endPoint] === 0 || startPieces - sideTag === this.che;
            }
            //以上验证车吃子或者车和炮走到终点的路线上没有障碍物

            if(this.fenArr[endPoint] === 0 && startPieces - sideTag === this.pao){
                return false;
            }
            temp+=direction;
            while(temp !== endPoint && this.fenArr[temp] === 0){
                temp+=direction;
            }


            return temp === endPoint;

        case this.zu://判断卒走法是否合法
            if (this.zuRiver(startPoint, this.player) && ((endPoint === startPoint - 1) || (endPoint === startPoint + 1))) {
                return true;
            }

            return endPoint === (startPoint - 16 + (this.player << 5));//判断卒或者兵是否往前走一步
        default:
            return false;
    }
};

//走棋成功
Position.prototype.makeMove = function (mow) {
    this.movePiece(mow);
    return true;
};

//走棋
Position.prototype.movePiece = function (mow) {
    var startPoint = this.start(mow);
    var endPoint = this.end(mow);

    var endPiece = this.fenArr[endPoint];
    if (endPiece > 0) {
        this.addPiece(endPiece, endPoint, true);
    }

    var startPiece = this.fenArr[startPoint];
    this.addPiece(startPiece, startPoint, true);
    this.addPiece(startPiece, endPoint, false);

};

//改变起点和终点的棋子
Position.prototype.addPiece = function (num, point, flag) {
    this.fenArr[point] = flag ? 0 : num;
};


//判断有没有将军
Position.prototype.isJiang = function(){

    for (var i = 0; i < 256; i++) {
        var point = this.fenArr[i];
        if((point&8)===0&&(point&16)===0){

            continue;
        }
        var which = point-8;
        if(point>=16){
            which = point - 16;
        }

        switch(which){
            case this.ma:
                for (var j = 0; j < this.jiang_dire.length; j++) {
                    var sqDst = this.jiang_dire[j];
                    var maJiao = i+sqDst;//得到马脚的位置
                    if(this.fenArr[maJiao]>0){
                        continue;
                    }
                    for (var k = 0; k < this.ma_move[j].length; k++) {
                        sqDst = this.ma_move[j][k];
                        var maPoint = sqDst+i;

                        if(point>8&&point<16){
                            if(this.fenArr[maPoint]===16){
                                alert("将军");
                            }
                        }else{
                            if(this.fenArr[maPoint]===8){
                                alert("将军");
                            }
                        }

                    }
                }
                break;
            case this.zu:
                if(point>8&&point<16){
                    if(!this.zuRiver(i,0)){
                        continue;
                    }
                    for (var h = 0; h < this.jiang_dire.length-1; h++) {
                        var zuPoint = i+this.jiang_dire[h];
                        console.log(zuPoint);
                        if(this.fenArr[zuPoint]===16){
                            alert("将军");
                        }
                    }
                }else{
                    if(!this.zuRiver(i,1)){
                        continue;
                    }
                    for (var h = 1; h < this.jiang_dire.length; h++) {
                        var zuPoint = i+this.jiang_dire[h];
                        console.log(zuPoint);
                        if(this.fenArr[zuPoint]===8){
                            alert("将军");
                        }
                    }
                }
                break;
            case this.che:
                for (var l = 0; l < this.jiang_dire.length; l++) {

                    var direction = this.jiang_dire[l];//方向
                    var chePoint = i+ direction;

                    while(this.IN_BOARD_[chePoint]){
                        if(point>8&&point<16){
                            if(this.fenArr[chePoint]>0){
                                if(this.fenArr[chePoint]===16){
                                    alert("将军");
                                }
                                break;
                            }
                        }else{
                            if(this.fenArr[chePoint]>0){
                                if(this.fenArr[chePoint]===8){
                                    alert("将军");
                                }
                                break;
                            }
                        }
                        chePoint+=direction;
                    }


                }
                break;
        }
    }
};
