import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Import HttpClientModule
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';
import { RatingComponent } from './rating/rating.component';
import { TeamMembersComponent } from './team-members/team-members.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BannerComponent,
    HomeComponent,
    RatingComponent,
    TeamMembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
