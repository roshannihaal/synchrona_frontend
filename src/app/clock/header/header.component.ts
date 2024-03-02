import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IRefinedPair } from 'src/app/shared/interface/irefined-pair';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    items: IRefinedPair[] = [
        {
            label: 'Minute',
            value: 'minute',
        },
        {
            label: 'Hour',
            value: 'hour',
        },
        {
            label: 'Day',
            value: 'day',
        },
        {
            label: 'Month',
            value: 'month',
        },
        {
            label: 'Year',
            value: 'year',
        },
    ];

    activeItem: IRefinedPair;

    @Output() changeTabEvent: EventEmitter<string> = new EventEmitter();

    constructor(private router: Router) {}

    ngOnInit(): void {
        const key = this.router.url.split('/').at(-1);
        this.activeItem = this.items.find(item => item.value === key);
        if (this.activeItem) {
            this.onChangeActiveItem(this.activeItem, true);
        }
    }
    onChangeActiveItem(item: IRefinedPair, init = false) {
        if (!init && this.activeItem.value === item.value) return;
        this.activeItem = item;
        this.changeTabEvent.emit(item.value);
    }
}
