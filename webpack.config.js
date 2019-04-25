const path = require('path');

module.exports = {
    entry: {
        'main': './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry',
    } ,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules')
        }
    }
};
