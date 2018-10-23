import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private meta: Meta) {
        this.meta.addTag({ name: 'description', content: 'Scrap Whole Sale Dealer & Other Services...' });
        this.meta.addTag({ name: 'keywords', content: 'Electric Service, AC Service, Installation, Battery, Sale/Purchase, UPS, Repairing, CCTV, Installation, Motor Rewinding, Welding Senitary, Work Carpenter, Glass Aluminium, Carpet Washing, Scrap, WholeSale Dealer, Other Services' });
    }

    ngOnInit() {
    }
}
