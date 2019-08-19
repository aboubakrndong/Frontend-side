import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import {CreatezoneComponent} from "app/createzone/createzone.component";
import {EditzoneComponent} from "app/editzone/editzone.component";


const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: './admin/admin.module#FrontappliAdminModule'
        },

        {
        path: 'createzone',
          component: CreatezoneComponent
        },
        {
          path: 'editzone',
          component: EditzoneComponent
        },

        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class FrontappliAppRoutingModule {}
