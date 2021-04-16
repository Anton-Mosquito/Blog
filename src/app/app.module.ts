import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { PasswordComponent } from './components/login/form/password/password.component';
import { EmailComponent } from './components/login/form/email/email.component';
import { CheckboxComponent } from './components/login/form/checkbox/checkbox.component';
import { TextComponent } from './components/login/form/text/text.component';
import { PhoneComponent } from './components/login/form/phone/phone.component';
import { FilmsComponent } from './components/films/films.component';
import { FilmListComponent } from './components/films/film-list/film-list.component';
import { FilmDetailsComponent } from './components/films/film-details/film-details.component';
import { CountryComponent } from './components/country/country.component';
import { CountryBlockComponent } from './components/country/country-block/country-block.component';
import { CountryFilterPipe } from './pipe/country-filter.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { LoaderForFilmsComponent } from './components/loader-for-films/loader-for-films.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    ArticlesComponent,
    ArticleComponent,
    PasswordComponent,
    EmailComponent,
    CheckboxComponent,
    TextComponent,
    PhoneComponent,
    FilmsComponent,
    FilmListComponent,
    FilmDetailsComponent,
    CountryComponent,
    CountryBlockComponent,
    CountryFilterPipe,
    LoaderComponent,
    LoaderForFilmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, // Injection Token
      useClass: LoggerInterceptor, // Interceptor class
      multi: true, // we added array
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
