import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Song } from './../models/song';

@Injectable()
export class SongService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  getSong(token, id: string):Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    };

    return this._http.get(this.url + 'song/' + id, httpOptions);
  }
  getSongs(token, albumId = null):Observable<any>{
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    };
    if(albumId == null){
        return this._http.get(this.url + 'songs', httpOptions);
    }else{
        return this._http.get(this.url + 'songs/' + albumId, httpOptions);
    }
  }


  addSong(token, song: Song):Observable<any> {
    let params = JSON.stringify(song);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'song/', params, { headers: headers });
  }

  editSong(token, id: string, song: Song):Observable<any> {
    let params = JSON.stringify(song);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.put(this.url + 'song/' + id, params, {
      headers: headers,
    });
  }
  deleteSong(token, id: string):Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    };

    return this._http.delete(this.url + 'song/' + id, httpOptions);
  }
}
