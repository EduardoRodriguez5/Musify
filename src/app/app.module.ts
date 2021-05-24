import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserEditComponent } from './Components/user-edit.component';
import { ArtistListComponent } from './Components/artist-list.component';
import { HomeComponent } from './Components/home.component';
import { ArtistAddComponent } from './Components/artist-add.component';
import { ArtistEditComponent } from './Components/artist-edit.component';
import { ArtistDetailComponent } from './Components/artist-detail.component';
import { AlbumAddComponent } from './Components/album-add.component';
import { AlbumEditComponent } from './Components/album-edit.component';
import { AlbumDetailComponent } from './Components/album-detail.component';
import { SongAddComponent } from './Components/song-add.component';
import { SongEditComponent } from './Components/song-edit.component';
import { PlayerComponent } from './Components/player.component';








@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
