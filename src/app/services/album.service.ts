
import { Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {GLOBAL} from "./global";
import { Album } from './../models/album';



@Injectable()
export class AlbumService{

    public url: string;
   

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    getAlbums(token, artistId = null):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };
        if(artistId == null){

            return this._http.get(this.url + "albums", httpOptions);

        }else{
            return this._http.get(this.url + "albums/" +artistId, httpOptions);
        }

    }

    getAlbum(token, id: string):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };

        return this._http.get(this.url + "album/" + id, httpOptions);
    }

    addAlbum(token, album: Album):Observable<any>{
        let params = JSON.stringify(album);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        
        return this._http.post(this.url +'album', params, {headers:headers})
    }
    editAlbum(token, id:string, album: Album):Observable<any>{
        let params = JSON.stringify(album);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        
        return this._http.put(this.url +'album/' + id, params, {headers:headers})
    };

    deleteAlbum(token, id: string):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };
        return this._http.delete(this.url + "album/" + id, httpOptions);
    };
}