import './home.scss';
import { IShopService } from '../../services/shopService/shop.service';
/**
 * @ngdoc   object
 * @name    HomeController
 */
class HomeController {
  public list;
  public resolve;
  /** @ngInject */
  constructor (public $q: ng.IQService,
               public ShopService: IShopService,
               public appConfig) {
    let deferred = this.$q.defer();
    console.log('home');
  //   this.ShopService.getAllRestaurants()
  //     .then((list) => {
  //       console.log(list);
  //       this.list = list;
  //       deferred.resolve(list);
  //     })
  //     .catch((error) => {
  //       deferred.resolve(null);
  //     });
  }
}

export const home = {
  templateUrl: 'app/components/home/home.html',
  controller: HomeController
  /*Todo bindings: { list: '<', categories: '<',  others:'<'}*/
};

