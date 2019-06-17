import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//COMPONENTES
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PersonasComponent } from './components/personas/personas.component';
import { CrearPersonaComponent } from './components/crear-persona/crear-persona.component';

//RUTAS
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

//FORMULARIOS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PRIME NG
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleriaModule } from 'primeng/galleria';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

// INTERCEPTOR
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpConfigInterceptor.interceptor';

//DIRECTIVAS
import { SoloNumerosDirective } from './components/shared/directives/solo-numeros.directive';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PersonasComponent,
    SoloNumerosDirective,
    CrearPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    GalleriaModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    RouterModule.forRoot( ROUTES)
  ],
  providers: [
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
