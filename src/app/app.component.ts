import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { GLOBAL } from './services/global';
import {Router, ActivatedRoute, Params} from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.user = new User("", "", "", "", "", "ROLE_USER", "");
    this.user_register = new User("", "", "", "", "", "ROLE_USER", "");
    this.url = GLOBAL.url;

  }

  ngOnInit() {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit() {
    console.log(this.user);

    //Conseguir los datos del usuario identificado
    this._userService.singup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert("El usuario no está correctamente identificado")
        } else {
          //Crear elemento en el localstorage para tener al usuario sesión
          localStorage.setItem("identity", JSON.stringify(identity));

          //Conseguir el token para enviarselo a cada petición http.
          this._userService.singup(this.user, true).subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if (this.token.length <= 0) {
                alert("El token no se ha generado correctamente");
              } else {
                //Crear elemento en el localstorage para tener token disponible 
                localStorage.setItem("token", token);
                this.user = new User("", "", "", "", "", "ROLE_USER", "");

              }

            },
            error => {
              let errorMessage = <any>error;

              if (errorMessage != null) {
                let parsedError = error.error.message;
                console.log(parsedError);
                this.errorMessage = parsedError;
              }
            }
          );
        }

      },
      error => {
        let errorMessage = <any>error;

        if (errorMessage != null) {
          let parsedError = error.error.message;
          console.log(parsedError);
          this.errorMessage = parsedError;
        }
      }
    );
  }
  logout() {
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }
  
  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response =>{
        let user = response.user;

        this.user_register = user;
        if(!user._id){
          this.alertRegister = "Error al registrarse";
        }else{
          this.alertRegister = "El registro se ha realizado correctamente.";
          this.user_register = new User("", "", "", "", "", "ROLE_USER", "");

        }

      },
      error =>{
        let errorMessage = <any>error;

        if (errorMessage != null) {
          let parsedError = error.error.message;
          console.log(parsedError);
          this.alertRegister = parsedError;
        }
      }
    )
  }
}

