import { Component, input } from '@angular/core';

@Component({
  selector: 'app-artist-card',
  standalone: false,
  templateUrl: './artist-card.html',
  styleUrl: './artist-card.css'
})
export class ArtistCard {
  artist = input.required<any>();
}
