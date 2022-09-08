import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './blog/pages/register/register.component';
import { LoginComponent } from './blog/pages/login/login.component';
import { HomeComponent } from './blog/pages/home/home.component';
import { DashboardComponent } from './blog/pages/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './blog/interceptors/api.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './blog/pages/navbar/navbar.component';
import { CreateBlogComponent } from './blog/pages/create-blog/create-blog.component';
import { MyBlogsComponent } from './blog/pages/my-blogs/my-blogs.component';
import { ViewBlogComponent } from './blog/pages/view-blog/view-blog.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    CreateBlogComponent,
    MyBlogsComponent,
    ViewBlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
    TagInputModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : ApiInterceptor,
      multi : true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
