
import { Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {GLOBAL} from "./global";

@Injectable()
export class UserService{

    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    singup(user_to_login, gethash = null):Observable<any>{
        if(gethash !=null){
            user_to_login.gethash = gethash;
        }
        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url +'login', params,{headers: headers});

    }

    register(user_to_register):Observable<any>{
        let params = JSON.stringify(user_to_register);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url +'register', params,{headers: headers});
    }

    

    getIdentity():Observable<any>{
        let identity = JSON.parse(localStorage.getItem("identity"));

        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
        
    }
    getToken():Observable<any>{

        let token = localStorage.getItem("token");

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
    updateUser(user_to_update):Observable<any>{

        let params = JSON.stringify(user_to_update);
        let token = JSON.stringify(this.getToken());
        

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token)
                                        

        return this._http.put(this.url +'update-user/' + user_to_update._id, params,{headers: headers});
    }

  

}