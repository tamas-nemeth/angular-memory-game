import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { bufferCount, filter, map, mapTo, scan } from 'rxjs/operators';

import { shuffleArray } from '@supergames/array-utils';

@Component({
  selector: 'supergames-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  technologies = [
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
  imageUrls = this.technologies.map(technology => `assets/cards/${technology}.png`);

  numberOfCards = 20;

  get cards() {
    const oneSetOfCards = this.imageUrls.slice(0, this.numberOfCards / 2).map(imageUrl => ({imageUrl}));
    return shuffleArray(oneSetOfCards.concat(oneSetOfCards));
  }

  cardClick$ = new Subject<MouseEvent>();
  cardUnfold$ = this.cardClick$.pipe(
    map(event => event.target as HTMLElement),
    filter(target => target.classList.contains('mat-card')),
    map(target => +(target).textContent),
  );
  unfoldedCards$ = this.cardUnfold$.pipe(
    bufferCount(2)
  );
  tries$ = this.unfoldedCards$.pipe(
    mapTo(1),
    scan((tries, currentTry) => tries + currentTry, 0)
  );

  constructor() {}

  ngOnInit() {}
}
