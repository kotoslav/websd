const path = require('path')

module.exports = {
  // Указываем путь до входной точки:
  entry: './src/js/script.js',
  // Описываем, куда следует поместить результат работы:
  output: {
    // Путь до директории (важно использовать path.resolve):
    path: path.resolve(__dirname, 'frontend/js'),
    // Имя файла со сборкой:
    filename: 'script.js'
  }
}
