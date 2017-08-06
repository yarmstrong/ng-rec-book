import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from 'app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  paramsId: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    // subscribe when params['id'] changes every reload
    this.route.params.subscribe(
      (params: Params) => {
        this.paramsId = +params['id']; // to be used in route navigation
        this.recipe = this.recipeService.getRecipe(this.paramsId);
      }
    )
  }

  toShoppingList() {
    this.recipeService.onRecipeToShoppingList(this.recipe.ingredients);
    this.router.navigate(['shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['../', this.paramsId, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.paramsId);
    this.router.navigate(['recipes']);
  }
}