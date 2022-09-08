import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {


  blogs: any = []
  constructor(private blogService: BlogService , private router : Router ) {
   }

  ngOnInit(): void {
    this.getMyBlogs()
  }

  getMyBlogs() {
    this.blogService.getMyBlogs().subscribe(
      (data: any) => {
        console.log(data.blogs);
        this.blogs = data.blogs;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  deleteBlog(id : any){
    this.blogService.deleteBlog(id).subscribe(
      (res: any) => {
        console.log(res.message);
        const newArr = this.blogs.filter( (blog : any) => blog._id !== id);
        this.blogs = newArr;
      },
      err => {
        console.log(err);
      }
    );
  }

  viewBlog(blogID: any) {
    this.router.navigate([`/blog/view/${blogID}`]);
  }

  editBlog(blogID: any){
    this.router.navigate(['/blog/create', {id : blogID}]);
  }

}
