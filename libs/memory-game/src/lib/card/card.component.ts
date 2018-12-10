import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Card } from '../card.model';

@Component({
  selector: 'supergames-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() index: number;
  @Input() visibleCardIndexes: [number, number];
  @Input() hiddenCardIndexes: number[];
  get isUnfolded() {
    return this.visibleCardIndexes.includes(this.index);
  }
  get isHidden() {
    return this.hiddenCardIndexes.includes(this.index);
  }
  click$ = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit() {}

  onClick(event: MouseEvent) {
    this.click$.emit(event);
  }
}
