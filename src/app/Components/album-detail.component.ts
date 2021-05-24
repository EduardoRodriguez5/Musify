
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { AlbumService } from './../services/album.service';
import { SongService } from './../services/song.service';
import { Album } from './../models/album';
import { Song } from './../models/song';




@Component({
  selector: 'album-detail',
  templateUrl: '../views/album-detail.html',
  providers: [UserService, AlbumService, SongService],
})
export class AlbumDetailComponent implements OnInit {
  public album: Album[];
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public songs: Song[];
  public confirmado;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _useService: UserService,
    private _albumService: AlbumService,
    private _songService: SongService
  ) {
    this.identity = this._useService.getIdentity();
    this.token = this._useService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('album-detail.component.ts cargado');
    //Sacar album de la bbdd
    this.getAlbum();
  }
  getAlbum() {

    console.log("El metodo funciona");
     
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._albumService.getAlbum(this.token, id).subscribe(
        response => {
          if (!response.album) {
            this._router.navigate(['/']);
          } else {
            this.album = response.album;

           
            //Sacar las canciones del album

           this._songService.getSongs(this.token, response.album._id).subscribe(

            response => {
              
              
              if(!response.songs){
                this.alertMessage = "Este album no tiene canciones";

              }else{
                this.songs = response.songs;
              }
            },
            error => {
              let errorMessage = <any>error;
              if (errorMessage != null) {
                let parsedError = error.error.message;
                // this.alertMessage = parsedError;
                console.log(parsedError);
              }
            });
            
          }
        },
        error => {
          let errorMessage = <any>error;
          if (errorMessage != null) {
            let parsedError = error.error.message;
            // this.alertMessage = parsedError;
            console.log(parsedError);
          }
        }
      );
    });
   
  }

  onDeleteConfirm(id){
    this.confirmado = id;

  }

  onCancelSong(){
    this.confirmado = null;
  }

  onDeleteSong(id){

    this._songService.deleteSong(this.token, id).subscribe(
      
      response => {
       
        if(!response.song){

          alert("Error en el servidor");
        }else{

          this.getAlbum();
        }
      },
      error => {
        let errorMessage = <any>error;
        if (errorMessage != null) {
          let parsedError = error.error.message;
          // this.alertMessage = parsedError;
          console.log(parsedError);
        }
      }
    )
  }

  startPlayer(song){
    
    let songPlayer  = JSON.stringify(song);
    let file_path = this.url + 'get-song-file/' + song.file;
    let image_path = this.url + 'get-image-album/' + song.album.image;

    localStorage.setItem('sound_song', songPlayer);

    document.getElementById("mp3-source").setAttribute("src", file_path);
    (document.getElementById("player") as any).load();
    (document.getElementById("player") as any).play();

    document.getElementById('play-song-title').innerHTML = song.name;
    document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
    document.getElementById("play-image-album").setAttribute("src", image_path);
  }
}