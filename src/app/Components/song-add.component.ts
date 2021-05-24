import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Song } from './../models/song';
import { SongService } from './../services/song.service';







@Component({
  selector: 'song-add',
  templateUrl: '../views/song-add.html',
  providers: [UserService, SongService ],
})
export class SongAddComponent implements OnInit {
  public titulo: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _useService: UserService,
    private _songService: SongService
  
    
  ) {
    this.titulo = 'Crear nueva canción';
    this.identity = this._useService.getIdentity();
    this.token = this._useService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1 ,'', '','','');
    
  }
  ngOnInit(){
      console.log('comprobando componente song-add')
  }

  onSubmit(){
      
      this._route.params.forEach((params: Params)=>{
          let album_id = params['album'];
          this.song.album = album_id;
          console.log(this.song)

          this._songService.addSong(this.token, this.song).subscribe(
            response =>{
                
                if(!response.song){
                    this.alertMessage = 'Error en el servidor';
                }else{
                    this.alertMessage = 'La canción se ha creado correctamente';
                    this.song = response.song;
                    this._router.navigate(['/editar-tema', response.song._id]);
                }

            },
            error =>{
                let errorMessage = <any>error;
                if (errorMessage != null) {
                let parsedError = error.error.message;
                this.alertMessage = parsedError;
                console.log(parsedError);
                }
            }
          )
      })
   
  }
}