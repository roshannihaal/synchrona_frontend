import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabMenuModule } from 'primeng/tabmenu';
@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [ProgressBarModule, TabMenuModule],
})
export class SharedModule {}
