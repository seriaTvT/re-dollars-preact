import { render } from 'preact';
import { useState } from 'preact/hooks';

function shouldUpdate(prevProps, nextProps) {
    console.log("shouldUpdate called with", prevProps, nextProps);
    return false; // always block
}

function TestComp(props) {
    this.shouldComponentUpdate = shouldUpdate;
    const [count, setCount] = useState(0);
    return <div id="test-div" onClick={() => setCount(c => c + 1)}>Count: {count}</div>;
}

const root = document.createElement('div');
render(<TestComp />, root);
console.log(root.innerHTML);
root.querySelector('div').click();
// need to wait for microtask or so? No, Preact updates sync or async?
// Let's use a setTimeout to check
setTimeout(() => {
    console.log("After click:", root.innerHTML);
}, 10);
