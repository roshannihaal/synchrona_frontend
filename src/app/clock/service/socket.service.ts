import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
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
    });
    private timeZone: string;

    constructor() {
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    connectRoot() {
        const route = `${environment.BACKEND_URL}/`;
        this._root = io(route, {
            query: {
                timeZone: this.timeZone,
            },
        });
    }

    connect(path: string) {
        const route = `${environment.BACKEND_URL}/${path}`;
        this._socket = io(route);
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
        });
    }
}
