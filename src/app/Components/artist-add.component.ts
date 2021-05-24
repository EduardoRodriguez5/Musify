import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import {Artist} from '../models/artist';
import { ArtistService } from './../services/artists.service';


@Component({
    selector: "artist-add",
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]
})

export class ArtistAddComponent implements OnInit{

    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;



    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _useService: UserService,
        private _artistService: ArtistService
    ){
        this.titulo = "Crear nuevo artista";
        this.identity = this._useService.getIdentity();
        this.token = this._useService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('','','');
        
    }

    ngOnInit(){

        console.log('artist-add.component.ts cargado');
        //Conseguir el listado de artistas
    }

    onSubmit(){
        console.log(this.artist);
        this._artistService.addArtist(this.token, this.artist).subscribe(
            response =>{
                
                if(!response.artist){
                    this.alertMessage = 'Error en el servidor';
                }else{
                    this.alertMessage = 'El artista se ha creado correctamente';
                    this.artist = response.artist;
                    this._router.navigate(['/editar-artista', response.artist._id]);
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
        );
    }
}