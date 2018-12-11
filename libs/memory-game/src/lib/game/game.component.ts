import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject, Subject } from 'rxjs';
import { bufferCount, filter, map, mapTo, mergeAll, scan, window } from 'rxjs/operators';

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
  deckSizeOfCurrentGame: number;

  deckSizeOptions = [20, 12];
  deckSizeControl = new FormControl(this.deckSizeOptions[0]);

  cardTurn$ = new Subject<CardTurn>();
  resetGame$ = new BehaviorSubject<any>(undefined);

  revealedCards$ = this.cardTurn$.pipe(
    scan((cardTurns: CardTurn[], currentTurn: CardTurn) => cardTurns.length < 2 ? cardTurns.concat(currentTurn) : [currentTurn], []),
    // TODO: maybe a combination of windowCount and something else would also work
    // also need to window the stream with resetGame$ so that tries$ restarts from zero when new game is started
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
    this.deckSizeOfCurrentGame = this.deckSizeControl.value;
    const oneSetOfCards = this.imageUrls.slice(0, this.deckSizeOfCurrentGame / 2).map(imageUrl => ({imageUrl}));
    this.cards = shuffleArray(oneSetOfCards.concat(oneSetOfCards));
    this.resetGame$.next(undefined);
  }

  constructor() {}

  ngOnInit() {
    this.startGame();
    this.matchedCards$.pipe(
      filter(matchedCards => matchedCards.length === this.deckSizeOfCurrentGame / 2)
    ).subscribe(() => {
      alert('Congratulations! You won the game.');
    });
  }
}
