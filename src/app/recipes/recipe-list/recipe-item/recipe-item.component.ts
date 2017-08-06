import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from 'app/recipes/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() recipeIndex: number;
}