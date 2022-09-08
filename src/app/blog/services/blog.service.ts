import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient : HttpClient) { }

  getAllBlogs(){
    return this.httpClient.get('http://localhost:3000/blogs/all');
  }

  getBlog(blogID : any){
    return this.httpClient.get(`http://localhost:3000/blogs/${blogID}`);
  }

  getMyBlogs(){
    return this.httpClient.get('http://localhost:3000/blogs/myBlogs');
  }

  createBlog(data : any){
    return this.httpClient.post('http://localhost:3000/blogs/create',data);
  }

  deleteBlog(id : any){
    return this.httpClient.delete(`http://localhost:3000/blogs/destroy/${id}`);
  }

  updateBlog(data : any){
    return this.httpClient.put('http://localhost:3000/blogs/update', data);
  }

  addComment(data : any){
    return this.httpClient.put('http://localhost:3000/blogs/comment/add', data);
  }
  
}
