const { Jimp } = require('jimp');
const path = require('path');

const logoDir = 'c:/Users/werbe/Desktop/site-ousia/criativos/assets/logos';

async function makeTransparentLogos() {
  console.log('Gerando PNGs 100% Transparentes sem retângulo de fundo...');

  // 1. Logo Escura -> PNG com texto creme e fundo 100% transparente
  const imgEscuro = await Jimp.read(path.join(logoDir, 'logo-ousia-escuro-cropped.jpg'));
  const w1 = imgEscuro.width;
  const h1 = imgEscuro.height;

  // Processa cada pixel para remover fundo escuro
  for (let y = 0; y < h1; y++) {
    for (let x = 0; x < w1; x++) {
      const idx = (y * w1 + x) * 4;
      const r = imgEscuro.bitmap.data[idx];
      const g = imgEscuro.bitmap.data[idx + 1];
      const b = imgEscuro.bitmap.data[idx + 2];

      const lum = r * 0.299 + g * 0.587 + b * 0.114;

      if (lum < 40) {
        // Totalmente transparente
        imgEscuro.bitmap.data[idx + 3] = 0;
      } else {
        // Transparência suave na borda das letras (Antialiasing)
        const alpha = Math.min(255, Math.max(0, Math.round((lum - 35) * 1.6)));
        imgEscuro.bitmap.data[idx + 0] = 232; // Creme R
        imgEscuro.bitmap.data[idx + 1] = 226; // Creme G
        imgEscuro.bitmap.data[idx + 2] = 217; // Creme B
        imgEscuro.bitmap.data[idx + 3] = alpha; // Alpha transparente
      }
    }
  }

  await imgEscuro.write(path.join(logoDir, 'logo-ousia-creme-transparente.png'));
  console.log('✔ logo-ousia-creme-transparente.png salva!');

  // 2. Logo Clara -> PNG com texto escuro e fundo 100% transparente
  const imgClaro = await Jimp.read(path.join(logoDir, 'logo-ousia-claro-cropped.jpg'));
  const w2 = imgClaro.width;
  const h2 = imgClaro.height;

  for (let y = 0; y < h2; y++) {
    for (let x = 0; x < w2; x++) {
      const idx = (y * w2 + x) * 4;
      const r = imgClaro.bitmap.data[idx];
      const g = imgClaro.bitmap.data[idx + 1];
      const b = imgClaro.bitmap.data[idx + 2];

      const lum = r * 0.299 + g * 0.587 + b * 0.114;

      if (lum > 220) {
        // Totalmente transparente
        imgClaro.bitmap.data[idx + 3] = 0;
      } else {
        // Transparência suave na borda das letras
        const alpha = Math.min(255, Math.max(0, Math.round((230 - lum) * 1.6)));
        imgClaro.bitmap.data[idx + 0] = 28;  // Espresso R
        imgClaro.bitmap.data[idx + 1] = 21;  // Espresso G
        imgClaro.bitmap.data[idx + 2] = 20;  // Espresso B
        imgClaro.bitmap.data[idx + 3] = alpha; // Alpha transparente
      }
    }
  }

  await imgClaro.write(path.join(logoDir, 'logo-ousia-escuro-transparente.png'));
  console.log('✔ logo-ousia-escuro-transparente.png salva!');
}

makeTransparentLogos().catch(err => console.error(err));
