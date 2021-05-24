import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Song } from './../models/song';
import { SongService } from './../services/song.service';
import { UploadService } from './../services/upload.service';





@Component({
  selector: 'song-edit',
  templateUrl: '../views/song-add.html',
  providers: [UserService, SongService, UploadService],
})
export class SongEditComponent implements OnInit {
  public titulo: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;
  public filesToUpload;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _useService: UserService,
    private _songService: SongService,
    private _uploadService: UploadService
  ) {
    this.titulo = 'Editar canción';
    this.identity = this._useService.getIdentity();
    this.token = this._useService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1 ,'', '','','');
    this.is_edit = true;
    
  }
  ngOnInit(){
      console.log('comprobando componente song-edit')

      //Sacar la canción a editar.
      this.getSong();
  }
  getSong(){
    this._route.params.forEach((params: Params)=>{

        let id = params['id'];
        
        this._songService.getSong(this.token, id).subscribe(
            response =>{
                if(!response.song){
                    this._router.navigate(['/']);
                }else{
                    this.song = response.song;
                }

            },
            error =>{
                let errorMessage = <any>error;
                if (errorMessage != null) {
                let parsedError = error.error.message;
                // this.alertMessage = parsedError;
                console.log(parsedError);
                }
            }
        )
    });
  }

  onSubmit(){
      
      this._route.params.forEach((params: Params)=>{
          let id = params['id'];

          this._songService.editSong(this.token, id, this.song).subscribe(
            response =>{
                
                if(!response.song){
                    this.alertMessage = 'Error en el servidor';
                }else{
                    this.alertMessage = 'La canción se ha actualizado correctamente';

                    if(!this.filesToUpload){
                        this._router.navigate(['/album', response.song.album]);
                    }else{

                         //Subir el fichero de audio.
                    this._uploadService.makeFileRequest(this.url + 'upload-file-song/' + id,[], this.filesToUpload, this.token, 'file')
                    .then(
                        (result) =>{
                            this._router.navigate(['/album', response.song.album]);
                        },
                        (error) =>{
                            console.log(error);
                        }
                    );
                    }
                   
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
      });
  }

  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}