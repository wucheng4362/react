export type NodeKey = string | number;

export interface IFsTreeProps {
  // 数据源
  data: ITreeItem[];
  // key、label、children 字段映射
  // 考虑一下 data 数据源虽然是一个树形结构，但它的一些字段名对于我们组件封装者来说是不确定的，
  // 比如有的数据源用 id 来做唯一标识、有的用 key 来标识
  keyField?: string;
  labelField?: string;
  childrenField?: string;
}

// 数据源 item
export interface ITreeItem {
  key?: NodeKey;
  label?: NodeKey;
  children?: ITreeItem[];
  [key: string]: any;
}

export interface ITreeNode extends Required<ITreeItem> {
    level: number;
    parentKey: NodeKey | null;
    rawNode: ITreeItem;
    children: ITreeNode[];
}
