import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../service/socket.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
})
export class DisplayComponent {
    currSocket: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private socketService: SocketService
    ) {}

    onChangeTab(id: string) {
        this.currSocket = id;

        this.disconnectFromSocket();
        this.connectToSocket();

        this.router.navigate([this.currSocket], { relativeTo: this.route });
    }

    connectToSocket() {
        this.socketService.connect(this.currSocket);
        this.socketService.listen(this.currSocket);
    }

    disconnectFromSocket() {
        this.socketService.disconnect();
    }
}
