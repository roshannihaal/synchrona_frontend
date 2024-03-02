import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClockRoutingModule } from './clock-routing.module';
import { HeaderComponent } from './header/header.component';
import { DisplayComponent } from './display/display.component';
import { CelestialLoaderComponent } from './celestial-loader/celestial-loader.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HeaderComponent, DisplayComponent, CelestialLoaderComponent],
    imports: [CommonModule, ClockRoutingModule, SharedModule],
})
export class ClockModule {}
