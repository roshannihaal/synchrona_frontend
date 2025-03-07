import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { CelestialLoaderComponent } from './celestial-loader/celestial-loader.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: DisplayComponent,
        children: [
            {
                path: '',
                redirectTo: 'hour',
                pathMatch: 'full',
            },
            {
                path: ':id',
                component: CelestialLoaderComponent,
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClockRoutingModule {}
