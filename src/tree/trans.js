// 一维数组转树结构
let arr = [
    { id: 2, name: '2', parentId: 1 },
    { id: 1, name: '1', parentId: 0 },
    { id: 3, name: '3', parentId: 1 },
    { id: 4, name: '4', parentId: 3 },
    { id: 5, name: '5', parentId: 3 }
]

const arrayToTree = (list) => {
    // 1. 定义两个中间变量
    const treeList = [],  // 最终要产出的树状数据的数组
        map = {}        // 存储映射关系
    // 2. 立一个映射关系，并给每个元素补充children属性.
    list.forEach(item => {
        if (!item.children) {
            item.children = []
        }
        map[item.id] = item;
    })
    // 3. 循环处理每个元素
    list.forEach(item => {
        const parent = map[item.parentId]
        // 如果存在则表示item不是最顶层的数据
        if (parent) {
            parent.children.push(item);
        } else {
            // 如果不存在 则是顶层数据
            treeList.push(item);
        }
    })
    // 返回出去
    return treeList;
}
// console.log("arrayToTree", JSON.stringify(arrayToTree(arr)))


// 树结构转一维数组

const TreeToArr = (treeNode) => {
    let res = [];
    const dfs = (tree = []) => {
        tree.forEach(node => {
            const { id, name, parentId, children } = node;
            res.push({ id, name, parentId })
            if (children.length) {
                dfs(children);
            }
        })
    }
    dfs(treeNode);
    return res;
}


const treeNode = JSON.stringify(arrayToTree(arr));
console.log('treeNode', treeNode)
console.log('TreeToArr', TreeToArr(JSON.parse(treeNode)))
/**
   * 借助浏览器完成高亮。
   * 深度优先遍历所有的节点，对文本节点进行高亮
   *
   * @param input - 待高亮的富文本串
   * @param keyword - 由关键词生成的匹配串，格式 'xxxx|xxx|x'
   * @returns {string}
   */
function hightlightKeyword(html, keyword) {
    // 复制一个节点去进行遍历操作    let wrap = document.createElement('div');
    let wrap = document.createElement('div');
    wrap.innerHTML = html;

    return DFSTraverseAndHightlight(wrap);

    function DFSTraverseAndHightlight(node) {
        const rootNodes = node.childNodes;
        const childNodes = Array.from(rootNodes);

        for (let i = 0, len = childNodes.length; i < len; i++) {
            const node = childNodes[i];

            // 文本节点，要进行高亮
            if (node.nodeType === 3) {
                let span = document.createElement('span');
                let a = span.innerHTML = node.nodeValue.replace(new RegExp(`(${keyword})`, 'g'), `<span class="keyword-match">$1</span>`); console.log(node.nodeValue);
                node.parentNode.insertBefore(span, node);
                node.parentNode.removeChild(node);
            }

            //文本节点不会有childNodes属性，如果有子节点，继续遍历
            if (node.childNodes.length) {
                DFSTraverseAndHightlight(node);
            }
        }

        return node.innerHTML;
    }
}
