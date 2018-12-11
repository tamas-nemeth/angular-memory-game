import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { bufferCount, filter, map, mapTo, scan } from 'rxjs/operators';

import { shuffleArray } from '@supergames/array-utils';
import { Card } from '../card.model';
import { CardTurn } from '../card-turn.model';

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
  cards: Card[];

  numberOfCards = 20;

  cardTurn$ = new Subject<CardTurn>();

  revealedCards$ = this.cardTurn$.pipe(
    // TODO: maybe a combination of windowCount and something else would also work
    scan((cardTurns: CardTurn[], currentTurn: CardTurn) => cardTurns.length < 2 ? cardTurns.concat(currentTurn) : [currentTurn], [])
  );

  matchedCards$ = this.revealedCards$.pipe(
    filter(([firstTurn, secondTurn]) => !!secondTurn && firstTurn.card.imageUrl === secondTurn.card.imageUrl),
    map(([firstTurn]) => firstTurn.card),
    scan((matchingCards: Card[], currentMatchingCard: Card) => matchingCards.concat(currentMatchingCard), [])
  );

  tries$ = this.revealedCards$.pipe(
    bufferCount(2),
    mapTo(1),
    scan((tries, currentTry) => tries + currentTry, 0)
  );

  startGame() {
    const oneSetOfCards = this.imageUrls.slice(0, this.numberOfCards / 2).map(imageUrl => ({imageUrl}));
    this.cards = shuffleArray(oneSetOfCards.concat(oneSetOfCards));
  }

  constructor() {}

  ngOnInit() {
    this.startGame();
  }
}
