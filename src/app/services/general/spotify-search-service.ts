import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Album } from 'src/app/interfaces/album';
import { Track } from 'src/app/interfaces/track';
import { Artist, ArtistMapper } from 'src/app/interfaces/artist';
import { SpotifySearchResponse } from 'src/app/interfaces/spotify-api/spotify-search-response';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchService {
  constructor(private http: HttpClient) { }

  search(query: string): Observable<{ albums: Album[], artists: Artist[] }> {

    const searchUrl = `${environment.API_URL}/search?q=${encodeURIComponent(query)}&type=album,track,artist&limit=10`;

    return this.http.get<SpotifySearchResponse>(searchUrl).pipe(
      map(response => {

        const albumResults: Album[] = response.albums?.items
          ? response.albums.items
            .filter(album => album.id)
            .map(album => ({
              id: album.id,
              name: album.name,
              total_tracks: album.total_tracks || 0,
              images: album.images?.map(img => ({
                width: img.width || 0,
                height: img.height || 0,
                url: img.url || ''
              })) || [],
              href: album.href || '',
              tracks: []
            }))
          : [];

        const artistResults: Artist[] = response.artists?.items
          ? response.artists.items
            .filter(artist => artist.id)
            .map(artist => ArtistMapper.fromSpotifyArtist(artist))
          : [];

        return {
          albums: albumResults,
          artists: artistResults
        };
      }),
    );
  }

}