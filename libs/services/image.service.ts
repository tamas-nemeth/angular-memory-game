import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private technologies = [
    'angular',
    'd3',
    'jenkins',
    'postcss',
    'react',
    'redux',
    'sass',
    'supercharge',
    'ts',
    'webpack'
  ];

  constructor() {}

  getImages(numberOfImages: number) {
    return this.technologies.map(technology => `assets/cards/${technology}.png`).slice(0, numberOfImages);
  }
}
