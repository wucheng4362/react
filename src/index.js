// import ReactDOM from 'react-dom'
// 引入组件
// import App from './OtherArea'
// import App1 from './App1'
// ReactDOM.render(组件名称,要注入的元素

// import ToDo from './ToDo.tsx'
const acorn = require('acorn');
const fs = require('fs');

const code = fs.readFileSync('compiled.js', 'utf8');
const ast = acorn.parse(code, { ecmaVersion: 2021 });

console.log(ast);
fs.writeFileSync('ast.json', JSON.stringify(ast, null, 2));


// ReactDOM.render(
//   <ToDo />,
//   document.getElementById('root'))
