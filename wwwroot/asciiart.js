import init, { process_image } from './rust_asciiart.js';

const canvas  = new fabric.Canvas("myCanvas");
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "black";
  canvas.freeDrawingBrush.width = 8;
const newCanvas = document.getElementById('myCanvas');  

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
        // downloadCanvasAsPng();
    });       

}
run();

function canvasToUint8Array() {
    return new Promise((resolve, reject) => {
      newCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas to Blob failed'));
          return;
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

//   function downloadCanvasAsPng(filename = 'canvas_image.png') {  
//     // Data URL を作成
//     const dataUrl = newCanvas.toDataURL('image/png');
  
//     // ダウンロードリンクを作成
//     const link = document.createElement('a');
//     link.href = dataUrl;
//     link.download = filename;
  
//     // リンクをクリックしてダウンロードを開始
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }