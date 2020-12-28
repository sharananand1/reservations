import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {SnotifyService} from 'ng-snotify';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  couponObj = {
    coupon_code: '',
    coupon_type: 'user',
    valid_from: '',
    valid_to: '',
    is_active: true,
    coupon_count: null,
    is_unlimited: true,
    tnc: '',
    rules: []
  };
  ruleBook = {
    minAmount: '',
    maxAmount: '',
    discountType: '',
    discount: '',
    maxDiscount: ''
  };
  minDate;
  constructor(private auth: LocalStorageService, private snotty: SnotifyService) {
  }

  ngOnInit(): void {
    $('html, body').animate(
      { scrollTop: '5' }, 200);
    const today = new Date();
    const day = today.getUTCDate() + 1;
    const month = today.getUTCMonth();
    const year = today.getUTCFullYear();
    this.minDate = new Date();
  }

  AddMoreRules(): void {
    if (this.ruleBook.minAmount) {
      if (this.ruleBook.maxAmount) {
        if (this.ruleBook.minAmount <= this.ruleBook.maxAmount) {
        if (this.ruleBook.discountType) {
          if (this.ruleBook.discount) {
              this.couponObj.rules.push({
                min_amount: this.ruleBook.minAmount,
                max_amount: this.ruleBook.maxAmount,
                discount_type: this.ruleBook.discountType,
                discount: this.ruleBook.discount,
                max_discount: this.ruleBook.maxDiscount
              });
              this.ruleBook.minAmount = '';
              this.ruleBook.maxAmount = '';
              this.ruleBook.discountType = '';
              this.ruleBook.discount = '';
              this.ruleBook.maxDiscount = '';
          } else {
            this.snotty.warning('Please enter Discount to add more');
          }
        } else {
          this.snotty.warning('Please select Discount Type to add more');
        }
      } else {
          this.snotty.warning('Min Amount should be lesser or equal than Max Amount');
        }
      } else {
        this.snotty.warning('Please enter Max Amount to add more');
      }
    } else {
      this.snotty.warning('Please enter Min Amount to add more');
    }
  }

  AddDiscountForm(): void {
    if (this.couponObj.valid_from && this.couponObj.valid_to) {
      if (this.couponObj.valid_from < this.couponObj.valid_to) {
      this.couponObj.valid_from = moment(this.couponObj.valid_from).format('yyyy-MM-DD');
      this.couponObj.valid_to = moment(this.couponObj.valid_to).format('yyyy-MM-DD');
      if (this.couponObj.rules[0]) {
        console.log(this.couponObj);
        this.auth.setValue('data', this.couponObj);
        this.auth.getValue('data', true);
        this.snotty.success('Congratulations, You have added discount successfully. (For more details or reference check console or local storage)');
        this.couponObj.coupon_code = '';
        this.couponObj.coupon_type = 'user';
        this.couponObj.valid_from = '';
        this.couponObj.valid_to = '';
        this.couponObj.is_active = true;
        this.couponObj.coupon_count = '';
        this.couponObj.is_unlimited = true;
        this.couponObj.tnc = '';
        this.couponObj.rules = [];
      } else {
        this.snotty.warning('Please add at-least one rule to continue');
      }
    } else {
        this.snotty.warning('Please select valid dates to continue (Valid From should the lesser than Valid To');
      }
    } else {
      this.snotty.warning('Please select dates to continue');
    }
  }

  delete(i): void {
    this.couponObj.rules.splice(i, 1);
  }
}