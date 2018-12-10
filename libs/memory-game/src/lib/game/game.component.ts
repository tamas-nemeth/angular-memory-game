import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'supergames-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  numberOfCards = 20;
  cards = Array.from({length: this.numberOfCards}, (_, index) => ({index, image: ''}));

  constructor() {}

  ngOnInit() {}
}
