import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Album } from '../models/album';
import { AlbumService } from './../services/album.service';
import { UploadService } from './../services/upload.service';


@Component({
  selector: 'album-edit',
  templateUrl: '../views/album-add.html',
  providers: [UserService, AlbumService, UploadService],
})
export class AlbumEditComponent implements OnInit {
  public titulo: string;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;
  public filesToUpload: Array<File>;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _useService: UserService,
    private _albumService: AlbumService,
    private _uploadService: UploadService
  ) {
    this.titulo = 'Editar album';
    this.identity = this._useService.getIdentity();
    this.token = this._useService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', 2017, '', '');
    this.is_edit = true;
  }
  ngOnInit() {
    console.log('comprobando componente album-edit');

    //Conseguir el album
    this.getAlbum();
  }
  getAlbum() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._albumService.getAlbum(this.token, id).subscribe(
        (response) => {
          if (!response.album) {
            this._router.navigate(['/']);
          } else {
            this.album = response.album;
          }
        },
        (error) => {
          let errorMessage = <any>error;
          if (errorMessage != null) {
            let parsedError = error.error.message;
            console.log(parsedError);
          }
        }
      );
    });
  }

  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._albumService.editAlbum(this.token, id, this.album).subscribe(
        (response) => {
          if (!response.album) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = 'El album se ha actualizado correctamente';
            if(!this.filesToUpload){

                //Redirigir
                this._router.navigate(['/artista', response.album.artist]);

            }else{

                //Subir la imagen
                this._uploadService.makeFileRequest(this.url + 'upload-image-album/' + id,[], this.filesToUpload, this.token, 'image')
                .then(
                    (result) =>{
                        this._router.navigate(['/artista', response.album.artist]);
                    },
                    (error) =>{
                        console.log(error);
                    }
                );
            }

          }
        },
        (error) => {
          let errorMessage = <any>error;
          if (errorMessage != null) {
            let parsedError = error.error.message;
            this.alertMessage = parsedError;
            console.log(parsedError);
          }
        }
      );
    });
  }


  fileChangeEvent(fileInput:any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
