import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
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

    fullLabels: Record<string, string> = {
        minute: 'Minute',
        hour: 'Hour',
        day: 'Day',
        month: 'Month',
        year: 'Year',
    };

    shortLabels: Record<string, string> = {
        minute: 'Min',
        hour: 'Hr',
        day: 'D',
        month: 'Mo',
        year: 'Yr',
    };

    activeItem: IRefinedPair;

    prevWidth = 0;
    currWidth = 0;

    @Output() changeTabEvent: EventEmitter<string> = new EventEmitter();

    constructor(private router: Router) {}

    ngOnInit(): void {
        const key = this.router.url.split('/').at(-1);
        this.activeItem = this.items.find(item => item.value === key);
        this.setHeaders();
        if (this.activeItem) {
            this.onChangeActiveItem(this.activeItem, true);
        } else {
            this.changeTabEvent.emit(this.items[1].value);
        }
    }

    @HostListener('window:resize')
    detectResize() {
        this.currWidth = window.innerWidth;
        if (this.prevWidth < 425 !== this.currWidth < 425) {
            this.setHeaders();
        }
    }

    onChangeActiveItem(item: IRefinedPair, init = false) {
        if (!init && this.activeItem.value === item.value) return;
        this.activeItem = item;
        this.changeTabEvent.emit(item.value);
    }

    setHeaders() {
        this.currWidth = window.innerWidth;
        const labels = this.currWidth < 425 ? this.shortLabels : this.fullLabels;
        this.items = this.items.map(item => {
            item.label = labels[item.value];
            return item;
        });
        this.prevWidth = this.currWidth;
    }
}
