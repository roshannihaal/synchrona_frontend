import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../service/socket.service';
import { ISocketEvent } from 'src/app/shared/interface/isocket-event';

@Component({
    selector: 'app-celestial-loader',
    templateUrl: './celestial-loader.component.html',
    styleUrls: ['./celestial-loader.component.scss'],
})
export class CelestialLoaderComponent implements OnInit, OnDestroy {
    percentage: number;

    constructor(private socketService: SocketService) {}

    ngOnInit() {
        this.socketService.clockData.subscribe((data: ISocketEvent) => {
            this.percentage = data.percentage;
        });
    }

    ngOnDestroy(): void {
        this.socketService.clockData.unsubscribe();
    }
}
