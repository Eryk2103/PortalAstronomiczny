import {NgModule} from '@angular/core'
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButton, MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu'
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
    imports: [
        MatCardModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatChipsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatMenuModule,
        MatSortModule,
        MatSelectModule,
        MatExpansionModule,
        MatListModule,
        MatRadioModule
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatChipsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatMenuModule,
        MatButtonModule,
        MatSortModule,
        MatSelectModule,
        MatExpansionModule,
        MatListModule,
        MatRadioModule
    ]
})
export class AngularMaterialModule {}