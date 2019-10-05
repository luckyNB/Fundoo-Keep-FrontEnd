import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { AddNoteComponent } from './component/add-note/add-note.component';
import { AuthenticationGuard } from "./service/AuthGuard";
import { NoteComponent } from "../app/component/note/note.component";
import { DialogBoxComponent } from "../app/component/dialog-box/dialog-box.component";
import { TrashNoteComponent } from "../app/component/trash-note/trash-note.component";
import { ArchiveNoteComponent } from "../app/component/archive-note/archive-note.component";
import { PinnedNoteComponent } from "../app/component/pinned-note/pinned-note.component";

import { LabelComponent } from "../app/component/label/label.component";

import { DialogLabelComponent } from "../app/component/dialog-label/dialog-label.component";
import { LabelDisplayComponent } from "../app/component/label-display/label-display.component";

import { ProfileDialogComponent } from "../../src/app/component/profile-dialog/profile-dialog.component";
import { DataService } from './service/data.service';
import { LabelofnoteComponent } from "../app/component/labelofnote/labelofnote.component";
import { CollabDialogComponent } from "../app/component/collab-dialog/collab-dialog.component";
import { SearchComponent } from "././component/search/search.component";
import { RemainderComponent } from "../app/component/remainder/remainder.component";
import { CollabnotesComponent } from "../app/component/collabnotes/collabnotes.component";
import { ImagedialogComponent } from './component/imagedialog/imagedialog.component';
import { ReminderofnoteComponent } from "./component/reminderofnote/reminderofnote.component";
const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'label',
    component: LabelComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },


  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent

  },
  {
    path: "resetpassword/:token",
    component: ResetpasswordComponent
  },

  {
    path: 'notes',
    component: NoteComponent
  },
  {
    path: 'addNotes',
    component: AddNoteComponent
  },



  {
    path: "dialogbox",
    component: DialogBoxComponent
  },

  {
    canActivate: [AuthenticationGuard],
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'addNotes',
        component: AddNoteComponent
      },
      {
        path: 'notes',
        component: NoteComponent
      },
      {
        path: "archived",
        component: ArchiveNoteComponent
      },
      {
        path: "pinned",
        component: PinnedNoteComponent
      },
      {
        path: "trashed",
        component: TrashNoteComponent
      },
      {
        path: 'label',
        component: LabelComponent
      },

      {
        path: 'dialoglabel',
        component: DialogLabelComponent
      },
      {
        path: 'label-display',
        component: LabelDisplayComponent
      },


      {
        path: 'profile',
        component: ProfileDialogComponent
      },


      {
        path: 'collabdialog',
        component: CollabDialogComponent
      },
      
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'reminderNote',
        component: RemainderComponent,
      }, 
      {
        path: 'collabNote',
        component: CollabnotesComponent,
      },
      {
        path: 'noteImage',
        component: ImagedialogComponent
      },
       
       {
        path:'remindernote',
        component:ReminderofnoteComponent
       },
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [DataService]
})
export class AppRoutingModule { }
