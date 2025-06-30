import { Routes } from '@angular/router';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { UserComponent } from './core/layouts/user/user.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { HomeComponent } from './features/home/component/home/home.component';
import { NotFoundComponent } from './core/auth/components/not-found/not-found.component';
import { ProductDetilesComponent } from './features/product/components/product-detiles/product-detiles.component';
import { authGuard } from './core/gards/auth.guard';
import { isLoggedGuard } from './core/gards/is-logged.guard';

export const routes: Routes = [
     {
          path: 'auth', component: AuthComponent, canActivate: [isLoggedGuard], children: [
               { path: 'login', component: LoginComponent },
               { path: 'register', component: RegisterComponent },
          ]
     },
     {
          path: 'user', component: UserComponent, canActivate: [authGuard], children: [
               { path: '', redirectTo: 'home', pathMatch: 'full' },

               { path: 'home', component: HomeComponent, },
               { path: 'category', loadComponent: () => import('./features/category/category/category.component').then(m => m.CategoryComponent) },
               { path: 'products', loadComponent: () => import('./features/product/components/product-list/product-list.component').then(m => m.ProductListComponent) },
               { path: 'brands', loadComponent: () => import('./features/prands/components/brand-list/brand-list.component').then(m => m.BrandListComponent) },
               { path: 'cart', loadComponent: () => import('./features/cart/component/cart-list/cart-list.component').then(m => m.CartListComponent) },
               { path: 'Product-Detiles/:id', component: ProductDetilesComponent }, // تعديل الاسم
               { path: 'checkout/:id', loadComponent: () => import('./features/orders/components/checkout/checkout.component').then(m => m.CheckoutComponent) },
          ]
     },
     { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
     { path: '**', component: NotFoundComponent }
];
