/**
 * 1、无重复字符的最长子串
 * 滑动窗口的思想
 */

const { resolve } = require("path");


var lengthOfLongestSubstring = function (s) {
    let arr = s.split('');
    let rk = -1;
    let max = 0;
    let set = new Set();
    for (let i = 0; i < arr.length; i++) {
        // 左指针滑动，移除
        if (i !== 0) {
            set.delete(arr[i])
        }
        // 右指针滑动，添加
        while (rk + 1 < arr.length && !set.has(arr[rk + 1])) {
            set.add(arr[rk + 1])
            rk++;
        }
        max = Math.max(max, rk - i + 1)
    }
    return max;
}

console.log('lengthOfLongestSubstring', lengthOfLongestSubstring('asdddgadshd'))

/**
 * 2、查找字符串中出现最多的字符和个数
 */

function findStr(str) {
    let map = new Map();
    let ans = [];
    let strArr = str.split('')
    for (let i = 0; i < strArr.length; i++) {
        if (map.has(strArr[i])) {
            map.set(strArr[i], map.get(strArr[i]) + 1);
        } else {
            map.set(strArr[i], 1);
        }
    }
    let maxCount = Math.max.apply(null, [...map.values()])

    map.forEach((value, key) => {
        if (value === maxCount) {
            ans.push({ [key]: maxCount });

        }
    })
    return ans;
}

console.log('findStr', findStr('abaaccddde'))

/**
 * 最长有效括号
 */

var isValid = function (s) {
    const stack = [];
    const sArr = s.split("");
    if (sArr.length % 2 !== 0)
        return false;
    for (let i = 0; i < sArr.length; i++) {
        if (sArr[i] === '(') {
            stack.push(')');
        } else if (sArr[i] === '[') {
            stack.push(']');
        } else if (sArr[i] === '{') {
            stack.push('}');
        } else {
            if (stack.length !== 0) {
                // 如果栈不为空，并且弹出的与之不匹配 就false
                if (stack.pop() !== sArr[i]) {
                    return false;
                }
            } else {
                // 栈为空，没有匹配的也为空
                return false;
            }

        }
    }

    return stack.length === 0;
}

console.log('isValid', isValid('()[]{}'))

// 求满足要求的最长子串
var longStr = function (s) {
    let max = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 2; j <= s.length; j++) {
            if (isValid(s.slice(i, j))) {
                max = Math.max(j - i, max)
            }
        }
    }
    return max;
}

console.log('longStr', longStr(')()())'))

/**
 * 无重复的最长子串
 */
var lengthOfLongestSubstring = function (s) {
    let set = new Set();
    let rk = -1;
    let max = 0;
    for (let i = 0; i < s.length; i++) {
        if (i !== 0) {
            set.delete(s.charAt(i - 1));
        }
        while (rk + 1 < s.length && !set.has(s.charAt(rk + 1))) {
            set.add(s.charAt(rk + 1))
            rk++;
        }
        max = Math.max(max, rk - i + 1);
    }
    return max;
}

console.log('lengthOfLongestSubstring', lengthOfLongestSubstring('absasssssje'))

/**
 * 交集、并集、差集、补集
 */

const a = [1, 2, 3, 4, 5];
const b = [5, 6, 7, 8, 9];

// 交集
const intersection = a.filter(item => b.indexOf(item) !== -1);
console.log('intersection', intersection);
// 并集
const union = [...new Set([[...a, ...b]])];
const union1 = a.concat(b.filter(item => a.indexOf(item) === -1))
console.log('union1', union1)
// 差集 在 a 中不在 b 中的 a-b 
const sunUnion = a.filter(item => b.indexOf(item) === -1)
console.log('sunUnion', sunUnion)
// 补集 a-b 以及 b-a
const bu = a.filter(item => b.indexOf(item) === -1).concat(b.filter(item => a.indexOf(item) === -1))
console.log('bu', bu)

/**
 * 修改嵌套数组中的属性 title=>name
 */

const list = [{
    id: 'a',
    title: 'A'
}, {
    id: 'b',
    title: 'B',
    children: [{
        id: 'c',
        title: 'C'
    }, {
        id: 'd',
        title: 'D'
    }]
}]
function change(arr) {
    return arr.map((item) => {
        if (item.children && item.children.length > 0) {
            change(item.children);
        }
        item.name = item.title;
        delete item.title;
        return item;
    })

}

console.log(JSON.stringify(change(list)))

/**
 * 把二维数组变成一维数组
 * [1, [2, 3, [4, 5]]]  ------>    [1, 2, 3, 4, 5]
 */

const flatten = (arr) => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flatten(arr[i]))
        } else {
            res.push(arr[i])
        }
    }
    return res;
}

console.log('flatten', flatten([1, [2, 3, [4, 5]]]))

/**
 * 全排列
 */

var permutate = function (nums) {
    var res = [];//存放结果
    per(0, nums, res);
    return res;
}
function per(i, nums, res) {
    if (i == nums.length) {
        // 将当前排列结果的副本压入 res 中，而不是直接压入 nums ，不然后续的修改会影响这个值
        res.push([...nums]);
    }
    for (let k = i; k < nums.length; k++) {
        swap(nums, i, k);
        per(i + 1, nums, res);
        swap(nums, i, k);
    }
}
function swap(nums, i, j) {
    var temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

var nums = [1, 2, 3]
const res = permutate(nums)
console.log(res)

/**
 * 版本号比较
 */
let arr = ['0.1.0', '2.2.3', '0.3003.1', '4.3', '4.3.2'];
arr.sort((a, b) => {
    let i = 0;
    const arr1 = a.split('.');
    const arr2 = b.split('.');
    while (true) {
        const s1 = arr1[i];
        const s2 = arr2[i++];
        if (s1 === undefined || s2 === undefined) {
            return arr2.length - arr1.length;
        }
        if (s1 == s2)
            continue;
        return s2 - s1;
    }
})
console.log(arr[5])

/**
 * 二叉树的遍历
 */

const bt = {
    val: 'A',
    left: {
        val: 'B',
        left: { val: 'D', left: null, right: null },
        right: { val: 'E', left: null, right: null },
    },
    right: {
        val: 'C',
        left: {
            val: 'F',
            left: { val: 'H', left: null, right: null },
            right: { val: 'I', left: null, right: null },
        },
        right: { val: 'G', left: null, right: null },
    },
}
/**
 * 
 * @param {*} bt 先序递归遍历
 * @returns 
 */
function preOrder(bt) {
    if (!bt) {
        return;
    }
    console.log(bt.val);
    preOrder(bt.left);
    preOrder(bt.right);
}

// preOrder(bt)
// A B D E C F H I G

// 非递归遍历 先让根节点入栈，弹出栈，打印值，left 入栈，right 入栈

function preOrder2(bt) {
    if (!bt) {
        return;
    }
    let stack = [bt];
    while (stack.length > 0) {
        const node = stack.pop();
        console.log(node.val)
        if (node.left) {
            stack.push(node.left);
        }
        if (node.right) {
            stack.push(node.right);
        }
    }
}
// preOrder2(bt)

// 中序遍历
function inOrder(root) {
    if (!root) {
        return;
    }
    let stack = [];
    let cur = root;
    while (cur || stack.length > 0) {
        // 一直把左子节点遍历并推入
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        console.log(cur.val);
        // 把右边的节点遍历并推入
        cur = cur.right;
    }
}
// inOrder(bt) //D B E A H F I C G

// 后序遍历
function postOrder(root) {
    if (!root) {
        return;
    }
    let stack = [];
    let cur = root;
    let last = null; //标记上一个访问的节点
    while (cur || stack.length > 0) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        //找到根节点
        cur = stack[stack.length - 1];
        if (!cur.right || cur.right == last) {
            cur = stack.pop();
            console.log(cur.val)
            last = cur;
            cur = null;
        } else {
            cur = cur.right;
        }
    }

}

// postOrder(bt) //D E B H I F G C A

// 层级遍历
function levelOrder(root) {
    if (!root) { return; }
    let que = [root];
    while (que.length > 0) {
        const node = que.shift();
        console.log(node.val)
        node.left && que.push(node.left);
        node.right && que.push(node.right);
    }
}
levelOrder(bt)// A B C D E F G H I

/**
 *  广度遍历 对象
 */

const needObj = {
    a: {
        b: {
            d: {
                f: 22
            }
        },
        c: {
            e: {
                g: 33
            }
        }
    }
}

function BFS(obj) {
    let que = [];
    if (obj === null || typeof obj !== 'object') {
        return;
    }
    que.push(obj);
    while (que.length) {
        let item = que.shift();
        Object.keys(item).map(key => {
            console.log(key);
            que.push(item[key])
        })
    }
}
// BFS(needObj)   // a b c d e f g

function DFS(obj) {
    let stack = [];
    if (obj === null || typeof obj !== 'object') {
        return;
    }
    stack.push(obj);
    while (stack.length) {
        let item = stack.pop();
        Object.keys(item).map(key => {
            console.log(key);
            DFS(item[key])
        })
    }
}
DFS(needObj) // abdfceg

// 反转链表
var reverseList = function (head) {
    let prev = null;
    let cur = head;
    let next = head;
    while (cur) {
        next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}

/**
 * 手撕 call、apply 以及 bind
 */

// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function (context = window, ...args) {
    let key = Symbol('key');
    // this 是指调用的函数
    context[key] = this;
    // 调用
    let result = context[key](...args)
    delete context[key];
    return result;
}

// eslint-disable-next-line no-extend-native
Function.prototype.myApply = function (context = window, args) {
    let key = Symbol('key');
    // this 是指调用的函数
    context[key] = this;
    console.log('context', context)
    // 调用
    let result = context[key](...args)
    delete context[key];
    return result;
}

// 使用
function f(a, b) {
    console.log(a, b)
    console.log(this.name)
}
let obj = {
    name: '张三'
}
// f.myCall(obj, ...[1, 2])
// f.myApply(obj, [1, 2])

// eslint-disable-next-line no-extend-native
Function.prototype.myBind = function (context = window, ...outerArgs) {
    let self = this;
    return function f(...innerArgs) {
        if (f instanceof self) {
            return new self(...outerArgs, ...innerArgs)
        }
        // 把func执行，并且改变this即可
        return f.apply(context, [...outerArgs, ...innerArgs])
    }
}
f.bind(obj, 1)(2)

/**
 * 实现一个 sleep
 */

function sleep(wait) {
    return new Promise((resolve) => {
        setTimeout(resolve, wait)
    })
}

// sleep(5000).then(() => {
//     console.log('ssss')
// })

/**
 * 实现一个打点计时器
 */
// 利用 setTimeout
function counter(start, end) {
    if (start <= end) {
        console.log(start++);
        var timer = setTimeout(() => {
            counter(start, end)
        }, 100)
    }
    return {
        cancel: function () { clearTimeout(timer) }
    }
}

// counter(0, 5)

//利用 setInterval
function counter1(start, end) {
    var st = setInterval(() => {
        if (start <= end) {
            console.log(start++);

        }
    }, 100)
    return {
        cancel: function () {
            clearInterval(st)
        }
    }
}

// counter1(0, 5)

/**
 * 利用闭包实现 fibonacci
 */

var getFn = function () {
    var res = [0, 1];
    var fib = function (n) {
        var result = res[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            res[n] = result;
        }
        return result;
    }
    return fib;
}

// var fun = getFn();
// var num = fun(4);
// console.log(num)


/**
 * 控制并发请求
 */

// 1、先模拟 100 个请求
const requestList = [];
for (let i = 0; i < 100; i++) {
    requestList.push(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('done', i)
                resolve(i);
            }, Math.random() * 1000)
        })
    })
}

let pool = new Set();
let waitQueue = [];
const request = (reqFn, limits) => {
    return new Promise((resolve, reject) => {
        const isFull = pool.size >= limits;
        const newReqFn = () => {
            reqFn().then((res) => {
                resolve(res);
            }).catch(err => {
                reject(err);
            }).finally(() => {
                // 从运行池中删掉该运行的函数
                pool.delete(newReqFn);
                // 将等待队列中的请求加入运行池
                const next = waitQueue.shift();
                if (next) {
                    pool.add(next);
                    next();
                }
            }
            )
        }
        if (isFull) {
            // 如果运行池满了，则将新的请求放到等待队列
            waitQueue.push(newReqFn);
        } else {
            // 运行池未满
            pool.add(newReqFn);
            newReqFn();
        }

    })
}

// requestList.forEach(async item => {
//     const res = await request(item, 10);
//     console.log(res);
// });


let timer = null;
const mySetTimeout = (fn, delay) => {
    let flag = false;
    timer = setInterval(() => {
        if (!flag) {
            flag = true;
            fn.call(null);
        }
    }, delay)
}
mySetTimeout(() => {
    console.log('ssssss')
}, 100)

// for (var i = 0; i < 5; i++) {
//     (function (j) { 
//         setTimeout(function () {
//             console.log(j);
//         }, 1000)
//     })(i)
// }

console.log(Function.__proto__ === Function.prototype)
//false


function Person() {
    this.age = 0;
    console.log('this', this.age)
    setTimeout(function () {
        console.log(this.age);
    }, 1000);
}
var p = new Person();

console.log(typeof Person)

/**
 * 累加器
 */

var sum = [0, 1, 2, 3, 4];
var count = sum.reduce((sumCount, currentValue, currentIndex, array) => {
    return sumCount + currentValue;
    // 12 
}, 12)
console.log('count', count)


const arr1 = [1, 2, 2, 3, 4, 3, 5]
// console.log([...(new Set(arr1))])
// let newArr = arr1.filter((item, index) =>
//     arr1.indexOf(item) === index
// )
// console.log(newArr)

// let obj1 = {}
// for (let i = 0; i < arr1.length; i++) {
//     if (!obj1.hasOwnProperty(arr1[i])) {
//         obj1[arr1[i]] = arr1[i];
//     }
// }
// console.log(Object.values(obj1))

let newArr = [];
for (let i = 0; i < arr1.length; i++) {
    if (newArr.indexOf(arr1[i]) === -1) {
        newArr.push(arr1[i])
    }
}
console.log('newArr', newArr)

/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
P   A   H   N
A P L S I I G
Y   I   R
你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 */

var convert = function (s, numRows) {
    // 创建一个二维数组
    let i = 0, flag = -1;
    const arr = new Array(numRows).fill('');
    for (let j = 0; j < s.length; j++) {
        arr[i] = arr[i] + s[j];
        if (i === 0 || i === numRows - 1) {
            // 在达到 ZZZ 字形转折点时，执行反向。
            flag = -flag;
        }
        i += flag;
    }
    let res = ''
    for (let i = 0; i < arr.length; i++) {
        res += arr[i]
    }
    return res;
};

console.log(convert('PAYPALISHIRING', 3))

/**
 * 长度最小的子数组
 * target = 7, nums = [2,3,1,2,4,3] 
 * 输出 2
 * target = 11, nums = [1,1,1,1,1,1,1,1]
 * 0
 */

var minSubArrayLen = function (target, nums) {
    nums.sort((a, b) => a - b);
    let k = 0;
    let current = target;
    for (let j = nums.length - 1; j >= 0; j--) {
        if (nums[j] === current) {
            k++;
            return k;
        } else if (nums[j] < current) {
            current = current - nums[j];
            k++;
        }
    }
    return 0;
};

minSubArrayLen(7, [2, 3, 1, 2, 4, 3])

/**
 * 有效的数独
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次
 */

const board =
    [["5", "3", ".", ".", "7", ".", ".", ".", "."]
        , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
        , [".", "9", "8", ".", ".", ".", ".", "6", "."]
        , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
        , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
        , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
        , [".", "6", ".", ".", ".", ".", "2", "8", "."]
        , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
        , [".", ".", ".", ".", "8", ".", ".", "7", "9"]]

// 创建二维数组 rows 和 columns分别记录数独的每一行和每一列中的每个数字的出现次数，创建三维数组 subboxes记录数独的每一个小九宫格中的每个数字的出现次数
// 用数组代替哈希表进行计数
var isValidSudoku = function (board) {
    // 创建一个二维数组
    const rows = new Array(9).fill(0).map(() => new Array(9).fill(0))
    const columns = new Array(9).fill(0).map(() => new Array(9).fill(0));
    // 创建一个三维数组
    const subBoxes = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== '.') {
                // 不为空格,转换成下标，所以 -1
                const index = parseInt(board[i][j]) - 1;
                // 第 i 行 数字 index+1 的出现次数加1
                rows[i][index]++;
                // 第 j 列 数字 index+1 的出现次数加1
                columns[j][index]++;
                // 小九宫格中数字 index+1 出现的次数
                subBoxes[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
                if (rows[i][index] > 1 || columns[j][index] > 1 || subBoxes[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1) {
                    return false;
                }
            }
        }
    }
    return true;
};

console.log('isValidSudo', isValidSudoku(board))

/**
 * 螺旋矩阵顺时针输出
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 */

/**
 * 从最外层向里面遍历，左上角 (top,left) 右上角 (bottom,right)
 * (top left)->(top,right);(top+1,right)->(bottom,right);(bottom,right-1)->(bottom,left);(bottom-1,left,top+1,left)
 * 遍历完一层后，top+1,right-1,left+1,bottom-1;再像上面依次循环
 */
var spiralOrder = function (matrix) {
    let res = [];
    let left = 0, top = 0, right = matrix[0].length - 1, bottom = matrix.length - 1;
    while (left <= right && top <= bottom) {
        for (let j = left; j <= right; j++) {
            res.push(
                matrix[top][j]
            )
        }
        for (let i = top + 1; i <= bottom; i++) {
            res.push(matrix[i][right])
        }
        if (left < right && top < bottom) {
            for (let j = right - 1; j >= left; j--) {
                res.push(matrix[bottom][j]);
            }
            for (let i = bottom - 1; i >= top + 1; i--) {
                res.push(matrix[i][left]);
            }
        }
        [left, top, right, bottom] = [left + 1, top + 1, right - 1, bottom - 1]
    }
    return res;
};

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

console.log('spiralOrder', spiralOrder(matrix))


/**
 * 旋转矩阵
 * 将图像顺时针旋转 90 度。
 * matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
 */
// 第 i 行的第 j 个元素旋转后是第 j 行 n-i-1 列的元素

var rotate = function (matrix) {
    const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix_new[j][n - i - 1] = matrix[i][j]
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = matrix_new[i][j]
        }
    }
    return matrix
};

console.log('rotate', rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))

/**
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
 */

// 用两个一维数组记录每一行每一列是否有 0 出现
var setZeroes = function (matrix) {
    let m = matrix.length;
    let n = matrix[0].length;
    // 记录某行某列是否有 0 出现
    let rows = new Array(m).fill(0);
    let columns = new Array(n).fill(0)
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rows[i] = 1;
                columns[j] = 1
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rows[i] === 1 || columns[j] === 1) {
                matrix[i][j] = 0;
            }
        }
    }
    return matrix
};

/**
 * 输入：ransomNote = "a", magazine = "b"
 * 输出：false
 * 判断 ransomNote的字符是否能由 magzine 来组合，每个字符只能使用一次
 */
var canConstruct = function (ransomNote, magazine) {
    var arr1 = ransomNote.split('');
    var arr2 = magazine.split('');
    var map1 = new Map();
    var map2 = new Map();
    for (let i = 0; i < arr1.length; i++) {
        if (map1.has(arr1[i])) {
            map1.set(arr1[i], map1.get(arr1[i]) + 1)
        } else {
            map1.set(arr1[i], 1);
        }
    }
    for (let i = 0; i < arr2.length; i++) {
        if (map2.has(arr2[i])) {
            map2.set(arr2[i], map2.get(arr2[i]) + 1)
        } else {
            map2.set(arr2[i], 1);
        }
    }
    return [...map1].every(([key, value]) => {
        return map2.has(key) && map2.get(key) >= value
    })
};

var canConstruct2 = function (ransomNote, magazine) {
    // 用 hash 表，一维数组计数
    const cnt = new Array(26).fill(0);
    for (let val of magazine) {
        //charCodeAt 获取 AscII 码值
        cnt[val.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    for (let val of ransomNote) {
        cnt[val.charCodeAt(0) - 'a'.charCodeAt(0)]--;
        if (cnt[val.charCodeAt(0) - 'a'.charCodeAt(0)] < 0) {
            return false;
        }
    }
    return true;
}

console.log('canConstruct', canConstruct('aa', 'ab'))

/**
 * 同构字符串
 * 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
 * 输入：s = "egg", t = "add"
输出：true
示例 2：

输入：s = "foo", t = "bar"
输出：false
示例 3：

输入：s = "paper", t = "title"
输出：true
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            if (t[i] !== map.get(s[i])) {
                return false;
            }
        }
        map.set(s[i], t[i]);
    }
    return true;
};

/**
 * 给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。
 * 输入: pattern = "abba", s = "dog cat cat dog"
输出: true
 */
var wordPattern = function (pattern, s) {
    var sArr = s.split(" ");
    if (sArr.length !== pattern.length) {
        return false;
    }
    let map = new Map();
    for (let i = 0; i < pattern.length; i++) {
        if (map.has(pattern[i])) {
            if (sArr[i] !== map.get(pattern[i])) {
                return false;
            }
        }
        map.set(pattern[i], sArr[i]);
    }
    return true;
};


/**
 * 字母异位词分组
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */

var groupAnagrams = function (strs) {
    let map = new Map();
    for (let str of strs) {
        let arr = str.split('');
        arr.sort();
        let newStr = arr.join('');
        if (map.has(newStr)) {
            const newRes = Array.from(map.get(newStr));
            (newRes || []).push(str);
            map.set(newStr, newRes)
        } else {
            map.set(newStr, [str])
        }
    }
    let res = [];
    map.forEach((value, key) => {
        res.push(value)
    })
    return res;
};

console.log('groupAnagrams', groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))


/**
 * 两数和：输出 下标
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 */
var twoSum = function (nums, target) {
    // 存放数据以及下标
    const preNum = {};
    for (let i = 0; i < nums.length; i++) {
        const curNum = nums[i];
        const targetNum = target - curNum;
        const targetNumIndex = preNum[targetNum];
        if (targetNumIndex !== undefined) {
            return [targetNumIndex, i]
        } else {
            preNum[curNum] = i;
        }
    }
};
console.log('twoSum', twoSum([3, 2, 4], 6))

/**
 * 快乐数
 * 输入：n = 19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
 */

/**
 * 
创建一个慢指针，一次走一步，再创建一个快指针，一次走两步。
当快慢指针相遇，代表形参环路，该数不是快乐数。
若指针移动过程中，找到了 111，则当前数是一个快乐数。
 */

const getNext = function (n) {
    let sum = 0;
    while (n !== 0) {
        sum += Math.pow(n % 10, 2);
        n = Math.floor(n / 10);
    }
    return sum;
}

var isHappy = function (n) {
    let slow = n;
    let fast = getNext(n);
    while (fast !== 1 && fast !== slow) {
        slow = getNext(slow);
        fast = getNext(getNext(fast))
    }
    return fast === 1;
};

console.log('isHappy', isHappy(19))


/**
 * 存在重复元素 II
 * 给你一个整数数组 nums 和一个整数 k ，
 * 判断数组中是否存在两个 不同的索引 i 和 j ，
 * 满足 nums[i] == nums[j] 且 abs(i - j) <= k 。
 * 如果存在，返回 true ；否则，返回 false 。
 */

var containsNearbyDuplicate = function (nums, k) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; Math.abs(i - j) <= k; j++) {
            if (nums[i] === nums[j]) {
                return true;
            }
        }
    }
    return false;
};

console.log('containsNearbyDuplicate', containsNearbyDuplicate([1, 0, 1, 1], 1))


/**
 * 最长连续序列
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 */

var longestConsecutive = function (nums) {
    const max = Math.max.apply(null, nums);
    const hash = new Array(max).fill(0);
    for (let i = 0; i < nums.length; i++) {
        hash[nums[i]] = 1;
    }
    let maxNum = 0;
    let cnt = 0;
    for (let i = 0; i < hash.length; i++) {
        if (hash[i] !== 0) {
            cnt++;
        } else {
            cnt = 0;
        }
        maxNum = Math.max(maxNum, cnt);
    }
    return maxNum;
};

console.log('longestConsecutive', longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))

/**
 * 实现一个并发请求函数 concurrencyRequest(resuests, maxNum)，要求如下：

1. 要求最大并发数 maxNum

2. 所有请求完成后，结果按照请求数组里面的顺序返回
 */

const { deflateSync } = require("zlib");

let pool = new Set();
let waitQueue = [];
function concurrencyRequest(requests, maxNum) {

}

function request(reqFn, maxNum) {
    return new Promise((resolve, reject) => {
        let isFull = pool.size > maxNum;
        const newReqFn = () => {
            reqFn.then(res => {
                resolve(res);
            }, err => {
                reject(err);
            }).finally(() => {
                // 运行完之后把它从运行池里面删除掉
                pool.delete(reqFn);
                // 从队列中取下一个请求
                const next = waitQueue.shift();
                pool.add(next);
                next();
            })
        }
        if (isFull) {
            // 运行池满的话就加入到等待队列中
            waitQueue.push(reqFn);
        } else {
            pool.add(reqFn);
            newReqFn();
        }
    })
}

/**
 * 判断是否是有效括号，输入实例 '({{[]}})'，(),[],{}为有效
 */

const isValid = (str) => {
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            stack.push(')');
        } else if (str[i] === '[') {
            stack.push(']');
        } else if (str[i] === '{') {
            stack.push('}');
        } else {
            // 有数据但是栈中没有匹配的时候，就无效
            if (stack.length === 0) {
                return false;
            } else {
                const char = stack.pop();
                if (char !== str[i]) {
                    return false;
                }
            }
        }
    }
    // 最后栈要为空
    return stack.length === 0;

}

/**
 * 给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表，用字母 A 到 Z 表示，以及一个冷却时间 n。每个周期或时间间隔允许完成一项任务。任务可以按任何顺序完成，但有一个限制：两个 相同种类 的任务之间必须有长度为 n 的冷却时间。

返回完成所有任务所需要的 最短时间间隔 。

 

示例 1：

输入：tasks = ["A","A","A","B","B","B"], n = 2
输出：8
解释：A -> B -> (待命) -> A -> B -> (待命) -> A -> B
     在本示例中，两个相同类型任务之间必须间隔长度为 n = 2 的冷却时间，而执行一个任务只需要一个单位时间，所以中间出现了（待命）状态。 
示例 2：

输入：tasks = ["A","A","A","B","B","B"], n = 0
输出：6
解释：在这种情况下，任何大小为 6 的排列都可以满足要求，因为 n = 0
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
诸如此类
示例 3：

输入：tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
输出：16
解释：一种可能的解决方案是：
     A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> (待命) -> (待命) -> A -> (待命) -> (待命) -> A
 

提示：

1 <= tasks.length <= 104
tasks[i] 是大写英文字母
0 <= n <= 100
 */

// 先定义一个任务队列
class TaskQueue {
    constructor() {
        this.tasks = [];
    }
    add(task) {
        this.tasks.push(task);
    }
    // 获取下一个执行的任务
    getNext() {
        return this.tasks[0];
    }
    // 移除任务
    remove() {
        this.tasks.shift();
    }
    //检查是否还有任务
    hasTaks() {
        return this.tasks.length > 0
    }
}

// 定义调度器
class Schedule {
    constructor() {
        this.queue = new TaskQueue();
    }
    add(task) {
        this.queue.add(task);
    }
    // 执行最早的
    tick() {

    }
}

var time = (tasks, n) => {
    // 先算出任务数最多的
    let map = new Map();
    for (let i = 0; i < tasks.length; i++) {
        if (!map.has(tasks[i])) {
            map.set(tasks[i], 1);
        } else {
            map.set(tasks[i], map.get(tasks[i]) + 1);
        }
    }
    const maxNum = Math.max.apply(null, [...map.values()]);
    let time = 0;
    //想像是一个 maxNum 行 n+1 的矩阵，空的地方就
    time = (maxNum - 1) * (n + 1);
    console.log('time', time)
    map.forEach((value, key) => {
        if (value === maxNum) {
            time++;
        }
    })
    return Math.max(tasks.length, time)
}

console.log(time(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2))

/**
 * 求连通数
 * isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连
 * 输出：2
 */

var findCircleNum = function (isConnected) {
    // 记录访问过的节点
    const visited = new Set();
    const cities = isConnected.length;
    // 记录连通数量
    let res = 0;
    for (let i = 0; i < cities; i++) {
        if (!visited.has(i)) {
            dfs(isConnected, cities, i, visited)
            res++;
        }
    }
    function dfs(isConnected, cities, i, visited) {
        for (let j = 0; j < cities; j++) {
            // 没有访问过并且是连通的时候继续访问
            if (!visited.has(j) && isConnected[i][j] === 1) {
                // 访问 j 加入访问节点
                visited.add(j);
                dfs(isConnected, cities, j, visited)
            }
        }
    }
    return res;
};

console.log('findCircleNum', findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]))

/**
 * 输入: matchsticks = [1,1,2,2,2]
 * 输出: true
 * 解释: 能拼成一个边长为2的正方形，每边两根火柴。
 * 拼正方形
 */
var makesquare = function (matchsticks) {
    const sum = matchsticks.reduce((sum, current, index, arr) => {
        return sum + current;
    }, 0)
    const len = sum / 4;
    if (sum % 4 !== 0) {
        return false;
    }
    let arr = new Array(4).fill(0);
    return dfs(0, matchsticks, arr, len)
}
const dfs = (index, matchsticks, edges, len) => {
    if (index === matchsticks.length) {
        return true;
    }
    for (let i = 0; i < edges.length; i++) {
        // 把第 index 下标的元素放入到第 i 个边
        edges[i] += matchsticks[index];
        if (edges[i] <= len && dfs(index + 1, matchsticks, edges, len)) {
            return true;
        }
        edges[i] -= matchsticks[index];
    }
    return false;
}

/**
 * 写一个阿拉伯数字转中文 
举例：
12345 => 一万两千三百四十五
10345 => 一万零三百四十五
10305 => 一万零三百零五
100500 => 十万零五百
100000000 => 一亿
 */
function numTrans(num) {
    var units = ["", "十", "百", "千", "万", "十万", "百万", "千万", "亿"];
    var digits = ['', '一', "二", "三", "四", "五", "六", "七", "八", "九"];
    var numArr = String(num).split('').reverse();
    // 保存中文
    let result = ''
    for (let i = 0; i < numArr.length; i++) {
        var digit = numArr[i];
        var unit = units[i];
        // 如果是 0,有多个的话只保留一个
        if (digit === '0') {
            if (result[0] === '零') {
                result = result.substring(1);
            }
            if (i !== numArr.length - 1) {
                // 如果不是末尾的零，累加一个零
                result = '零' + result;
            }
            continue;
        }
        // 其他情况，给对应的数字以及单位
        result = digits[digit] + unit + result;

    }
    return result;
}

console.log('numTrans', numTrans(200000))