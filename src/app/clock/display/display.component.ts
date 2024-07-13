import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../service/socket.service';
import { IMetaData } from 'src/app/shared/interface/imeta-data';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
    currSocket: string;
    viewers: number;
    joke: string;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private socketService: SocketService
    ) {}

    ngOnInit(): void {
        this.socketService.connectRoot();
        this.socketService.listenRoot();
        this.socketService.metaData.subscribe((data: IMetaData) => {
            this.viewers = data.viewers;
            if (data.joke) {
                this.joke = data.joke.replace(new RegExp('\\n', 'g'), '<br>');
            }
        });
    }

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
