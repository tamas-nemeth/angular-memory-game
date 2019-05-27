import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Card } from '../card.model';
import { CardTurn } from '../card-turn.model';

@Component({
  selector: 'nggames-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() index: number;
  @Input() revealedCards: CardTurn[] = [];
  @Input() matchedCards: Card[];
  @Output() turn = new EventEmitter<CardTurn>();

  get isTurnedUp() {
    return !!this.revealedCards && this.revealedCards.some(revealedCard => revealedCard.index === this.index);
  }

  get hasBeenMatched() {
    return !!this.matchedCards && this.matchedCards.some(matchedCard => this.card.imageUrl === matchedCard.imageUrl);
  }

  get isOnlyCardTurnedUp() {
    return this.revealedCards.length === 1 && this.isTurnedUp;
  }

  constructor() { }

  ngOnInit() {}

  onClick() {
    if (!this.hasBeenMatched && !this.isOnlyCardTurnedUp) {
      this.turn.emit({card: this.card, index: this.index});
    }
  }
}
