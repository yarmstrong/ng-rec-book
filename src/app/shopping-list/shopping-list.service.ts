import { Ingredient } from 'app/shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
  ingredientListUpdated = new Subject<Ingredient[]>();
  ingredientEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 20),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    /* data list array should always be private and have a
      corresponding getter and setter */
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientListUpdated.next(this.ingredients.slice());
  }

  addRecipeIngredients(ingredients: Ingredient[]) {
    /* long process: loop thru each to add to the existing array
      // for (let ingredient of ingredients) {
      //   this.addIngredient(ingredient);
      // }
    */
    this.ingredients.push(...ingredients);
    this.ingredientListUpdated.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientListUpdated.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientListUpdated.next(this.ingredients.slice());
  }
}