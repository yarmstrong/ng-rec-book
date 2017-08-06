import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIndex = null;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientEditing.subscribe(
      (index: number) => {
        this.editedIndex = index; // to preserve the index for the update method
        const ingredient = this.shoppingListService.getIngredient(this.editedIndex);
        this.ingredientForm.setValue({
          'ingredientName': ingredient.name,
          'ingredientAmount': ingredient.amount
        });
        this.editMode = true;
      }
    )
  }

  onSubmit() {
    // retrieve data
    const value = this.ingredientForm.value;
    const ingredient = new Ingredient(value.ingredientName, value.ingredientAmount);
    // should add here validation of data or disable the button (choosen button to disble)
    if (this.editMode) {
      // update
      this.shoppingListService.updateIngredient(this.editedIndex, ingredient);
    } else {
      // add
      this.shoppingListService.addIngredient(ingredient);
    }
    // just reset everything
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
    this.editedIndex = null;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}