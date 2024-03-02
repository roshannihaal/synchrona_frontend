import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClockRoutingModule } from './clock-routing.module';
import { HeaderComponent } from './header/header.component';
import { DisplayComponent } from './display/display.component';
import { CelestialLoaderComponent } from './celestial-loader/celestial-loader.component';

@NgModule({
    declarations: [HeaderComponent, DisplayComponent, CelestialLoaderComponent],
    imports: [CommonModule, ClockRoutingModule],
})
export class ClockModule {}
