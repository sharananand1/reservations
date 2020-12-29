import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.css']
})
export class CongratsComponent implements OnInit {
  discountData;

  constructor(private auth: LocalStorageService) {
  }

  ngOnInit(): void {
    this.discountData = this.auth.getValue('data', true);
  }

}
