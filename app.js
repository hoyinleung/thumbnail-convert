const webp = require('webp-converter');
const path = require('path');
//const tinify = require("tinify");
const prompt = require('prompt');
var Jimp = require("jimp");
let targetWidth = 600

/* tinify.key = process.env.TINIFY;
console.log(`今月已使用${tinify.compressionCount}次壓縮`); */

const imageFilePath = process.argv[3];
const inputFolderPath = path.dirname(imageFilePath) + path.sep;
const inputFileName = path.basename(imageFilePath);
const { name } = path.parse(inputFileName); // filename without extension

/* const source = tinify.fromFile("unoptimized.webp");
source.toFile("optimized.webp"); */

console.log('inputFolderPath : ' + inputFolderPath)
console.log('imageFilePath : ' + imageFilePath)
console.log('path sep : ' + path.sep)

prompt.start();
async function getUserInput() {
  const result = await new Promise(resolve => {
    prompt.get({
      name: 'targetWidth',
      message: 'What is your targetWidth?'
    }, (err, result) => {
      resolve(result);
    });
  });

  targetWidth = Number(result.targetWidth)

  Jimp.read(imageFilePath)
  .then((image) => {
    // Resize the image
    image.resize(targetWidth, Jimp.AUTO); // Provide the desired width and maintain aspect ratio
    console.log(`${inputFolderPath}${inputFileName}-${targetWidth}w.png`)
    // Save the resized image
    return image.writeAsync(`${inputFolderPath}${name}-${targetWidth}w.png`);
  })
  .then(() => {
    console.log('Image resized successfully.');

    // Convert the resized image to WebP format
    return webp.cwebp(`${inputFolderPath}${name}-${targetWidth}w.png`, `${inputFolderPath}${name}-${targetWidth}w.webp`, '-q 90');
  })
  .then(() => {
    console.log('Image converted to WebP format successfully.');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
}
getUserInput()
/* prompt.get({
  name: 'targetWidth',
  message: 'What is your targetWidth?'
}, (err, result) => {
  targetWidth = result.targetWidth
}); */

//process.exit(0);






