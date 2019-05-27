import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { BehaviorSubject, Subject } from 'rxjs';
import {
  bufferCount,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  sample,
  scan,
  startWith,
  switchMap,
  tap,
  window
} from 'rxjs/operators';

import { ImageService, StorageService } from '@nggames/services';
import { shuffleArray } from '@nggames/array-utils';

import { Card } from '../card.model';
import { CardTurn } from '../card-turn.model';

@Component({
  selector: 'nggames-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  highScoreStorageKey = 'highScores';
  deckSizeOptions = [20, 18, 16, 12];
  deckSizeControl = new FormControl(this.deckSizeOptions[0], {updateOn: 'submit'});
  deckFormGroup = new FormGroup({
    'deckSize': this.deckSizeControl
  });
  cards$ = new BehaviorSubject<Card[]>(this.generateCards(this.deckSizeControl.value));

  cardTurn$ = new Subject<CardTurn>();

  revealedCards$ = this.cardTurn$.pipe(
    window(this.cards$),
    switchMap(
      card$ => card$.pipe(
        scan((cardTurns: CardTurn[], currentTurn: CardTurn) => cardTurns.length < 2 ? cardTurns.concat(currentTurn) : [currentTurn], []),
        startWith([])
      )
    )
  );

  matchedCards$ = this.revealedCards$.pipe(
    window(this.cards$),
    switchMap(
      matchedCards$ => matchedCards$.pipe(
        filter(([firstTurn, secondTurn]) => !!secondTurn && firstTurn.card.imageUrl === secondTurn.card.imageUrl),
        map(([firstTurn]) => firstTurn.card),
        scan((matchingCards: Card[], currentMatchingCard: Card) => matchingCards.concat(currentMatchingCard), []),
        startWith([])
      )
    )
  );

  gameOver$ = this.matchedCards$.pipe(
    filter(matchedCards => matchedCards.length === this.deckSizeControl.value / 2)
  );

  tries$ = this.revealedCards$.pipe(
    window(this.cards$),
    switchMap(turn$ => turn$.pipe(
      bufferCount(2),
      mapTo(1),
      scan((tries, currentTry) => tries + currentTry, 0),
      startWith(0)
    ))
  );

  highScore$ = this.tries$.pipe(
    sample(this.gameOver$),
    scan(
      (previousScores: {[deckSize: number]: number}, currentTries: number) => {
        const deckSize = this.deckSizeControl.value;
        return {
          ...previousScores,
          [deckSize]: Math.min(previousScores[deckSize] || Number.MAX_SAFE_INTEGER, currentTries)
        }
      },
      {}
    ),
    distinctUntilChanged((previousScores, currentScores) => previousScores[this.deckSizeControl.value] === currentScores[this.deckSizeControl.value]),
    tap(highScores => {
      this.snackbar.open(`Congratulations! Your new record is ${highScores[this.deckSizeControl.value]}.`, `I'm cool!`);
      this.storageService.set(this.highScoreStorageKey, {...this.storageService.get(this.highScoreStorageKey), ...highScores});
    }),
    startWith(this.storageService.get(this.highScoreStorageKey) || {}),
  );

  constructor(private imageService: ImageService, private storageService: StorageService, private snackbar: MatSnackBar) {}

  ngOnInit() {}

  startGame() {
    this.cards$.next(this.generateCards(this.deckSizeControl.value));
  }

  generateCards(numberOfCards: number) {
    const oneSetOfCards = this.imageService.getImages(numberOfCards / 2).map(imageUrl => ({imageUrl}));
    return shuffleArray(oneSetOfCards.concat(oneSetOfCards));
  }
}
