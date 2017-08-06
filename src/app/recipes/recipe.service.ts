import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from 'app/recipes/recipe.model';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeListUpdated = new Subject<Recipe[]>();
  recipeEditing = new Subject<number>();
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe 1',
      'This is simply a test 1',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('apple', 7),
        new Ingredient('banana', 3)
      ]),
    new Recipe(
      'A Test Recipe 2',
      'This is simply a test 2',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('bread', 10),
        new Ingredient('strawberries', 4)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeListUpdated.next(this.recipes.slice());
  }
  getRecipes() {
    /* data list array should always be private and have a
      corresponding getter and setter */
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  onRecipeToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.ingredients = ingredients;
    /* needs access to the private ShoppingListService.ingredients,
      only way is to call its setter
    */
    this.shoppingListService.addRecipeIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    // emit
    this.recipeListUpdated.next(this.recipes.slice());
    return this.recipes.length - 1;
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    // emit
    this.recipeListUpdated.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    // emit
    this.recipeListUpdated.next(this.recipes.slice());
  }
}