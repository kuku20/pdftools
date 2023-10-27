import { Component, OnInit } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-merge-split',
  templateUrl: './merge-split.component.html',
  styleUrls: ['./merge-split.component.scss'],
})
export class MergeSplitComponent implements OnInit {
  checked: any[] = [];
  start!: number;
  end!: number;
  selectedFiles: any[] = [];
  selectedFilesByte: any[] = [];
  constructor() {}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedFiles, event.previousIndex, event.currentIndex );
    moveItemInArray(this.selectedFilesByte, event.previousIndex, event.currentIndex );
    moveItemInArray(this.checked, event.previousIndex, event.currentIndex );
  }
  ngOnInit(): void {}
  async onFilesSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files[0].type == 'application/pdf') {
        const pdfBytes = await files[i].arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        this.checked.push(pdf.getPageIndices());
        this.selectedFiles.push(files[i]);
        this.selectedFilesByte.push(pdf)
      } else alert('NOT A VALID PDF FILE');
    }
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if(fileInput) fileInput.value = '';
    console.log(this.selectedFiles);
    console.log(this.checked);
    console.log(this.selectedFilesByte);
  }
  async mergePDFs() {
    const pdfDoc = await PDFDocument.create();
    let i= 0

    // Add PDFs to be merged (Replace 'pdfUrl1' and 'pdfUrl2' with your PDF URLs)

    for (const pdf of this.selectedFilesByte) {

      // Use PDFDocument.copyPages to copy pages from the source PDF to the target PDF
      const copiedPages = await pdfDoc.copyPages(pdf, this.checked[i]);

      // Add the copied pages to the target PDF
      copiedPages.forEach((page) => pdfDoc.addPage(page));
      i++
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
    displayDiv?.appendChild(iframe);
  }
  remove(index: any) {
    this.selectedFiles.splice(index, 1);
    this.checked.splice(index, 1);
    this.selectedFilesByte.splice(index, 1);
  }

  inputNumber(event: any, position: string) {
    if (position === 'start' && event.target.value !=position) {
      this.start = event.target.value;
    } else if (position === 'end' && event.target.value !=position) {
      this.end = event.target.value;
    }
    console.log(this.start, this.end);
  }
}
