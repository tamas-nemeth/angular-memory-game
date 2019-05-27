import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private technologies = [
    'angular',
    'ts',
    'reactivex',
    'ngrx',
    'nodejs',
    'puppeteer',
    'sass',
    'git',
    'jest',
    'nx'
  ];

  constructor() {}

  getImages(numberOfImages: number) {
    return this.technologies.map(technology => `assets/cards/${technology}.svg`).slice(0, numberOfImages);
  }
}
