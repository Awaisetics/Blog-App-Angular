import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  title : string = '';
  content : string = '';

  loading : boolean = false;
  message : string = '';
  isError : boolean = false;
  errorMsg : string = 'Something Went Wrong';



  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '150px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
};

  suggestedTags = ['Business', 'Tech', 'Travel', 'Food']
  userTags: String[] = [];

  blogID: any;

  constructor(private blogService: BlogService, private router : Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.blogID = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.blogID);
    if (this.blogID) {
      this.blogService.getBlog(this.blogID).subscribe(
        (data: any) => {
          console.log(data.blog);
          this.title = data.blog.title;
          this.content = data.blog.content;
          this.userTags = data.blog.tags;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }


  onTagAdd(e : any){
    this.userTags.push(e.value);
  }

  onTagRemove(e : any){
    this.userTags = this.userTags.filter( tag => tag !== e)
  }

  create(){
    this.loading = true;
    this.message = '';
    this.isError = false;
    const data: any = {
      title: this.title,
      content: this.content,
      tags : this.userTags,
    }
    this.blogService.createBlog(data).subscribe(
      (res: any) => {
        this.message = res.message;
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.isError = true;
        this.errorMsg = err.error.message;
        this.loading = false;
      },
    );
  }

  update() {
    this.loading = true;
    this.message = '';
    this.isError = false;
    const data: any = {
      id : this.blogID,
      title: this.title,
      content: this.content,
      tags: this.userTags,
    }
    this.blogService.updateBlog(data).subscribe(
      (res: any) => {
        console.log(res.message);
        this.loading = false;
        this.router.navigate(['/myBlogs']);
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.errorMsg = err.error.message;
        this.loading = false;
      }
    )
  }

}
