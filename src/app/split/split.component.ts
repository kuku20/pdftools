import { Component, OnInit } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss']
})
export class SplitComponent implements OnInit {
  pages: any[]=[];
  start!: number;
  end!: number;
  getPages!:any
  selectedFile: any;// TO DISPLAY NAME
  pdf:any

  constructor() {}

  ngOnInit(): void {}
  async onFilesSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files[0].type == 'application/pdf') {
        this.selectedFile=files[i]; // get name
        const pdfBytes = await this.selectedFile.arrayBuffer();
        this.pdf = await PDFDocument.load(pdfBytes);
        this.pages = this.pdf.getPageIndices();
        console.log(this.pages.length)
        if(this.pdf.getPageIndices().length===1){
          this.selectedFile = undefined
          alert('THIS PDF HAVE ONLY 1 PAGE, NO NEED TO SPLIT')
        }
      } else alert('NOT A VALID PDF FILE');
    }
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }
  async mergePDFs() {
    const pdfDoc = await PDFDocument.create();
    if(this.getPages)
      this.pages = this.getPages.split(',')
    const copiedPages = await pdfDoc.copyPages(this.pdf, this.pages);

    // Add the copied pages to the target PDF
    copiedPages.forEach((page) => pdfDoc.addPage(page));
    // Add PDFs to be merged (Replace 'pdfUrl1' and 'pdfUrl2' with your PDF URLs)

    // Serialize the merged PDF to bytes
    const mergedPdfBytes = await pdfDoc.save();

    // You can use the mergedPdfBytes to display or download the merged PDF
    // For example, you can create a Blob and generate a URL to download it:
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    this.displayPdf(url);
    this.download(url)
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
    this.selectedFile='';
  }
  download(url: any) {
    const displayDiv = document.getElementById('download');
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'merged.pdf'; // Specify the filename
    downloadLink.textContent = 'Download Merged PDF';
    document.body.appendChild(downloadLink);
  }
  getPage(event: any) {
    console.log(event.target.value);
    this.getPages = event.target.value
  }
}

