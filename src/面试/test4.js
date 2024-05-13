/**
 * 大数相加
 * 两个数都是字符串
 */
function add(a, b) {
    let i = a.length;
    let j = b.length;
    let arr1 = a.split("").reverse();
    let arr2 = b.split("").reverse();
    let c = 0;
    let result = [];
    const maxLen = Math.max(i, j);
    for (let i = 0; i < maxLen; i++) {
        const d1 = parseInt(arr1[i]) || 0;
        const d2 = parseInt(arr2[i]) || 0;
        const sum = d1 + d2 + c;
        // 剩下的
        const digit = sum % 10;
        // 进位
        c = Math.floor(sum / 10);
        result.push(digit);
    }
    if (c > 0) {
        result.push(c);
    }
    return result.reverse().join("")
}

console.log(add('9007199254740991', '1234567899999999999'))

// 求多个区间的交集
// getIntersection([5,2],[4,9],[3,6])
// 解题思路：把左边的值放入一个 start数组 右边的值放入一个 end 数组
var getIntersection = (...arrs) => {
    let startArr = [];
    let endArr = [];
    for (let i = 0; i < arrs.length; i++) {

        startArr.push(arrs[i][0] < arrs[i][1] ? arrs[i][0] : arrs[i][1]);
        endArr.push(arrs[i][0] < arrs[i][1] ? arrs[i][1] : arrs[i][0]);
    }
    let start = Math.max.apply(null, startArr);
    let end = Math.min.apply(null, endArr);
    if (start <= end) {
        return [start, end]
    }
    return null;
}
console.log(getIntersection([5, 2], [4, 9], [3, 6]))


// 给定一个编码字符。按编码规则进行解码，输出字符串
// 3[a]2[bc]  decodeString(s) 返回 aaabcbc

function decodeString(s) {
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ']') {
            stack.push(s[i])
        } else {
            let str = '';
            let repeatCountStr = '';
            while (stack.length > 0 && stack[stack.length - 1] !== '[') {
                // 计算连续的字符
                str = stack.pop() + str;
            }
            // 把 [ 弹出
            stack.pop();
            // 计算需要重复的数字
            while (stack.length > 0 && !isNaN(stack[stack.length - 1])) {
                repeatCountStr = stack.pop() + repeatCountStr;
            }
            str = str.repeat(parseInt(repeatCountStr));
            stack.push(str);
        }
    }
    return stack.join('')
}

console.log('decodeString', decodeString('3[a]2[bc]'))