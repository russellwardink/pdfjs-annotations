import pdfjs from 'pdfjs-dist';

class PDFViewer {
    constructor(url, scale) {
        this.url = url;
        this.scale = scale;
        pdfjs.GlobalWorkerOptions.workerSrc = './pdf.worker.bundle.js';
        this.loadPDF();
    }

    loadPDF() {
        // Loading a document.
        const loadingTask = pdfjs.getDocument(this.url);

        const that = this;
        loadingTask.promise.then(function (pdfDocument) {
            // Request a first page
            return pdfDocument.getPage(1).then(function (pdfPage) {
                const canvas = document.getElementById('pdf-canvas');
                // Display page on the existing canvas with 100% scale.
                const viewport = pdfPage.getViewport(canvas.width / pdfPage.getViewport(that.scale).width);

                const ctx = canvas.getContext('2d');
                return pdfPage.render({
                    canvasContext: ctx,
                    viewport: viewport,
                }).then(() => {
                    // Returns a promise, on resolving it will return text contents of the page
                    return pdfPage.getTextContent();
                }).then(function (textContent) {

                    console.log('rendering text');
                    // Pass the data to the method for rendering of text over the pdf canvas.
                    pdfjs.renderTextLayer({
                        textContent: textContent,
                        container: document.getElementById('text-layer'),
                        viewport: viewport,
                        textDivs: []
                    });

                });
            });
        }).catch(function (reason) {
            console.error('Error: ' + reason);
        });
    }
}

export default PDFViewer;
