import './status.scss';
import {IFormContainer, IShopServices} from "../../../../services/shopServices/shop.services";
import ErrorService from "../../../../services/errorService/error.service";
import {ICartServices} from "../../../../services/cartServices/cart.services";

/**
 * @ngdoc   object
 * @name    ProductsInfoController
 */
class modalStatusController implements IFormContainer {

    /**
     * @ngdoc       property
     * @name        ProductsInfoController#errors
     * @propertyOf  ProductsInfoController
     * @returns     {ICard}    Errors object bound to errors on UI, from IFormContainer
     */
    public errors;
    /**
     * @ngdoc       property
     * @name        ProductsInfoController#isLoading
     * @propertyOf  ProductsInfoController
     * @returns     {boolean}    Loading indicator, from IFormContainer interface
     */
    public isLoading: boolean;

    public text: string;

    public close;

    public orderStatuses;

    public order_time;

    public week;

    public time;

    public current_date;


    /** @ngInject */
    constructor(public $scope,
                public ShopServices: IShopServices,
                public CartServices: ICartServices,
                public ErrorService: ErrorService,
                public moment) {
        this.current_date = moment();
        this.orderStatuses = [];
        this.week = [
            {label: moment().format('ddd DD'), value: moment().format(),choose:true},
            {label: moment().add(1, 'days').format('ddd DD'), value: moment().add(1, 'days').format(),choose:false},
            {label: moment().add(2, 'days').format('ddd DD'), value: moment().add(2, 'days').format(),choose:false},
            {label: moment().add(3, 'days').format('ddd DD'), value: moment().add(3, 'days').format(),choose:false},
            {label: moment().add(4, 'days').format('ddd DD'), value: moment().add(4, 'days').format(),choose:false},
            // {label: moment().add(5, 'days').format('ddd MMM Do'), value: moment().add(5, 'days').format(),choose:false},
            // {label: moment().add(6, 'days').format('ddd MMM Do'), value: moment().add(6, 'days').format(),choose:false}
        ];
        if(this.ShopServices.getOrderStatusWeb().value.length > 0){
            let day  = moment(this.ShopServices.getOrderStatusWeb().value).format('ddd DD');

            this.week.forEach((item)=>{
                item.choose = false;
                console.log(item.label, day);
            if(item.label === day) {
                item.choose = true;
            }
            });
            this.initTimes('week', this.ShopServices.getOrderStatusWeb().value);
        } else {
            this.initTimes('today', this.current_date);
        }

        console.log(this.week);


    }

    /**
     * @ngdoc method
     * @name closeModal
     * @methodOf modalStatusController
     *
     * @description
     * clode modal dialog
     */
    closeModal() {
        this.close();
    }

    /**
     * @ngdoc method
     * @name resetErrors
     * @methodOf modalStatusController
     *
     * @description
     * resets the errors object method from IFormContainer interface
     */
    resetErrors() {
        this.$scope.$apply(() => {
            this.errors = {};
        })
    }

    /**
     * @ngdoc method
     * @name hasNoErrors
     * @methodOf modalStatusController
     *
     * @description
     * Return true if no errors present in Form, IFormContainer interface
     *
     * @return {boolean} Return true if no errors present in Form
     */
    hasNoErrors(): boolean {
        return Object.keys(this.errors).length === 0;
    }

    /**
     * @ngdoc method
     * @name startLoading
     * @methodOf modalStatusController
     *
     * @description
     * Start loading data state method from IFormContainer interface
     */
    startLoading() {
        this.isLoading = true;
    }

    /**
     * @ngdoc method
     * @name stopLoading
     * @methodOf modalStatusController
     *
     * @description
     * Terminate loading state, IFormContainer interface
     */
    stopLoading() {
        this.isLoading = false;
    }

    /**
     * @ngdoc method
     * @name updateTime
     * @methodOf modalStatusController
     *
     * @description
     * Update order time for
     */
    updateTime(index) {
        this.orderStatuses.forEach((item) => {
            item.choose = false;
        });
        this.orderStatuses[index].choose = true;
        this.order_time = this.orderStatuses[index].value;
        console.log(this.order_time);
        if(this.order_time === 'asap'){
            this.ShopServices.setOrderStatusWeb('asap');

        } else {
            this.ShopServices.setOrderStatusWeb(this.moment(this.order_time).format())

        }
        this.ShopServices.sortRestaurants();
        this.closeModal();


    }

    initTimes(when, dateTime){
        let selectedOrderTime = this.ShopServices.getOrderStatusWeb();
        this.orderStatuses = [];
        if(when === 'today') {
            if(selectedOrderTime.name === 'asap') {
                this.orderStatuses.push({label:'As Soon As Possible', value:'asap', choose:true});
            } else {
                this.orderStatuses.push({label:'As Soon As Possible', value:'asap', choose:false});
            }

            this.current_date.add(30,'minutes').format('YYYY-MM-DD');

            let time = this.moment(this.getStartTime(this.current_date, this.current_date.format('YYYY-MM-DD')));


            if(time.format("H")> 8){
                do {
                    let time1 = this.moment(time).format('hh:mm A');
                    let time2 = this.moment(time).add(15, 'minutes').format('hh:mm A');
                    let item;
                    if(selectedOrderTime.name === 'preorder' && selectedOrderTime.value === this.moment(time).format()) {
                        item = { label: time1 + '-' + time2, value: this.moment(time).format(), choose: true };
                    } else {
                        item = { label: time1 + '-' + time2, value: this.moment(time).format(), choose: false };
                    }

                    this.orderStatuses.push(item);
                    time = time.add(15, 'minutes');
                }  while(time.format("H")/1 < 23)
            }

        } else {

        let day = this.moment(dateTime).format('YYYY-MM-DD');
        let time = this.moment(day+'T09:00:00');

            if(time.format("H")> 8){

                do {
                    let time1 = time.format('hh:mm A');
                    let time3 = time.format();
                    let time2 = time.add(15, 'minutes').format('hh:mm A');

                    let item;
                    if(selectedOrderTime.name === 'preorder' && selectedOrderTime.value === time3) {
                        item = { label: time1 + '-' + time2, value: time3, choose: true };
                    } else {
                        item = { label: time1 + '-' + time2, value: time3, choose: false };
                    }
                    this.orderStatuses.push(item);

                    time = time.add(15, 'minutes');
                }  while(time.format("H")/1 < 23)
            }
        }


    }
    getTimes(time){
        this.week.forEach((item)=>{
            item.choose= false;
            if(item.value === time){
                item.choose = true;
            }
        });
        if(this.current_date.format('DD')=== this.moment(time).format('DD')){
            this.initTimes('today', time);
        } else {
            this.initTimes('week', time);
        }

    }

    getStartTime(start, date){
      let mmStart = start.format("mm");
      let hhStart = start.format("H");
      let hh, mm;

      if(mmStart > 0 && mmStart <= 15) {
          mm = 15;
          hh = hhStart;
      } else if(mmStart > 15 && mmStart <= 30) {
          mm = 30;
          hh = hhStart;
      } else if(mmStart > 30 && mmStart <= 45) {
          mm = 45;
          hh= hhStart;
      } else if(mmStart > 45 && mmStart <= 59) {
          mm = '00';
          hh = hhStart/1 + 1;
      } else {
          mm = '00';
          hh = hhStart/1 + 1;
      }

      console.log('T'+hh+':'+mm+':00');

      return date + 'T'+hh+':'+mm+':00';
    }

}

export const
    modalOrderStatus = {
        templateUrl: 'app/components/common/modal/status/order.status.html',
        controller: modalStatusController,
        bindings: {
            resolve: '<',
            close: '&'
        }
    };

