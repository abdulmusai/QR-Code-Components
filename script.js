```javascript
document.addEventListener("DOMContentLoaded", function(event) {
  const video = document.getElementById('video');
  const scanBtn = document.getElementById('scanBtn');

  scanBtn.addEventListener('click', scanBarcode);

  function scanBarcode() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
        initBarcodeScanner();
      })
      .catch(function(error) {
        console.error("Error accessing the camera: ", error);
      });
  }

  function initBarcodeScanner() {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: video
      },
      decoder: {
        readers: ["ean_reader"] // Configure the barcode types you want to scan
      }
    }, function (err) {
        if (err) {
          console.error("Error initializing barcode scanner: ", err);
          return;
        }
        Quagga.start();
        Quagga.onDetected(handleBarcode);
      });
  }

  function handleBarcode(result) {
    console.log("Barcode detected: ", result.codeResult.code);
    // Do something with the scanned barcode value
  }
});
```