import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly router: Router){}
  ngOnInit(): void {
    this.seo()
  }
  title = 'pdftools';

  seo(){
    this.router.events.pipe(filter(event =>event instanceof ActivationEnd)).subscribe((event) => {
      const canonical = document.querySelector('link[rel="canonical"]') as HTMLAnchorElement | null;
      if (canonical !== null) {
        canonical.href = window.location.origin + window.location.pathname;
      }
  });
  }
}
