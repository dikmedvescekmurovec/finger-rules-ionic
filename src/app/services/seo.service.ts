import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(private title: Title, private meta: Meta) { }

  public setTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
  }
}
