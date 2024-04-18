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

