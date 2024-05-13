/**
 * 1、合并两个有序数组,m 是 前一个数组的长度，n 是另外数组的长度
 * 时间复杂度为 O(m + n) 
 * @param {*} nums1 
 * @param {*} m 
 * @param {*} nums2 
 * @param {*} n 
 */

var merge = function (nums1, m, nums2, n) {
    let p1 = m - 1;
    let p2 = n - 1;
    // 合并后的长度
    let p3 = m + n - 1;
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] < nums2[p2]) {
            nums1[p3--] = nums2[p2--];
        } else {
            nums1[p3--] = nums1[p1--]
        }
    }
    while (p1 >= 0) {
        nums1[p3--] = nums1[p1--];
    }

    while (p2 >= 0) {
        nums1[p3--] = nums2[p2--];
    }
    return nums1;
}

// 1,2,2,3,5,6
console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))

/**
 * 2、移除元素、你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度
 * @param {*} nums 
 * @param {*} val 
 * @returns 
 */

var removeElement = function (nums, val) {
    let j = 0;
    for (let i = 0; i <= nums.length - 1; i++) {
        if (nums[i] !== val) {
            nums[j++] = nums[i];
        }
    }
    // 从第 index 个索引开始删除 delNum 个元素，并添加元素 addElement ，返回值为被删除的元素组成的数组
    // splice(index,delNum,addElement)
    nums.splice(j, nums.length - j);
    return nums;
};

//[2,2]
console.log('removeElement', removeElement([3, 2, 2, 3], 3))

/**
 * 3、删除有序数组中的重复元素，最多重复一项
 * @param {*} nums 
 */
var removeDuplicates = function (nums) {
    let k = 1;
    let current = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== current) {
            nums[k++] = nums[i];
            current = nums[i]
        }
    }
    nums.splice(k, nums.length - k);
    return nums;
}

console.log('removeDuplicates', removeDuplicates([1, 1, 2, 2, 3, 4]))


/**
 * 4、删除有序数组中的重复元素，最多重复两项
 * @param {*} nums 
 */
var removeDuplicatesV2 = function (nums) {
    if (nums.length <= 2)
        return nums.length;
    let k = 2;
    for (let i = 2; i < nums.length; i++) {
        if (nums[i] !== nums[k - 2]) {
            nums[k++] = nums[i];
        }
    }
    nums.splice(k, nums.length - k);
    return nums;
}

// [1,1,2,2,3]
console.log('removeDuplicatesV2', removeDuplicatesV2([1, 1, 1, 2, 2, 3]))

/**
 * 5、找出数组中的多数元素
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let cnt = 1;
    let cur = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === cur) {
            cnt++;
        } else {
            cnt--;
        }
        if (cnt <= 0) {
            cur = nums[i];
            cnt = 1;
        }
    }
    return cur;
};

console.log('majorityElement', majorityElement([3, 3, 2, 3]))


/**
 * 6、将数组中的元素向右轮转 k 个位置
 * nums = [1,2,3,4,5,6,7], k = 3
 * 向右轮转 1 步: [7,1,2,3,4,5,6]
 * 向右轮转 2 步: [6,7,1,2,3,4,5]
 * 向右轮转 3 步: [5,6,7,1,2,3,4]
 * @param {*} nums 
 * @param {*} k 
 */

const reerse = (nums, start, end) => {
    while (start < end) {
        const temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}
var rotate = function (nums, k) {
    // 因为 k 可能会大于数组的长度
    const n = nums.length;
    const m = k % n;
    // 先整体翻转 0,n-1 元素
    reerse(nums, 0, n - 1);
    // 再翻转 0,k-1
    reerse(nums, 0, k - 1);
    // 最后翻转 k,n-1
    reerse(nums, k, n - 1);
};

/** 7、选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票计算最大的利润
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let buy = prices[0];
    let cnt = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > buy) {
            cnt = Math.max(prices[i] - buy, cnt);
        } else {
            buy = prices[i];
        }
    }
    return cnt;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]))

/**8、 每一天都可以交易股票，计算最大利润
 * [7,1,5,3,6,4]  5-1+6-3=7
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let cnt = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            cnt += prices[i] - prices[i - 1];
        }
    }
    return cnt;
};

/**
 * 9、给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度，判断你是否能够到达最后一个下标
 * 使用贪心算法：尽可能的跳跃到最远的位置，看最多能覆盖的位置，不断更新能覆盖的距离。
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    if (nums.length === 1) {
        return true;
    }
    // 能覆盖的最远距离
    let cover = nums[0];
    for (let i = 0; i <= cover; i++) {
        // 更新能跳的最远长度
        cover = Math.max(i + nums[i], cover)
        if (cover >= nums.length - 1) {
            return true;
        }

    }
    return false;
}

console.log('canJump', canJump([[3, 2, 1, 0, 4]]))

/**
 * 10、跳格子，怎么跳到最后最后一个元素，输出最小跳的次数
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    // 当前覆盖的最远距离
    let curDis = 0;
    // 记录走的最大步数
    let ans = 0;
    // 记录下一步覆盖的最远距离下标
    let nextDis = 0;
    // 注意这里是小于 nums.length-1
    for (let i = 0; i < nums.length - 1; i++) {
        nextDis = Math.max(i + nums[i], nextDis);
        // 遇到当前覆盖的最远距离下标
        if (i === curDis) {
            // 就往这里走
            curDis = nextDis;
            ans++;
        }

    }
    return ans;
};

console.log('jump2', jump([2, 3, 0, 1, 4]))

/**
 * 11、计算论文的 h 指数
 */

var hIndex = function (citations) {
    // 先排序
    citations.sort((a, b) => a - b)
    let h = 0, i = citations.length - 1;
    while (i >= 0 && citations[i] > h) {
        i--;
        h++;
    }
    return h;
}


/**
 * 12、实现 instanceOf
 */

function MyInstanceOf(left, right) {
    // 获取左侧实例化变量的 __proto__
    let leftVal = Object.getPrototypeOf(left);
    let rightVal = right.prototype;
    while (leftVal !== null) {
        if (leftVal === rightVal)
            return true;
        leftVal = Object.getPrototypeOf(leftVal)
    }
    return false;
}

console.log("hh", MyInstanceOf([1], Object))

/**
 * 13、除自身以外的乘积
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 */
// 解法：从左往右遍历，记录从左到当前位置前一位的乘积，然后从右往左遍历，从左到当前位置前一位的乘积乘上右边元素的积。
var productExceptSelf = function (nums) {
    const res = new Array(nums.length);
    res[0] = 1;
    // 从左往右遍历，记录从左到当前位置前一位的乘积
    for (let i = 1; i < nums.length; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }
    let right = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
};

/**
 * 14、加油站
 * gas = [1,2,3,4,5], cost = [3,4,5,1,2]，第 i 个加油站有汽油 gas[i] 升，i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升
 * 按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 
 */
var canCompleteCircuit = function (gas, cost) {
    let n = gas.length;
    // 从第一个站点出发
    let i = 0;
    while (i < n) {
        // 走过的站点
        let cnt = 0;
        // 累计油量、累计耗损油量
        let sumGas = 0, sumCost = 0;
        // 算出下一个要走的站点
        while (cnt < n) {
            const j = (i + cnt) % n;
            sumGas += gas[j];
            sumCost = cost[j];
            if (sumCost > sumGas) {
                break;
            }
            cnt++;
        }
        if (cnt === n) {
            return i;
        } else {
            return i + cnt + 1;
        }

    }
    return -1;
}

/**
 * 15、发糖果 每个孩子至少分配到 1 个糖果。
相邻两个孩子评分更高的孩子会获得更多的糖果。
 * 
 */
// 我们从左到右遍历该数组，假设当前遍历到位置 iii，如果有 ratings[i−1]<ratings[i]\textit{ratings}[i - 1] < \textit{ratings}[i]ratings[i−1]<ratings[i] 那么 iii 号学生的糖果数量将比 i−1i - 1i−1 号孩子的糖果数量多，我们令 left[i]=left[i−1]+1\textit{left}[i] = \textit{left}[i - 1] + 1left[i]=left[i−1]+1 即可，否则我们令 left[i]=1\textit{left}[i] = 1left[i]=1。

var candy = function (ratings) {
    let n = ratings.length;
    let left = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (i > 0 && ratings[i] > ratings[i - 1]) {
            left[i] = left[i - 1] + 1;
        } else {
            left[i] = 1;
        }
    }
    let ret = 0, right = 1;
    for (let i = n - 1; i >= 0; i--) {
        if (i < n - 1 && ratings[i] > ratings[i + 1]) {
            right++
        } else {
            right = 1;
        }
        ret += Math.max(left[i], right);
    }
    return ret;
};

/**
 * 16、接雨水
 * height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（
 */
var trap = function (height) {
    let ans = 0;
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if (height[left] < height[right]) {
            ans += leftMax - height[left];
            ++left;
        }
        else {
            ans += rightMax - height[right];
            --right;
        }
    }
    return ans;

}

/**
 * 17、罗马数字转整数
 * III:3 IV:4 (5-1) 
 */

const getValue = (ch) => {
    switch (ch) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return 0;
    }
}

var romanToInt = function (s) {
    let sum = 0;
    let preNum = getValue(s[0]);
    for (let i = 1; i < s.length; i++) {
        let curNum = getValue(s[i]);
        if (curNum > preNum) {
            sum -= preNum;
        } else {
            sum += preNum;
        }
        preNum = curNum;
    }
    sum += preNum;
    return sum;
}

/**
 * 18、求最后一个单词的长度
 */
var lengthOfLastWord = function (s) {
    let nums = s.trim().split(" ");
    console.log('nums', nums)
    return nums[nums.length - 1].length;
};

// 用双指针，end 指针从末尾开始前移动
var lengthOfLastWord1 = function (s) {
    let end = s.length - 1;
    while (end >= 0 && s[end] === " ") {
        end--;
    }
    let start = end;
    while (start >= 0 && s[start] !== ' ') {
        start--;
    }
    return end - start;
}
console.log('lengthOfLastWord', lengthOfLastWord("hello world"))

/**
 * 19、查找字符串数组中的最长公共前缀。
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 */
var longestCommonPrefix = function (strs) {
    // 令第一个元素为公共字符串
    let ans = strs[0];
    // 后面依次循环比较得到公共字符串
    for (let i = 1; i < strs.length; i++) {
        let j = 0;
        for (; j < ans.length && j < strs[i].length; j++) {
            if (ans[j] !== strs[i][j]) {
                break;
            }
        }
        ans = ans.slice(0, j)
    }
    return ans;
};

console.log("longestCommonPrefix", longestCommonPrefix(["flower", "flow", "flight"]))

/**
 * 20、反转字符串中的单词
 * s = "  hello world  "
 * "example good a"
 */

var reverseWords = function (s) {
    let sArr = s.trim().split(" ");
    for (let i = 0; i < sArr.length / 2; i++) {
        const temp = sArr[i];
        sArr[i] = sArr[sArr.length - i - 1];
        sArr[sArr.length - i - 1] = temp;
    }
    return sArr.filter(item => item !== "").join(" ").trim();
};

/**
 * 21、找出字符串中第一个匹配项的下标
 * 输入：haystack = "sadbutsad", needle = "sad"
 * 输出：0
 */

var strStr = function (haystack, needle) {
    let len1 = haystack.length;
    let len2 = needle.length;
    if (len2 > len1)
        return -1;
    let i = 0, k = 0;
    for (; i < len1; i++) {
        if (haystack[i] !== needle[k]) {
            continue;
        }
        k++;
        if (k === len2) {
            break;
        }


    }
    return k === len2 ? i - len2 + 1 : -1;

}


console.log('strStr', strStr("sadbutsad", "sad"))

/**
 * 22、验证回文串
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
 * 输入: s = "A man, a plan, a canal: Panama"
输出：true
解释："amanaplanacanalpanama" 是回文串。
 */


var isPalindrome = function (s) {
    let newStr = "";
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (c >= 'A' && c <= 'z') {
            newStr = newStr + c.toLowerCase();
        }
    }
    for (let j = 0; j < newStr.length / 2; j++) {
        if (newStr[j] !== newStr[newStr.length - 1 - j]) {
            return false;
        }
    }
    return true;
};

console.log('isPalindrome', isPalindrome("race a car"))

/**
 * 23、判断子序列
 * 输入：s = "abc", t = "ahbgdc"
输出：true
 */

var isSubsequence = function (s, t) {
    let curIndex = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < t.length; j++) {
            if (s[i] === t[j]) {
                curIndex++;
            }
        }
    }
    return curIndex === s.length;
};

/**
 * 24、有序数组：两数和
 * numbers = [2,7,11,15], target = 9
 * [1,2]
 */

var twoSum = function (numbers, target) {
    let low = 0, high = numbers.length - 1;
    while (low < high) {
        let sum = numbers[low] + numbers[high];
        if (sum === target) {
            return [low + 1, high + 1]
        } else if (sum < target) {
            low++;
        } else {
            high--;
        }
    }
};

/**
 * 25、三数和为 0
 * nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 */

var threeSum = function (nums) {
    const newArr = nums.sort((a, b) => a - b);
    let res = [];
    for (let i = 0; i < newArr.length; i++) {
        // 过滤下相同的第一个枚举值
        if (i > 0 && newArr[i] === newArr[i - 1]) {
            continue;
        }
        let target = 0 - newArr[i];
        let j = i + 1, k = newArr.length - 1;
        while (j < k) {
            let sum = newArr[j] + newArr[k];
            if (sum === target) {
                res.push([nums[i], nums[j], nums[k]]);
                j++;
                k--;
            } else if (sum < target) {
                j++;
            } else {
                k--;
            }
        }
    }
    return res;
};

console.log("threeSum", threeSum([-1, 0, 1, 2, -1, -4]))

/**
 * 26、防抖：将函数的执行延迟一定时间
 */

function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, delay)
    }
}

/**
 * 节流 间隔时间后再查询
 */

function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = new Date();
        if (now - lastTime > wait) {
            fn.apply(this, args)
            lastTime = now;
        }
    }
}

/**
 * 27、实现一个 repeat,每次间隔一定时间
 */

function repeat(func, times, wait) {

    return async function (...arg) {
        for (let i = 0; i < times; i++) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    func.apply(this, arg)
                    resolve();
                }, wait)
            })
        }
    }
}

const repeatFunc = repeat(console.log, 4, 3000);
// repeatFunc("hellowWorld")

/**
 * 28、实现一个深拷贝
 */

function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    let newObj = {};
    if (Array.isArray(obj)) {
        newObj = [];
    }
    for (let key in obj) {
        newObj[key] = deepCopy(obj[key])
    }
    return newObj;
}

/**
 * 29、柯里化
 */

function toCurry(fn, ...args) {
    let len = fn.length;
    if (args.length >= len) {
        return fn(...args);
    } else {
        return function (...arguments) {
            let _args = args.concat([...arguments]);
            return toCurry.call(this, fn, ..._args)
        }
    }
}

function bar(a, b, c) {
    return a + b + c;
}

var f = toCurry(bar);
console.log("sss", f(1)(2)(3))

/**
 * 30、二分查找
 */

function binary_search(arr, item) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (arr[mid] === item) {
            return mid;
        } else if (arr[mid] < item) {
            low = mid + 1;
        }
        else if (arr[mid] > item) {
            high = mid - 1;
        } else {
            return -1;

        }
    }
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 23, 44, 86];
var result = binary_search(arr, 10);
console.log('binary_search', result)

/**
 * 31、快速排序
 */

function quickSort(arr, low, high) {
    let i = low, j = high;
    if (i > j) { return; }
    //基准
    let pivot = arr[low];
    while (i < j) {
        // 找到第一个大于基准的元素
        while (i < j && arr[j] > pivot) { j--; }
        // 找到第一个小于基准的元素
        while (i < j && arr[i] <= pivot) { i++ }
        // 交换 i、j
        if (i < j) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    // 把基准元素放到正确的位置
    pivot = arr[i];
    arr[i] = arr[low];
    arr[low] = pivot;
    quickSort(arr, low, i - 1);
    quickSort(arr, i + 1, high);
}

let arr1 = [5, 9, 7, 4, 5, 7, 6, 1, 9, 9, 7, 4];
quickSort(arr1, 0, arr1.length - 1);
console.log('quickSort', arr1);

/**
 * 32、冒泡排序
 */

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

let arr3 = [5, 9, 7, 4, 5, 7, 6, 1, 9, 9, 7, 4, 0, 16, 400, 32];

console.log(bubbleSort(arr3));

/**
 * 33、选择排序
 */

function selectSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

let arr4 = [5, 9, 7, 4, 5, 7, 6, 1, 9, 9, 7, 4];

console.log(selectSort(arr4));

/**
 * 34、归并排序
 */

function mergeSort(arr, left, right) {
    if (left === right) {
        // 只有一个数
        return;
    }
    let mid = parseInt(left + ((right - left) >> 1));
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    let help = [];
    // 合并两个有序数组
    let p1 = left;
    let p2 = mid + 1;
    let p3 = 0;
    while (p1 <= mid && p2 <= right) {
        if (arr[p1] <= arr[p2]) {
            help[p3++] = arr[p1++];
        } else {
            help[p3++] = arr[p2++];
        }
    }
    while (p1 <= mid) {
        help[p3++] = arr[p1++];
    }
    while (p2 <= right) {
        help[p3++] = arr[p2++];
    }
    for (let i = 0; i < help.length; i++) {
        arr[left + i] = help[i]
    }
    return arr;
}
let arr5 = [5, 9, 7, 4, 5, 7, 6, 1, 9, 9, 7, 4];
mergeSort(arr5, 0, arr5.length - 1);
console.log(arr5);

/**
 * 组合排列
 */
function combine(arr, n) {
    let res = [];
    function permulate(nums, i, res) {
        if (i === n) {
            res.push([...nums.slice(0, n)].join(''));
        }
        for (let k = i; k < arr.length; k++) {
            swap(nums, i, k);
            permulate(nums, i + 1, res);
            swap(nums, i, k)
        }
    }
    permulate(arr, 0, res);
    return res;
}

function swap(nums, i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

console.log(combine([1, 2, 3, 4], 3))

/**
 * /**
 * 说明：
 *   写个转换函数，把一个JSON对象的key从下划线形式（Pascal）转换到小驼峰形式（Camel）
 * 示例：
 *   converter({"a_bc_def": 1}); // 返回 {"aBcDef": 1}
 */
function converter(obj) {
    const newObj = {};
    for (let key in obj) {
        const newKey = key.replace(new RegExp('_([a-z])', 'g'), (match) => {
            // const newKey = key.replace(/_([a-z])/g, (match) => {
            // replace 的第二个参数方法里面的入参是匹配到的字符串
            console.log('match', match.slice(1).toUpperCase())
            return match.slice(1).toUpperCase()
        });
        const value = obj[key];
        delete obj[key];
        newObj[newKey] = value;
    }
    return newObj;
}

console.log('converter({"a_bc_def": 1})', converter({ "a_bc_def": 1 }))

// 输入项
const itemList = [
    {
        id: 4,
        paramName: '供应链属性',
        parentId: 0
    },
    {
        id: 2,
        paramName: '供应链属性',
        parentId: 4
    },
    {
        id: 5,
        paramName: '供应链属性',
        parentId: 0
    },
    {
        id: 6,
        paramName: '供应链属性',
        parentId: 5
    }
];

function buildTree(arr) {
    const treeNode = [];
    let map = new Map();
    const list = arr.map(item => {
        map.set(item.id, item);
        return item;
    })
    list.forEach((item) => {
        const parent = map.get(item?.parentId);
        if (parent) {
            if (parent.children) {
                parent.children.push(item)
            } else {
                parent.children = [item]
            }
        } else {
            treeNode.push(item);
        }
    })
    return treeNode;
}

console.log('buildTree', JSON.stringify(buildTree(itemList)))

/**
 * 数组拍平
 * const arr = ['hi',['hello',1],2,[3,[4,[5]]]]
    flat(arr);
    // 默认展开一层
    // ["hi","hello",1,2,3,[4,[5]]]
    flat(arr, 3);
    // 第二个参数支持控制层级
    // ['hi', 'hello', 1, 2, 3, 4, 5]
 */
function flat(list, depth = 1) {
    let res = [];
    for (let i = 0; i < list.length; i++) {
        if (Array.isArray(list[i]) && depth > 0) {
            res = res.concat(flat(list[i], depth - 1))
        } else {
            res.push(list[i])
        }
    }
    return res;
}

console.log('flat', flat(['hi', ['hello', 1], 2, [3, [4, [5]]]], 3))

/**
 * 实现一个方法，检查一个 npm 包的依赖项中有没有存在循环依赖。
 */

const pkgs = [
    {
        "name": "a",
        "dependencies": {
            "b": "^1.0.0"
        }
    },
    {
        "name": "b",
        "dependencies": {
            "c": "^1.0.0"
        }
    },
    {
        "name": "c",
        "dependencies": {
            "a": "^1.0.0"
        }
    }
];
function checkDpes(list) {
    const depMap = {};

    const findNode = function (name) {
        return list.find(it => it.name === name)
    }

    let flags = false;
    const findDeps = function (name, deps) {
        deps.forEach(it => {
            if (name === it) {
                flags = true;
            }
            if (depMap[name].indexOf(it) === -1) {
                depMap[name].push(it)
                const node = findNode(it)
                if (node.dependencies && Object.keys(node.dependencies).length) {
                    findDeps(name, Object.keys(node.dependencies))
                }
            }
        })
        return flags;
    }

    return list.some(item => {
        depMap[item.name] = []
        return findDeps(item.name, Object.keys(item.dependencies) || [])
    });

}


console.log('isCicleDependency', checkDpes(pkgs))

/**
 * p(n, m)` 可以理解为将数字 `n` 分隔成不超过 `m` 的整数之和，输出所有可能的分隔方式
 * p(5, 5);
 * 1 + 1 + 1 + 1 + 1
1 + 1 + 1 + 2
1 + 1 + 3
1 + 2 + 2
1 + 4
2 + 3
5
 */

/**
 * 枚举所有可能的第一个整数 `i`，然后递归地求解剩余部分 `n-i` 的分隔方式。为了避免重复，我们规定第一个整数必须不小于上一个整数，这样可以保证每个分隔方式只会被枚举一次
 * */

function p(n, m, last = 1, path = []) {
    if (n === 0) {
        console.log(path.join('+'));
        return;
    }
    for (let i = last; i <= m && i <= n; i++) {
        p(n - i, m, i, [...path, i])
    }
}
p(5, 5)

/**
 * 寻找数组中的非重复的第 K 个最大元素
 * 解法：排序加去重
 */

var findKthLargest = function (nums, k) {
    let nums1 = nums.sort((a, b) => a - b);
    let current = nums[0];
    let j = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums1[i] !== current) {
            nums1[j++] = nums1[i];
            current = nums1[i];
        }
    }
    return nums1[j - k]
};

findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 2)

/**
 * 寻找数组中的第 K 个最大元素，不一定是不同的
 * 构建大顶堆
 * 1、从最后一个非叶子节点开始找，后子节点比较8把最大的交换,从左到右，至上而下
 * 2、根节点是最大的后再与最后一个节点交换，最大值被放在数组末尾，缩小数组的长度，不参与后面的调整
 * 3、再重复1步骤的比对交换，最后一个元素确定了最终的顺序
 */

var findKthLargest = function (nums, k) {
    var heapSize = nums.length;
    // 构建大顶堆
    buildHeap(nums, heapSize);
    // 元素下沉到最后
    for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
        // 根顶元素和最后一个元素交换
        [nums[0], nums[i]] = [nums[i], nums[0]];
        // 要排列的元素长度减
        heapSize--;
        // 交换之后再调整
        adjust(nums, 0, heapSize)
    }
    return nums[0];
    function buildHeap(nums, heapSize) {
        // 从第一个非叶子节点开始找
        for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            adjust(nums, i, heapSize);
        }
    }
    function adjust(nums, i, heapSize) {
        let largest = i;
        // 左右子节点
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        if (l < heapSize && nums[l] > nums[largest]) {
            largest = l;
        }
        if (r < heapSize && nums[r] > nums[largest]) {
            largest = r;
        }
        if (largest !== i) {
            // 非叶子节点和最大的子节点交换
            [nums[largest], nums[i]] = [nums[i], nums[largest]];
            adjust(nums, largest, heapSize)
        }

    }


}

