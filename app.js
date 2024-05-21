const webp=require('webp-converter');
const fs = require('fs');
const path = require('path');
const tinify = require("tinify");
tinify.key = process.env.TINIFY_KEY;
console.log(`今月已使用${tinify.compressionCount}次壓縮`);

const imageFilePath = process.argv[3];
const inputFolderPath = path.dirname(imageFilePath)+ path.sep;
const inputFileName = path.basename(imageFilePath);
console.log("🚀 ~ inputFileName:", inputFileName)
const targetWidth = 600
//console.log(process.argv)

/* const source = tinify.fromFile("unoptimized.webp");
source.toFile("optimized.webp"); */

console.log('inputFolderPath : '+inputFolderPath)
console.log('imageFilePath : '+imageFilePath)
console.log('path sep : '+path.sep)

//process.exit(0);
var Jimp = require("jimp");

Jimp.read(imageFilePath)
  .then((image) => {
    // Resize the image
    image.resize(targetWidth, Jimp.AUTO); // Provide the desired width and maintain aspect ratio
    console.log(`${inputFolderPath}${inputFileName}-${targetWidth}w.png`)
    // Save the resized image
    return image.writeAsync(`${inputFolderPath}${inputFileName}-${targetWidth}w.png`);
  })
  .then(() => {
    console.log('Image resized successfully.');

    // Convert the resized image to WebP format
    return webp.cwebp(`${inputFolderPath}${inputFileName}-${targetWidth}w.png`, `${inputFolderPath}${inputFileName}-${targetWidth}w.webp`, '-q 90');
    //return webp.cwebp(inputFolderPath+'output.png', inputFolderPath+'output.webp', '-q 90');
  })
  .then(() => {
    console.log('Image converted to WebP format successfully.');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });



