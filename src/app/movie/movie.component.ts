import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  type = "";
  id = "";
  url = "";
  movies: any;
  movie: any;
  film: any;
  addForm: FormGroup;
 
  constructor(private route:ActivatedRoute, private http:HttpClient, private fb: FormBuilder)
  {
    this.addForm= this.fb.group({
      author: ['', Validators.required],
      rating: ['', [Validators.required]],
      review: ['', [Validators.required]],
    });
  }
  ngOnInit(): void{
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type === 'trending')
    {
      this.url = "http://localhost:3000/trending-movies";
    }
    if (this.type === 'theatre')
    {
      this.url = "http://localhost:3000/theatre-movies";
    }
    if (this.type === 'popular')
    {
      this.url = "http://localhost:3000/popular-movies";
    }
    this.getMovie();
  }

  getMovie(){
    this.http.get(this.url).subscribe((movies) => {
      this.movies = movies;
      let index = this.movies.findIndex((movie: { id: string; }) => movie.id == this.id)
      if (index > -1)
      {
        this.movie = this.movies[index];
      }
    });
  }

  ajout(){
    if (this.addForm.valid) {
      this.film = {...this.addForm.value, "published_on" : Date()}
      this.http.patch(this.url +"/" + this.id, { "reviews": [...this.movie.reviews, this.film]}).subscribe(a => {console.log("Ajout done successfully") 
    ; this.getMovie()} );
      

    }
}


}
