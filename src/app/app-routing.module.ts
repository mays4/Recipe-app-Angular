import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
const appRoutes: Routes=[
  {path:'',redirectTo:'/recipes',pathMatch:'full',
  },
  {path:'recipes',component: RecipesComponent,canActivate:[AuthGuard],
  children:[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent },
    {path:':id',component:RecipeDetailComponent ,resolve:[RecipeResolverService]},
    {path:':id/edit',component:RecipeEditComponent ,resolve:[RecipeResolverService] },



  ]},
  {path:'auth',component:AuthComponent },
  {path:'shopping-list',component: ShoppingListComponent},

]


@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
