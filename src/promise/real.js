/**
 * 用 Promise 封装 ajax
 */

const { setWebpackOptimizationSplitChunks } = require("customize-cra");
const { resolve } = require("node:path/win32");

function MyAjax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseText = 'json';
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange(() => {
            if (xhr.state === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.status)
                }
            }
        })
    })
}

/**
 * 实现 Promise
 */

function Promise(executor) {
    let self = this;
    self.value = undefined;
    self.reason = undefined;
    self.status = 'pending';
    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'fullfilled';
            self.value = value;
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
        }
    }
    executor(resolve, reject)
}

Promise.prototype.then = function (onFullfilled, onRejected) {
    let self = this;
    if (self.status = 'fullfilled') {
        onFullfilled(self.value)
    } else if (self.status === 'rejected') {
        onRejected(self.reason)
    }
}

Promise.prototype.resolve = function (value) {
    let self = this;
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then((data) => {
                resolve(data)
            }, err => {
                reject(err)
            })
        } else {
            resolve(value);
        }
    })
}

Promise.prototype.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}



Promise.prototype.finally = function (callback) {
    let self = this;
    return self.then((data) => {
        return Promise.resolve(callback()).then(() => data)
    }, err => {
        return Promise.resolve(callback()).then(() => {
            throw err;
        })
    })
}

/**
 * 实现 Promise.all
 */
Promise.prototype.all = function (promises) {
    return new Promise((resolve, reject) => {
        let len = promises.length;
        let res = [];
        let count = 0;
        if (len === 0) {
            resolve(res)
        }
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then((data) => {
                res.push(data)
                count++;
                if (count === len) {
                    resolve(res)
                }
            }, err => {
                reject(err);
            })
        }
    })
}

Promise.prototype.race = function (promises) {
    return new Promise((resolve, reject) => {
        let len = promises.length;
        if (len === 0) {
            resolve()
        }
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then((data) => {
                resolve(data)
            }, err => {
                reject(err);
            })
        }
    })
}

Promise.prototype.allsettled = function (promises) {
    return new Promise((resolve, reject) => {
        let len = promises.length;
        let res = [];
        let index = 0;
        if (len === 0) {
            resolve(res)
        }
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then((data) => {
                res.push({
                    status: 'fullfilled', value: data
                })
            }, err => {
                res.push({
                    status: 'rejected', reason: err
                })
            }).finally(() => {
                index++;
                if (index === len) {
                    resolve(res)
                }
            })
        }
    })
}

/**
 * 控制一个并发请求
 */

// 模拟 100 个请求
let reqList = [];
for (let i = 0; i < 100; i++) {
    const fn = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(100)
            resolve();
        }, 100)
    })
    reqList.push(fn)
}

let waitQueue = [];
let pool = new Set();
function request(reqFn, limits) {
    return new Promise((resolve, reject) => {
        let isFull = pool.size > limits;
        const newReqFn = () => {
            reqFn.then((res) => {
                resolve(res);
            }, err => {
                reject(err);
            }).finally(() => {
                pool.delete(reqFn)
                // 成功的话
                let next = waitQueue.shift();
                pool.add(next);
                next();
            })
        }
        if (isFull) {
            // 如果运行池满的话，就把这个请求加入等待队列中
            waitQueue.add(newReqFn)
        } else {
            pool.add(newReqFn);
            newReqFn()
        }

    })
}

function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date
    }
    let cloneObj = Array.isArray(obj) ? [] : {};
    for (let i in obj) {
        if (obj.hasOwnproPerty(i)) {
            cloneObj = deepCopy(obj[i])

        }
    }
    return cloneObj
}

function debounce(fn, wait) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, wait)
    }
}

function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const nowTime = new Date();
        if (nowTime - lastTime >= wait) {
            fn.call(this, ...args)
            lastTime = nowTime;
        }
    }
}


function repeat(fn, times, wait) {
    return async function (...args) {
        for (let i = 0; i < times; i++) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    fn.call(this, ...args);
                    resolve();
                }, wait)
            })
        }
    }
}

function toCurry(fn, ...args) {
    if (fn.length <= args.length) {
        return fn(...args);
    }
    return function (...rest) {
        const argss = args.concat(rest)
        return toCurry.call(this, fn, ...argss)
    }
}
/**
 * 无重复的最长子串
 */

var longStr = (str) => {
    let arr = str.split("");
    let rk = -1;
    let set = new Set();
    let max = 0;
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        if (i !== 0) {
            set.delete(arr[i])
        }
        if (rk + 1 < arr.length && !set.has(arr[rk + 1])) {
            set.add(arr[rk + 1])
            rk++;
        }
        max = Math.max(max, rk + 1 - i)
        str = arr.slice(i, rk + 1)
    }
    return max;
}

/**
 * 改变嵌套数组中对象的 key
 */

function changeObj(obj) {
    for (let key in obj) {
        if (key === 'title') {
            const value = obj[key];
            delete obj[key];
            obj['name'] = value
        }
        if (key === 'children') {
            changeObj(obj[key])
        }
    }
    return obj;
}

/**
 * 数组扁平化
 */
const arr = [[1, 2], 3, [4, 5]]


const flatten = () => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!Array.isArray(arr[i])) {
            res.push(arr[i])
        } else {
            res = res.concat(flatten(arr[i]))
        }
    }
}

function permum(nums) {
    let res = [];
    const permuna = (i, nums, res) => {
        if (i === nums.length) {
            res.push([...nums])
        } else {
            for (let k = i; k < nums.length; k++) {
                swap(nums, i, k);
                permuna(i + 1, nums, res);
                swap(nums, i, k);
            }
        }
    }
    permuna(0, nums, res);
    return res;
}

// 一维数组转树结构
let arr1 = [
    { id: 2, name: '2', parentId: 1 },
    { id: 1, name: '1', parentId: 0 },
    { id: 3, name: '3', parentId: 1 },
    { id: 4, name: '4', parentId: 3 },
    { id: 5, name: '5', parentId: 3 }
]

function transArrToTree(list) {
    let res = [];
    let mapObj = {};
    list.forEach(item => {
        item.children = [];
        map[item.id] = item;
    })
    list.forEach(item => {
        const parent = mapObj[item.parentId];
        if (parent) {
            parent.children.push(item);
        } else {
            res.push(item)
        }
    })
    return res;
}

function TreeToArr(tree) {
    let res = [];
    function dfs(treeNode) {
        treeNode.map(node => {
            const { id, parentId, name, children } = node;
            res.push({ id, parentId, name });
            if (children.length > 0) {
                dfs(children)
            }
        })
    }
    dfs(tree);
    return res;
}