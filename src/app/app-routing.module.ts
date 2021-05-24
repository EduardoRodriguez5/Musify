import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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









const routes: Routes = [
 
  { path: '', component: HomeComponent },
  { path: 'artistas/:page', component: ArtistListComponent },
  { path: 'crear_artista', component: ArtistAddComponent},
  { path: 'editar-artista/:id', component: ArtistEditComponent},
  { path: 'artista/:id', component: ArtistDetailComponent},
  { path: 'crear-album/:artist', component: AlbumAddComponent},
  { path: 'editar-album/:id', component: AlbumEditComponent},
  { path: 'album/:id', component: AlbumDetailComponent},
  { path: 'crear-tema/:album', component: SongAddComponent},
  { path: 'editar-tema/:id', component: SongEditComponent},
  { path: 'mis-datos', component: UserEditComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
