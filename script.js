const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

var base = document.querySelector('li:last-child a').getAttribute('href');
var img;

window.onload = function() {
  canvas.width = 750;
  canvas.height = 1334;
  drawImage();
}

document.querySelector('input[type="file"]').addEventListener('change', (e) => {
  var reader = new FileReader();
  reader.onload = function(event) {
    if(img.width != 750 || img.height != 1334) {
      alert('La imagen debe tener dimensiones de 750x1334');
    } else {
      base = event.target.result;
      drawImage();
    }
  }
  reader.readAsDataURL(e.target.files[0]);
});

function drawImage() {
  img = new Image();
  img.onload = function() { ctx.drawImage(img, 0, 0); }
  img.crossOrigin= 'anonymous';
  img.src = base;
}

function downloadImage() {
  const month = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const rate = parseFloat(document.getElementById('rate').value);
  const currency1 = document.querySelectorAll('input[type="text"]')[0].value;
  const currency2 = document.querySelectorAll('input[type="text"]')[1].value;
  const operation = (document.querySelector('select').selectedOptions[0].value === 'Dividir') ? '/' : '*';

  //Tasa
  ctx.textAlign = "center";
  ctx.font = "80px Open Sans Condensed";
  ctx.fillStyle = document.querySelector('input[type="color"').value;
  ctx.fillText(String(rate).replace('.', ','), 615, 295);

  //Fecha
  const dt = new Date();
  const fecha = dt.getUTCDate() + " / " + month[dt.getUTCMonth()].toUpperCase() + " / " + dt.getFullYear();
  ctx.fillStyle = "white";
  ctx.font = "70px Open Sans Condensed";
  ctx.fillText(fecha, 385, 385);

  //Valores
  ctx.font = "55px Open Sans Condensed";
  var y = 500;
  document.querySelectorAll('input.value').forEach((v) => {
    ctx.textAlign = "right";
    ctx.fillText(Number(parseInt(v.value)).toLocaleString() + currency1, 325, y);
    ctx.textAlign = "left";
    ctx.fillText(currency2 + Number(parseInt(operation == '/' ? v.value / rate : v.value * rate)).toLocaleString(), 425, y);
    y += 60;
  });

  //GENERAR
  const btn = document.createElement('a');
  btn.setAttribute('href', canvas.toDataURL("image/jpeg"));
  btn.setAttribute('download', 'tasagen_' + dt.getUTCDate() + (dt.getUTCMonth() + 1) + dt.getFullYear() + '.jpg');
  btn.click();
  drawImage(base);
  return false;
}