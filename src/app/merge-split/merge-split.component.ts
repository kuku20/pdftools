import { Component, OnInit } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-merge-split',
  templateUrl: './merge-split.component.html',
  styleUrls: ['./merge-split.component.scss']
})
export class MergeSplitComponent implements OnInit {

  selectedFiles: File[] = [];
  constructor() {}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedFiles, event.previousIndex, event.currentIndex);
  }
  ngOnInit(): void {}
  onFilesSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files[0].type == 'application/pdf') this.selectedFiles.push(files[i]);
      else alert('NOT A VALID PDF FILE');
    }
    console.log(this.selectedFiles);
  }
  async mergePDFs() {
    const pdfDoc = await PDFDocument.create();

    // Add PDFs to be merged (Replace 'pdfUrl1' and 'pdfUrl2' with your PDF URLs)
    const pdfUrls = this.selectedFiles;

    for (const file of pdfUrls) {
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);

      // Use PDFDocument.copyPages to copy pages from the source PDF to the target PDF
      const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());

      // Add the copied pages to the target PDF
      copiedPages.forEach((page) => pdfDoc.addPage(page));
    }

    // Serialize the merged PDF to bytes
    const mergedPdfBytes = await pdfDoc.save();

    // You can use the mergedPdfBytes to display or download the merged PDF
    // For example, you can create a Blob and generate a URL to download it:
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    this.displayPdf(url);
    // // link download
    // const downloadLink = document.createElement('a');
    // downloadLink.href = url;
    // downloadLink.download = 'merged.pdf'; // Specify the filename
    // downloadLink.textContent = 'Download Merged PDF';
    // document.body.appendChild(downloadLink);
    // Open the merged PDF in a new window for download
    // window.open(url);
  }

  displayPdf(url: any) {
    // Embed in an iframe
    var element = document.getElementById('pdfResult');
    element?.remove();
    const displayDiv = document.getElementById('display');
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = '900'; // Set the width in pixels
    iframe.height = '600'; // Set the height in pixels
    iframe.id = 'pdfResult';
    // document.body.appendChild(iframe);
    displayDiv?.appendChild(iframe);
  }
  remove(index:any){
    this.selectedFiles.splice(index,1)
  }

}
