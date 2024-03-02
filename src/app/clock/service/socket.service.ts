import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ISocketEvent } from 'src/app/shared/interface/isocket-event';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private _socket: Socket;
    public clockData: BehaviorSubject<ISocketEvent> = new BehaviorSubject<ISocketEvent>({
        date: '',
        percentage: 0,
    });

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
}
