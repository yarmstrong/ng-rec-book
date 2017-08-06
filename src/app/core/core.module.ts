import { NgModule } from '@angular/core';
import { HeaderComponent } from 'app/core/header/header.component';
import { HomeComponent } from 'app/core/home/home.component';
import { RoutingModule } from 'app/app-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { RecipeService } from 'app/recipes/recipe.service';
import { DataStorageService } from 'app/shared/data-storage.service';
import { AuthService } from 'app/auth/auth.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    RoutingModule
  ],
  exports: [
    HeaderComponent,
    RoutingModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService
  ]
})
export class CoreModule {}