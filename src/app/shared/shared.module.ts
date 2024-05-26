import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [ProgressBarModule, TabMenuModule, ToastModule],
    providers: [MessageService],
})
export class SharedModule {}
