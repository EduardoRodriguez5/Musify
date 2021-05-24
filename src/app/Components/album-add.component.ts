import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import {Album} from "../models/album";
import { ArtistService } from './../services/artists.service';
import { AlbumService } from './../services/album.service';



@Component({
  selector: 'album-add',
  templateUrl: '../views/album-add.html',
  providers: [UserService, ArtistService, AlbumService],
})
export class AlbumAddComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _useService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService,
    
  ) {
    this.titulo = 'Crear nuevo album';
    this.identity = this._useService.getIdentity();
    this.token = this._useService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', 2017,'','');
    
  }
  ngOnInit(){
      console.log('comprobando componente album-add')
  }

  onSubmit(){
      this._route.params.forEach((params: Params)=>{
          let artist_id = params['artist'];
          this.album.artist = artist_id;

          this._albumService.addAlbum(this.token, this.album).subscribe(
            response =>{
                
                if(!response.album){
                    this.alertMessage = 'Error en el servidor';
                }else{
                    this.alertMessage = 'El album se ha creado correctamente';
                    this.album = response.album;
                    this._router.navigate(['/editar-album', response.album._id]);
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