import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})

export class ViewBlogComponent implements OnInit {
  
  blogID : any ;
  blog : any ;
  comment : string = '';
  constructor(private blogService: BlogService , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.blogID = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.blogID);
    this.blogService.getBlog(this.blogID).subscribe(
      (data : any ) => {
        console.log(data.blog);
        this.blog = data.blog;
      },
      (err) => {
        console.log(err);
        
      }
    );
  }

  addComment(blogID: any) {
    this.blogService.addComment({ blogID, comment: this.comment }).subscribe(
      (data: any) => {
        this.blog.comments = data.blog.comments;
        this.comment = '';
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

}
