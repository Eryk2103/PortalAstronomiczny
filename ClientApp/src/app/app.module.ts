import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {ReactiveFormsModule} from '@angular/forms'
import {PostEditComponent} from './components/post-edit/post-edit.component'
import { UploadComponent } from './components/upload/upload.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { AddPostCommentComponent } from './components/add-post-comment/add-post-comment.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { ArticleComponent } from './components/article/article.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { AddSubCommentComponent } from './components/add-post-sub-comment/add-sub-comment.component';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './services/userService.service';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';
import { AddEquipmentSubCommentComponent } from './components/add-equipment-sub-comment/add-subcomment.component';
import { AddEquipmentCommentComponent } from './components/add-equipment-comment/add-equipment-comment.component';
import { ArticleCommentComponent } from './components/article-comment/article-comment.component';
import { AddArticleCommentComponent } from './components/add-article-comment/add-article-comment.component';
import { AddArticleSubCommentComponent } from './components/add-articel-sub-comment/add-article-sub-comment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddCalendarComponent } from './components/add-calendar/add-calendar.component';
import { MessageComponent } from './components/message/message.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { AddMessageComponent } from './components/add-message/add-message.component';
import { ArticleService } from './services/articleService.service';
import { EquipmentService } from './services/equipmentService.service';
import { Delete } from './components/delete/delete.component';
import { EquipmentSelectComponent } from './components/equipment-select/equipment-select.component';
import { PostFilterComponent } from './components/post-filter/post-filter.component';
import { StateService } from './services/stateService.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService } from './services/categoryService';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EquipmentFilterComponent } from './components/equipment-filter/equipment-filter.component';
import { TimePastPipe } from './pipes/date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PostsComponent,
    PostEditComponent,
    UploadComponent,
    PostCommentComponent,
    AddPostCommentComponent,
    EquipmentComponent,
    PostDetailComponent,
    AddEquipmentComponent,
    ArticleComponent,
    AddArticleComponent,
    AddSubCommentComponent,
    HeaderComponent,
    EquipmentDetailComponent,
    AddEquipmentSubCommentComponent,
    AddEquipmentCommentComponent,
    ArticleCommentComponent,
    AddArticleCommentComponent,
    AddArticleSubCommentComponent,
    DashboardComponent,
    CalendarComponent,
    AddCalendarComponent,
    MessageComponent,
    MessageDialogComponent,
    AddMessageComponent,
    Delete,
    EquipmentSelectComponent,
    PostFilterComponent,
    CategoryComponent,
    AddCategoryComponent,
    EquipmentFilterComponent,
    TimePastPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }, UserService,ArticleService, EquipmentService, StateService, CategoryService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MessageDialogComponent]
})
export class AppModule { }
