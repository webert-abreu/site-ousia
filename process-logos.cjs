const { Jimp } = require('jimp');
const path = require('path');

const logoDir = 'c:/Users/werbe/Desktop/site-ousia/criativos/assets/logos';

async function processLogos() {
  console.log('Iniciando processamento das logos...');

  // 1. Processar Logo Escura (Texto claro em fundo escuro #1C1514)
  const imgEscuro = await Jimp.read(path.join(logoDir, 'logo-ousia-escuro.jpg'));
  const w1 = imgEscuro.width;
  const h1 = imgEscuro.height;

  let minX1 = w1, maxX1 = 0, minY1 = h1, maxY1 = 0;

  for (let y = 0; y < h1; y++) {
    for (let x = 0; x < w1; x++) {
      const color = imgEscuro.getPixelColor(x, y);
      const r = (color >> 24) & 0xFF;
      const g = (color >> 16) & 0xFF;
      const b = (color >> 8) & 0xFF;

      if (r > 55 || g > 50 || b > 50) {
        if (x < minX1) minX1 = x;
        if (x > maxX1) maxX1 = x;
        if (y < minY1) minY1 = y;
        if (y > maxY1) maxY1 = y;
      }
    }
  }

  const pad = 30;
  const cropX1 = Math.max(0, minX1 - pad);
  const cropY1 = Math.max(0, minY1 - pad);
  const cropW1 = Math.min(w1 - cropX1, (maxX1 - minX1) + pad * 2);
  const cropH1 = Math.min(h1 - cropY1, (maxY1 - minY1) + pad * 2);

  imgEscuro.crop({ x: cropX1, y: cropY1, w: cropW1, h: cropH1 });
  await imgEscuro.write(path.join(logoDir, 'logo-ousia-escuro-cropped.jpg'));
  console.log('Logo escuro cortado:', cropW1, 'x', cropH1);

  // 2. Processar Logo Clara (Texto escuro em fundo claro #FFFFFF)
  const imgClaro = await Jimp.read(path.join(logoDir, 'logo-ousia-claro.jpg'));
  const w2 = imgClaro.width;
  const h2 = imgClaro.height;

  let minX2 = w2, maxX2 = 0, minY2 = h2, maxY2 = 0;

  for (let y = 0; y < h2; y++) {
    for (let x = 0; x < w2; x++) {
      const color = imgClaro.getPixelColor(x, y);
      const r = (color >> 24) & 0xFF;
      const g = (color >> 16) & 0xFF;
      const b = (color >> 8) & 0xFF;

      if (r < 235 || g < 235 || b < 235) {
        if (x < minX2) minX2 = x;
        if (x > maxX2) maxX2 = x;
        if (y < minY2) minY2 = y;
        if (y > maxY2) maxY2 = y;
      }
    }
  }

  const cropX2 = Math.max(0, minX2 - pad);
  const cropY2 = Math.max(0, minY2 - pad);
  const cropW2 = Math.min(w2 - cropX2, (maxX2 - minX2) + pad * 2);
  const cropH2 = Math.min(h2 - cropY2, (maxY2 - minY2) + pad * 2);

  imgClaro.crop({ x: cropX2, y: cropY2, w: cropW2, h: cropH2 });
  await imgClaro.write(path.join(logoDir, 'logo-ousia-claro-cropped.jpg'));
  console.log('Logo claro cortado:', cropW2, 'x', cropH2);
}

processLogos().catch(err => console.error(err));
