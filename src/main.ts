import './style.css'
import * as Blockly from "blockly";
import {toolbox} from "./toolbox.ts";
import "@blockly/block-plus-minus";
import {javascriptGenerator} from "blockly/javascript";


const blocklyArea = document.getElementById('blocklyArea')!;
const blocklyDiv = document.getElementById('blocklyDiv')!;
const codeArea = document.getElementById("inject-code-area")!;
const workspace = Blockly.inject(blocklyDiv,
    {toolbox});
const onresize = function() {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element: HTMLElement | null = blocklyArea;
    let x = 0;
    let y = 0;
    do {
        x += element?.offsetLeft ?? 0;
        y += element?.offsetTop ?? 0;
        element = element?.offsetParent as HTMLElement;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();

workspace.addChangeListener((e)=>{
    const code = javascriptGenerator.workspaceToCode(workspace);
    codeArea.innerText = code;
})