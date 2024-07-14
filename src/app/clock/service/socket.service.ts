import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Manager, Socket } from 'socket.io-client';
import { GENERAL } from 'src/app/constants/general.constants';
import { IMetaData } from 'src/app/shared/interface/imeta-data';
import { ISocketEvent } from 'src/app/shared/interface/isocket-event';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private _socket: Socket;
    private _root: Socket;
    public clockData: BehaviorSubject<ISocketEvent> = new BehaviorSubject<ISocketEvent>({
        date: '',
        percentage: 0,
    });
    public metaData: BehaviorSubject<IMetaData> = new BehaviorSubject<IMetaData>({
        viewers: 0,
        joke: '',
    });
    private timeZone: string;
    private manager: Manager;

    constructor(private messageService: MessageService) {
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.manager = new Manager(environment.BACKEND_URL, {
            query: {
                timeZone: this.timeZone,
            },
        });
    }

    connectRoot() {
        const route = '/';
        this._root = this.manager.socket(route);
    }

    connect(path: string) {
        const route = `/${path}`;
        this._socket = this.manager.socket(route);
    }

    disconnect() {
        if (this._socket) {
            this._socket.disconnect();
        }
    }

    listen(path: string) {
        const route = `${path}Sync`;
        this._socket.on(route, (data: ISocketEvent) => {
            this.clockData.next(data);
        });
    }

    listenRoot() {
        this._root.on(GENERAL.META_SYNC, (data: IMetaData) => {
            this.metaData.next(data);
            if (data.status === GENERAL.SUCCESS) {
                this.successToast(data.message);
            }
            if (data.status === GENERAL.ERROR) {
                this.errorToast(data.message);
            }
        });
    }

    private successToast(message: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'SUCCESS',
            detail: message,
        });
    }

    private errorToast(message: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: message,
        });
    }
}
