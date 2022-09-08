import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  blogs : any = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBlogs()
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(
      (data : any) => {
        console.log(data.blogs);
        this.blogs = data.blogs;
      },
      (err) => {
        console.log(err.message);
      } 
    );
  }

  viewBlog(blogID : any){
    this.router.navigate([`/blog/view/${blogID}`]);
  }

}
