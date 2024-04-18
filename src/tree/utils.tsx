import { ITreeItem,ITreeNode} from './types'
// 格式化数据，加上额外属性方便后续功能的实现
// level、parentKey、rawNode：原始节点
// 需要根据 level 来设置偏移样式
// isLeaf 可以判断哪个几点需要进行异步加载
// checkBox 框的选择:父节点选中，子节点都选中，子节点全部选中时，父节点才能是选中态
// 展开的节点状态保存
//  loadingKey 的保存
// 拍平树形结构呢？就是考虑到我们最后要做虚拟滚动

export const formatTreeData=(data:ITreeItem[],parent:ITreeNode|null,extraParams:{
    childrenField:string;
    labelField:string;
    keyField:string;
}):ITreeNode[]=>{
    const {childrenField,labelField,keyField}=extraParams;
    return data.map((item)=>{
        const children=item[childrenField]||[];
        const treeNode:ITreeNode={
            key:item[keyField],
            label:item[labelField],
            children:children,
            // 初始化层数为 0，之后根据父节点 level + 1 即可
            level:parent?parent.level+1:0,
            parentKey: parent ? parent.key : null,
            rawNode:item,
        }
        if(children.length)
        {
           return formatTreeData(children,treeNode,extraParams);
        }
        return treeNode;
    }) as ITreeNode[];
}

function handleCheckChildren(node: ITreeNode, isCheck: boolean) {
    const children = node.children;
    if (children) {
      children.forEach((node) => {
        node.isChecked = isCheck;
        checkedSet.value[node.isChecked ? "add" : "delete"](node.key);
        handleCheckChildren(node, isCheck);
      });
    }
}

function handleCheckParent(node: ITreeNode, isCheck: boolean) {
    let parentKey = node.parentKey;
    while (parentKey) {
      const parent = treeMap.value.get(parentKey)!;
      const children = parent.children;
      let isAll = true;
      let isHalf = false;
  
      if (children) {
        children.forEach((node) => {
          if (!node.isChecked) isAll = false;
          if (node.isChecked) isHalf = true;
        });
      }
      if (isAll) {
        parent.isHalfChecked = false;
        parent.isChecked = isCheck;
        checkedSet.value[isCheck ? "add" : "delete"](parent.key);
      } else {
        parent.isChecked = false;
        checkedSet.value.delete(parent.key);
        parent.isHalfChecked = isHalf;
      }
      parentKey = parent.parentKey;
    }
  }


  