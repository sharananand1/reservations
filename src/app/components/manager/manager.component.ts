import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-congrats',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  discountData;
  allTable = [{
    id: 1,
    number: 2,
    check: 'available'
  }, {
    id: 2,
    number: 4,
    check: 'available'
  }, {
    id: 3,
    number: 6,
    check: 'available'
  }, {
    id: 4,
    number: 8,
    check: 'available'
  }, {
    id: 5,
    number: 2,
    check: 'available'
  }, {
    id: 6,
    number: 6,
    check: 'available'
  }, {
    id: 7,
    number: 8,
    check: 'available'
  }, {
    id: 8,
    number: 4,
    check: 'available'
  }, {
    id: 9,
    number: 2,
    check: 'available'
  }, {
    id: 10,
    number: 8,
    check: 'available'
  }, {
    id: 11,
    number: 6,
    check: 'available'
  }, {
    id: 12,
    number: 4,
    check: 'available'
  }];

  allBookedTables: any = [];
  thatIDFor4;
  thatIDFor2;
  thatIDFor6;
  thatIDFor8;
  getPax = '';
  getDate = '';
  filteredBookTable = [];
  bookedDate = [];

  constructor(private auth: LocalStorageService) {
  }

  ngOnInit(): any {
    this.getBookings('', '');
    /*for (let i = 0; i < this.allBookedTables.length; i++) {
      if (this.allBookedTables[i].pax == 4) {
        this.bookNow4();
      }
      if (this.allBookedTables[i].pax == 2) {
        this.bookNow2();
      }
    }*/


    /* for (let j = 0; j < this.allTable.length; j++) {
         if (this.allTable[j].number == 4 && this.allTable[j].check == 'available') {
           this.thatIDFor4 = this.allTable[j].id;
           if (this.allBookedTables[0]) {
             for (let i = 0; i < this.allBookedTables.length; i++) {
               if (this.allBookedTables[i].pax == 4 && this.allBookedTables[i].status === 1) {
                 if (this.allTable[j].id == this.thatIDFor4) {
                   this.allTable[j].check = 'reserved';
                 }
               }
             }
           }
         } else if (this.allTable[j].number == 2 && this.allTable[j].check == 'available') {
           this.thatIDFor2 = this.allTable[j].id;
           if (this.allBookedTables[0]) {
             for (let i = 0; i < this.allBookedTables.length; i++) {
               if (this.allBookedTables[i].pax == 2 && this.allBookedTables[i].status === 1) {
                 if (this.allTable[j].id == this.thatIDFor2) {
                   this.allTable[j].check = 'reserved';
                 }
               }
             }
           }
         }
     }
 for (let i = 0; i < this.allBookedTables.length; i++) {
   if (this.allBookedTables[i].pax == 4) {
     for (let j = 0; j < this.allTable.length; j++) {
       if (this.allTable[j].number == 4 && this.allTable[j].check == 'available') {
         console.log(this.allTable[j].id);
         this.allTable[j].check = 'reserved';
         return false;
       }
     }
   }
 }*/
    // this.discountData = this.auth.getValue('data', true);
  }

  getBookings(pax, date): void {
    this.allBookedTables = [];
    this.allBookedTables = this.auth.getValue('bookedTables', true);
    this.filteredBookTable = [];
    if (pax && date == '') {
      for (let i = 0; i < this.allBookedTables.length; i++) {
        if (pax && this.allBookedTables[i].pax == pax) {
          this.filteredBookTable.push(this.allBookedTables[i]);
        }
      }
    } else if (pax == '' && date) {
      const selectedDate = date;
      const selectedDay = selectedDate.getUTCDate() + 1;
      const selectedMonth = selectedDate.getUTCMonth() + 1;
      const selectedYear = selectedDate.getUTCFullYear();
      this.bookedDate = [];
      for (let i = 0; i < this.allBookedTables.length; i++) {
        this.bookedDate.push(new Date(this.allBookedTables[i].bookDate));
      }
      for (let i = 0; i < this.bookedDate.length; i++) {
        const bookDay = this.bookedDate[i].getUTCDate() + 1;
        const bookMonth = this.bookedDate[i].getUTCMonth() + 1;
        const bookYear = this.bookedDate[i].getUTCFullYear();
        if (date && (bookDay + '' + bookMonth + '' + bookYear == selectedDay + '' + selectedMonth + selectedYear)) {
          this.filteredBookTable.push(this.allBookedTables[i]);
        }
      }
    } else if (pax && date) {
      this.filteredBookTable = [];
      // for (let i = 0; i < this.allBookedTables.length; i++) {
      //   if (pax && this.allBookedTables[i].pax == pax) {
      //     this.filteredBookTable.push(this.allBookedTables[i]);
      //   }
      // }
      const selectedDate = date;
      const selectedDay = selectedDate.getUTCDate() + 1;
      const selectedMonth = selectedDate.getUTCMonth() + 1;
      const selectedYear = selectedDate.getUTCFullYear();
      this.bookedDate = [];
      for (let i = 0; i < this.allBookedTables.length; i++) {
        this.bookedDate.push(new Date(this.allBookedTables[i].bookDate));
      }
      for (let i = 0; i < this.bookedDate.length; i++) {
        const bookDay = this.bookedDate[i].getUTCDate() + 1;
        const bookMonth = this.bookedDate[i].getUTCMonth() + 1;
        const bookYear = this.bookedDate[i].getUTCFullYear();
        if (date && (bookDay + '' + bookMonth + '' + bookYear == selectedDay + '' + selectedMonth + selectedYear)) {
          for (let j = 0; j < this.allBookedTables.length; j++) {
              if (pax && this.allBookedTables[j].pax == pax) {
                this.filteredBookTable.push(this.allBookedTables[j]);
              }
            }
        }
      }
    }
    else if (pax == '' && date == '') {
      this.filteredBookTable = [];
      this.getPax = '';
      this.getDate = '';
      pax = '';
      date = '';
      for (let i = 0; i < this.allBookedTables.length; i++) {
        this.filteredBookTable.push(this.allBookedTables[i]);
      }
    }
  }

  cancelBooking(i): void {
    this.allBookedTables[i].status = 0;
    console.log(this.allBookedTables);
    this.auth.setValue('bookedTables', this.allBookedTables);
    this.getBookings('', '');
  }

  reset(): void {
    this.filteredBookTable = [];
    for (let i = 0; i < this.allBookedTables.length; i++) {
      this.filteredBookTable.push(this.allBookedTables[i]);
    }
  }

  /*bookNow4(): any {
    console.log('yes');
    for (let j = 0; j < this.allTable.length; j++) {
      if (this.allTable[j].number == 4 && this.allTable[j].check == 'available') {
        const id = this.allTable[j].id;
        console.log(id);
        if (this.allBookedTables.length){
        this.allTable[j].check = 'reserved';
        }
      }
    }
  }
  bookNow2(): void {
    console.log('yes');
    for (let j = 0; j < this.allTable.length; j++) {
      if (this.allTable[j].number == 2 && this.allTable[j].check == 'available') {
        const id = j;
        this.allTable[id].check = 'reserved';
      }
    }
  }*/

}
