import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from 'app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  editedIndex = null;
  editMode = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    /**
     * 2 route possibilities: /recipes/new or /recipes/#/edit
     * and is initialized everytime so no need to subscribe on the params
     * this is possibly being reloaded only during editing of recipe
     * because after the update we reload the same index id, 
     * but the reloads works fine so weird
     */
    this.editedIndex = +this.route.snapshot.params['id']; // number casting: if theres no id, this value will be NaN
    this.editMode = this.route.snapshot.params['id'] != null; // will not use casting so the checking will be with value or undefined (null)
    this.initForm();
  }

  initForm() {
    // let recipe data be empty at first
    let recipeName = '';
    let recipeUrl = '';
    let recipeDescr = '';
    let recipeIng = new FormArray([]);

    // if editMode then retrieve first the recipe info and save their value to show it in the form later
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.editedIndex);
      recipeName = recipe.name;
      recipeUrl = recipe.imagePath;
      recipeDescr = recipe.description;
      // initialize the ingredients FormArray already, whereas the others are only saved for now and will be later initialized
      if (recipe.ingredients) { // can use recipe['ingredients']
        for (let ing of recipe.ingredients) {
          recipeIng.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    // initialize the reactive form with either empty data or saved data
    // note that the recipeEng is already initialized and its validators etc are implemented already so we only need to save it
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescr, Validators.required),
      'imagePath': new FormControl(recipeUrl, Validators.required),
      'ingredients': recipeIng
    });
  }

  addIngredient() {
    const ingredientCtrl = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(ingredientCtrl);
  }

  deleteIngredient(ingIndex: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingIndex);
  }

  onSubmit() {
    const recipe = this.recipeForm.value;
    if (this.editMode) { // udpate
      this.recipeService.updateRecipe(this.editedIndex, recipe);
    } else { // add
      this.editedIndex = this.recipeService.addRecipe(recipe);
    }
    this.router.navigate(['recipes', this.editedIndex]); // route: recipes/oldid or recipes/newid
  }

  onCancel() { // available for both edit or new recipe
    this.router.navigate(['../'], { relativeTo: this.route }); // route: recipes/id/edit to recipes/id
  }

  onDelete() {  // available only when editing recipe
    this.recipeService.deleteRecipe(this.editedIndex);
    this.router.navigate(['recipes']); // route: recipes
  }

  onClear() { // available during new recipe only
    this.recipeForm.reset(); // stay on the route, user just cleared everything
  }

  /**
   * AoT error: Property 'controls' does not exist on type 'AbstractControl'.
   * in recipeForm.get('ingredients').controls, we need to cast the 
   * "recipeForm.get('ingredients')" part as a FormArray
   * like this: (<FormArray>this.recipeForm.get('ingredients')).push(ingredientCtrl);
   *
   * so from: *ngFor="let ingCtrl of recipeForm.get('ingredients').controls; let i = index"
   * to this: *ngFor="let ingCtrl of getRecipeFormProperty('ingredients').controls; let i = index"
   */
  getRecipeFormProperty(property: string) {
    return (<FormArray>this.recipeForm.get(property));
  }
}
