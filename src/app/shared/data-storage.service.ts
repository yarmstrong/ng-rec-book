import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from 'app/recipes/recipe.service';
import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  saveData() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-xxx-test.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  fetchData() {
    const token = this.authService.getToken();
    this.http.get('https://ng-xxx-test.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          console.log('doing data mapping / fetching data...');
          return response.json();
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        },
        (error) => {
          console.log(error);
        }
      )
  }
}