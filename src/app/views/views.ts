import { Component, OnInit, signal } from '@angular/core';
import { PlayerStateService } from '../services/general/player-state-service';
import { Album } from '../interfaces/album';
import { Track } from '../interfaces/track';
import { Image } from '../interfaces/image';
import { Song } from '../interfaces/song';

@Component({
  selector: 'app-views',
  standalone: false,
  templateUrl: './views.html',
  styleUrl: './views.css'
})
export class Views implements OnInit {
  // Albums y playlist
  randomAlbums = signal<Album[]>([]);
  playlist = signal<Track[]>([]);

  // Canción actual
  currentSong = signal<Track | undefined>(undefined);
  currentCover = signal<Image | undefined>(undefined);

  // Para el reproductor
  currentPlayableSong = signal<Song | undefined>(undefined);
  playablePlaylist = signal<Song[]>([]);

  constructor(private playerState: PlayerStateService) {
  }

  ngOnInit(): void {
    // cargar albums aleatorios
    this.playerState.loadRandomAlbums(12);

    // actualizar albums
    this.playerState.randomAlbums$.subscribe(albums => {
      this.randomAlbums.set(albums);
    });

    // actualizar canción y playlist
    this.playerState.currentSong$.subscribe(song => {
      this.currentSong.set(song);
    });

    // actualizar portada
    this.playerState.currentCover$.subscribe(cover => {
      this.currentCover.set(cover);
    });

    // actualizar playlist
    this.playerState.playlist$.subscribe(tracks => {
      this.playlist.set(tracks);
    });
  }

  onAlbumSelected(album: Album) {
    this.playerState.selectAlbum(album);
  }

}
