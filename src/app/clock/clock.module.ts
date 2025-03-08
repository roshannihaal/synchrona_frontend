import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClockRoutingModule } from './clock-routing.module';
import { HeaderComponent } from './header/header.component';
import { DisplayComponent } from './display/display.component';
import { CelestialLoaderComponent } from './celestial-loader/celestial-loader.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [HeaderComponent, DisplayComponent, CelestialLoaderComponent, NotFoundComponent],
    imports: [CommonModule, ClockRoutingModule, SharedModule],
})
export class ClockModule {}
