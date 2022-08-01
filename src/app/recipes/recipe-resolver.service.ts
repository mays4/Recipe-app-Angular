import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { DataStorageService } from "../shared/data-storge.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn:'root'
})
export class RecipeResolverService implements
Resolve<Recipe[]>{
  constructor(private dataStorgaService:DataStorageService,private recipeService:RecipeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipe()
    if(recipes.length === 0){

      return this.dataStorgaService.fetchRecipe();
    }else{
      return recipes;
    }
  }



}
