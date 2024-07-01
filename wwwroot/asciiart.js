import init, { process_image } from './rust_asciiart.js';
import { fabric } from 'https://cdn.jsdelivr.net/npm/fabric@5.3.0/+esm'    

const canvas  = new fabric.Canvas("myCanvas");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "black";
  canvas.freeDrawingBrush.width = 8;

async function run() {
    await init();

    document.getElementById("GeneBtn").addEventListener("click", (event) => {  
        canvasToUint8Array()
        .then((uint8Array) => {
            console.log(uint8Array);
            const result = process_image(uint8Array);
            document.getElementById("AsciiArea").innerText = result;
        })
        .catch((error) => {
            console.error('Error converting canvas to Uint8Array:', error);
        });
    });       

}
run();

function canvasToUint8Array() {
    return new Promise((resolve, reject) => {
      document.getElementById('myCanvas').toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas to Blob failed'));
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(new Uint8Array(reader.result));
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });
    });
  }