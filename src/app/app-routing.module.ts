import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './blog/pages/home/home.component';
import { RegisterComponent } from './blog/pages/register/register.component';
import { LoginComponent } from './blog/pages/login/login.component';
import { DashboardComponent } from './blog/pages/dashboard/dashboard.component';
import { AuthGuard } from './blog/guards/auth.guard';
import { MyBlogsComponent } from './blog/pages/my-blogs/my-blogs.component';
import { CreateBlogComponent } from './blog/pages/create-blog/create-blog.component';
import { ViewBlogComponent } from './blog/pages/view-blog/view-blog.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
  },
  {
    path : 'register',
    component : RegisterComponent,
  },
  {
    path : 'login',
    component : LoginComponent,
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuard],
  },
  {
    path: 'myBlogs',
    component : MyBlogsComponent,
    canActivate : [AuthGuard],
  },
  {
    path: 'blog/view/:id',
    component : ViewBlogComponent,
    canActivate : [AuthGuard],
  },
  {
    path: 'blog/create',
    component : CreateBlogComponent,
    canActivate : [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
