import { Component, OnInit, signal } from '@angular/core';
import { Album } from 'src/app/interfaces/album';
import { Track } from 'src/app/interfaces/track';
import { Artist } from 'src/app/interfaces/artist';
import { ActivatedRoute } from '@angular/router';
import { SpotifySearchService } from '../../services/general/spotify-search-service';
import { PlayerStateService } from '../../services/general/player-state-service';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.html',
  styleUrl: './search-results.css'
})
export class SearchResults implements OnInit {

  albumResults = signal<Album[]>([]);
  artistResults = signal<Artist[]>([]);
  searchQuery = signal('');

  constructor(
    private route: ActivatedRoute,
    private searchService: SpotifySearchService,
    private playerState: PlayerStateService
  ) { }

  searchError = signal<string | null>(null);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.searchQuery.set(query);
        this.performSearch(query);
      }
    });
  }

  private performSearch(query: string) {
    this.searchService.search(query).subscribe({
      next: (results) => {        
        const validArtists = results.artists.filter(artist => artist.id && artist.id.length > 0);
        const validAlbums = results.albums.filter(album => album.id && album.id.length > 0);
                
        this.artistResults.set(validArtists);
        this.albumResults.set(validAlbums);
      }
    });
  }

  onAlbumClick(album: Album) {
    if (!album.id) {
      this.searchError.set('Este álbum no tiene un ID válido');
      return;
    }

    this.playerState.selectAlbum(album);
  }

}
