import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongInfo } from './components/song-info/song-info';
import { SearchBar } from './components/search-bar/search-bar';
import { AudioController } from './components/audio-controller/audio-controller';
import { Playlist } from './components/playlist/playlist';
import { Album } from './components/album/album';
import { AppRoutingModule } from "src/app/app-routing-module";
import { ArtistCard } from './components/artist-card/artist-card';


@NgModule({
  declarations: [
    SongInfo,
    AudioController,
    Album,
    Playlist,
    SearchBar,
    ArtistCard
  ],
  imports: [
    CommonModule,
    AppRoutingModule
],
  exports: [
    SongInfo,
    AudioController,
    Album,
    Playlist,
    SearchBar,
    ArtistCard
  ]
})
export class SharedModule { }
