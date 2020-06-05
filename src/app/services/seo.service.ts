import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(private title: Title, private meta: Meta) { }

  /**
   * Sets title of web page and it's og:title.
   * @param title Title to set
   */
  public setTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
  }
}
