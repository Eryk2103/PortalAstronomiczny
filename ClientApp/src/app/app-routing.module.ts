import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { PostsComponent } from './components/posts/posts.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import {PostCommentComponent} from './components/post-comment/post-comment.component';
import { AddPostCommentComponent } from './components/add-post-comment/add-post-comment.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ArticleComponent } from './components/article/article.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { AddSubCommentComponent } from './components/add-post-sub-comment/add-sub-comment.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';
import { AddEquipmentCommentComponent } from './components/add-equipment-comment/add-equipment-comment.component';
import { AddEquipmentSubCommentComponent } from './components/add-equipment-sub-comment/add-subcomment.component';
import { AddArticleSubCommentComponent } from './components/add-articel-sub-comment/add-article-sub-comment.component';
import { AddArticleCommentComponent } from './components/add-article-comment/add-article-comment.component';
import { ArticleCommentComponent } from './components/article-comment/article-comment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddCalendarComponent } from './components/add-calendar/add-calendar.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { AdminGuard } from 'src/api-authorization/admin.guard';
import { RedactorGuard } from 'src/api-authorization/redactor.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'posts', component: PostsComponent},
    { path: 'posts/:filter', component: PostsComponent},
    { path: 'post', component: PostEditComponent, canActivate: [AuthorizeGuard]},
    { path: 'post/:id', component: PostEditComponent, canActivate: [AuthorizeGuard]},
    { path: 'post/:id/comments', component: PostCommentComponent},
    { path: 'post/:id/detail', component: PostDetailComponent},
    { path: 'post/:id/AddComment', component: AddPostCommentComponent, canActivate: [AuthorizeGuard]},
    { path: 'post/:id/AddComment/:commentId', component: AddSubCommentComponent, canActivate: [AuthorizeGuard]},

    { path: 'equipment', component: EquipmentComponent},
    { path: 'equipment/:id/detail', component: EquipmentDetailComponent},
    { path: 'equipment/:id/comments', component: EquipmentDetailComponent},
    { path: 'equipment/:id/AddComment', component: AddEquipmentCommentComponent, canActivate: [AuthorizeGuard]},
    { path: 'equipment/:id/AddComment/:commentId', component: AddEquipmentSubCommentComponent, canActivate: [AuthorizeGuard]},
    { path: 'Addequipment', component: AddEquipmentComponent},

    { path: 'articles', component: ArticleComponent},
    { path: 'article', component: AddArticleComponent, canActivate: [AuthorizeGuard, RedactorGuard]},
    { path: 'article/:id', component: AddArticleComponent, canActivate: [AuthorizeGuard, RedactorGuard]},
    { path: 'article/:id/comments', component: ArticleCommentComponent},
    { path: 'article/:id/AddComment', component: AddArticleCommentComponent, canActivate: [AuthorizeGuard]},
    { path: 'article/:id/AddComment/:commentId', component: AddArticleSubCommentComponent, canActivate: [AuthorizeGuard]},

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizeGuard, AdminGuard]},
    { path: 'calendar', component: CalendarComponent},
    { path: 'calendar/AddCalendar', component: AddCalendarComponent, canActivate: [AuthorizeGuard, AdminGuard]},

    
   
  ];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}