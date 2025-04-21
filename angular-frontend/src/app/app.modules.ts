import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {importProvidersFrom} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

// Angular Material Modules
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {routes} from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      BrowserAnimationsModule,
      FormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
    ),
  ],
}).catch(err => console.error(err));
