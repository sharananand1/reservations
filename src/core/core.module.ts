import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterChangeService} from './services/router-change.service';
import {DigitOnlyDirective} from './directives/digit-only.directive';
import {LocalStorageService} from './services/local-storage.service';
import {SharedServiceService} from './services/shared-service.service';
@NgModule({
  declarations: [DigitOnlyDirective],
  imports: [
    CommonModule
  ],
  exports: [
    DigitOnlyDirective,
  ],
  providers: [
    RouterChangeService,
    LocalStorageService,
    SharedServiceService,
  ]
})
export class CoreModule {
}
