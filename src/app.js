import PDFViewer from './components/pdf-viewer/PDFViewer';
import AnnotationCanvasController from './components/annotation-editor/controllers/AnnotationCanvasController';
import TextLayerController from './components/annotation-editor/controllers/TextLayerController';

// Let's instantiate the Viewer Component
const pdfViewer = new PDFViewer('http://localhost:63342/annotate-pdf/dist/sample.pdf','1.0');

// Let's instantiate the AnnotationCanvasController
const annotationCanvasController = new AnnotationCanvasController(document.getElementById('canvas'));
annotationCanvasController.watch();

const textLayerController = new TextLayerController(document.getElementById('text-layer'));


