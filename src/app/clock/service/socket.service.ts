import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private _socket: Socket;
    public clockData: BehaviorSubject<{ date: string; percentage: number }> = new BehaviorSubject<{
        date: string;
        percentage: number;
    }>({ date: '', percentage: 0 });

    connect(path: string) {
        const route = `${environment.BACKEND_URL}/${path}`;
        this._socket = io(route);
    }

    disconnect() {
        if (this._socket) {
            this._socket.disconnect();
            this.clockData.next({ date: '', percentage: 0 });
        }
    }

    listen(path: string) {
        const route = `${path}Sync`;
        this._socket.on(route, (data: { date: string; percentage: number }) => {
            this.clockData.next(data);
        });
    }
}
