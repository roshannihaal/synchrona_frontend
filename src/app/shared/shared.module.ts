import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
    declarations: [],
    imports: [CommonModule, ProgressBarModule],
    exports: [ProgressBarModule],
})
export class SharedModule {}
