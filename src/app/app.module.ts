import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { MaterialModule } from "./app.material.module";
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './component/login/login.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddNoteComponent } from './component/add-note/add-note.component';
import { NoteComponent } from './component/note/note.component';
import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';
import { AppIconComponent } from './component/app-icon/app-icon.component';
import { TrashNoteComponent } from './component/trash-note/trash-note.component';
import { ArchiveNoteComponent } from './component/archive-note/archive-note.component';
import { PinnedNoteComponent } from './component/pinned-note/pinned-note.component';

import { LabelComponent } from './component/label/label.component';

import { DialogLabelComponent } from './component/dialog-label/dialog-label.component';
import { LabelDisplayComponent } from './component/label-display/label-display.component';
import { ProfileDialogComponent } from './component/profile-dialog/profile-dialog.component';
import { CollabDialogComponent } from './component/collab-dialog/collab-dialog.component';
import { LabelofnoteComponent } from './component/labelofnote/labelofnote.component';
import { SearchComponent } from "../app/component/search/search.component";
import {RemainderComponent  } from "../app/component/remainder/remainder.component";
import { CollabnotesComponent } from "../app/component/collabnotes/collabnotes.component";
import {ImagedialogComponent  } from "../app/component/imagedialog/imagedialog.component";
import {ReminderofnoteComponent  } from "./component/reminderofnote/reminderofnote.component";
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,

    LoginComponent,

    ForgotpasswordComponent,

    ResetpasswordComponent,

    DashboardComponent,

    AddNoteComponent,

    NoteComponent,

    DialogBoxComponent,

    AppIconComponent,

    TrashNoteComponent,

    ArchiveNoteComponent,

    PinnedNoteComponent,

    ImagedialogComponent,

    LabelComponent,

    DialogLabelComponent,

    LabelDisplayComponent,

    ProfileDialogComponent,

    CollabDialogComponent,
    LabelofnoteComponent,
    SearchComponent,
    RemainderComponent,
    CollabnotesComponent,
    ReminderofnoteComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
