import './rfilter.scss'
import {IShopServices} from "../../../../services/shopServices/shop.services";
class RestaurantsFilterController {
  public categories;
  public list;
  public selected;

  public scrollableItemWidth;
  public scrollableShiftWidth;
  public scrollableShowFilter: boolean;
  public scrollableShowLeft: boolean;
  public scrollableShowRight: boolean;
  public scrollableViewport;
  public scrollableItemsCount;
  public scrollableContainer;
  public scrollableShift;
  public isProductsLoading: boolean;

  /** @ngInject */
  constructor(
      public $scope,
      public ShopServices: IShopServices) {
    this.categories = [
        {
          id: 'view_all',
          name: 'All'
        },
      {
        id: 'burger',
        name: 'Burger'
      },
      {
        id: 'chicken',
        name: 'Chicken'
      },
      {
        id: 'curry',
        name: 'Curry'
      },
      {
        id: 'egg',
        name: 'Egg'
      },
      {
        id: 'kebab',
        name: 'Kebab'
      },
      {
        id: 'noodles',
        name: 'Noodles'
      },
      {
        id: 'pizza',
        name: 'Pizza'
      },
      {
        id: 'salmona',
        name: 'Salmona'
      },
      {
        id: 'shawarma',
        name: 'Shawarma'
      },
      {
        id: 'shrimp',
        name: 'Shrimp'
      },
      {
        id: 'steak',
        name: 'Steak'
      },
      {
        id: 'sushi',
        name: 'Sushi'
      },
      {
        id: 'taco',
        name: 'Taco'
      },
      {
        id: 'thai',
        name: 'Thai'
      }
    ];

    this.scrollableItemWidth = 150;
    this.scrollableShiftWidth = this.scrollableItemWidth * 2;
    this.scrollableShift = 0;
    $(window).ready(() => {
      this.$scope.$apply(() => {
        this.initScrollable();
      });
    });
    $(window).resize(() => {
      this.$scope.$apply(() => {
        this.initScrollable();
      });
    });
    this.selectItem(this.categories[0]);
  }
  /**
   * @ngdoc method
   * @name initScrollable
   * @methodOf RestaurantsFilterController
   *
   * @description
   * Initiates categories list from DOM. Resizes and shifts if it's neccessary;
   */
  initScrollable() {
    this.scrollableContainer = $('#scrollableContainer').eq(0);
    this.scrollableViewport = $('#scrollableViewport').eq(0);
    this.scrollableItemsCount = this.scrollableContainer.children().length;
    this.scrollableContainer.css('width', this.scrollableItemsCount * this.scrollableItemWidth + 'px');
    if(this.scrollableContainer.width() > this.scrollableViewport.width()){
      var maxShift = this.scrollableContainer.width() - (this.scrollableViewport.width() + this.scrollableShift);
      if (maxShift < 0) {
        this.scrollableShift += maxShift;
        this.updateList();
      }
    }else{
      this.scrollableViewport.css('width',this.scrollableContainer.width()+'px');
      this.scrollableShift = 0;
      this.updateList();
    }
    this.checkArrows();
  }
  /**
   * @ngdoc method
   * @name initScrollable
   * @methodOf RestaurantsFilterController
   *
   * @description
   * Determines scrolling arrows' states.
   * Hides arrow if scrolling is impossible
   */
  checkArrows() {
    var maxShiftRight = this.scrollableContainer.width() - (this.scrollableViewport.width() + this.scrollableShift);
    this.scrollableShowRight = maxShiftRight > 0;
    this.scrollableShowLeft = this.scrollableShift > 0;
  }
  /**
   * @ngdoc method
   * @name scrollRight
   * @methodOf ProductsFilterController
   *
   * @description
   * Scrolls categories list to the right
   *
   */
  scrollRight() {
    var maxShift = this.scrollableContainer.width() - (this.scrollableViewport.width() + this.scrollableShift);
    if (this.scrollableShiftWidth < maxShift) {
      this.scrollableShift += this.scrollableShiftWidth;
      this.updateList();
    } else if (this.scrollableShiftWidth >= maxShift) {
      this.scrollableShift += maxShift;
      this.updateList();
    }
    this.checkArrows();
  }

  /**
   * @ngdoc method
   * @name scrollLeft
   * @methodOf ProductsFilterController
   *
   * @description
   * Scrolls categories list to the left
   */
  scrollLeft() {
    var maxShift = this.scrollableShift;
    if (this.scrollableShiftWidth < maxShift) {
      this.scrollableShift -= this.scrollableShiftWidth;
      this.updateList();
    } else if (this.scrollableShiftWidth >= maxShift) {
      this.scrollableShift -= maxShift;
      this.updateList();
    }
    this.checkArrows();
  }

  /**
   * @ngdoc method
   * @name updateList
   * @methodOf RestaurantsFilterController
   *
   * @description
   * Updates the categories list position by current shifting value
   */
  updateList() {
    this.scrollableContainer.css('left', -1 * this.scrollableShift + 'px');
  }
  /**
   * @ngdoc method
   * @name selectItem
   * @methodOf ProductsFilterController
   *
   * @description
   * Selects the filter item
   */
  selectItem(selected) {
    this.isProductsLoading = true;
    this.categories.forEach((item) => {
      item.isActive = false;
    });
    selected.isActive = true;
    this.selected = selected;
    this.toggleCategories(false);
    this.filterProducts();
  }
  /**
   * @ngdoc method
   * @name toggleCategories
   * @methodOf RestaurantsFilterController
   *
   * @description
   * Show/Hide categories on authorized payments page

   * @param {boolean} value ShowCategories new value
   */
  toggleCategories(value) {
    this.scrollableShowFilter = value;
    this.handleScroll();
  }

  /**
   * @ngdoc method
   * @name enableScroll
   * @methodOf RestaurantsFilterController
   * @private
   *
   * @description
   * Disables scrolling of the window
   */
  private disableScroll() {
    $('body').addClass('no-scroll');
  }
  /**
   * @ngdoc method
   * @name enableScroll
   * @methodOf RestaurantsFilterController
   * @private
   *
   * @description
   * Enables scrolling of the window
   */
  private enableScroll() {
    $('body').removeClass('no-scroll');
  }
  /**
   * @ngdoc method
   * @name filterProducts
   * @methodOf RestaurantsFilterController
   *
   * @description
   * Filters products by selected category
   *
   */
  filterProducts() {
    let rlist = this.ShopServices.storeSortRestaurants();
    if (rlist) {
      if (this.selected && this.selected.id != 'view_all') {
        console.log('edit');
        this.ShopServices.restaurantsList = rlist.filter((item) => {
          console.log(item);
          return item.tags.contains(this.selected.id);
        })
      } else {
        this.ShopServices.restaurantsList = rlist.map((item) => {
          return item;
        })
      }
    }
    this.isProductsLoading = false;
  }
  /**
   * @ngdoc method
   * @name handleScroll
   * @methodOf RestaurantsFilterController
   * @private
   *
   * @description
   * Checks if scroll disable/enable required
   */
  private handleScroll() {
    if (this.isMobile() && this.scrollableShowFilter) {
      this.disableScroll();
    } else {
      this.enableScroll();
    }
  }
  /**
   * @ngdoc method
   * @name isMobile
   * @methodOf RestaurantsFilterController
   * @private
   *
   * @description
   * Checks if current view is mobile
   */
  private isMobile() {
    return document.documentElement.clientWidth < 768;
  }
  /**
   * @ngdoc method
   * @name categoryProductsCount
   * @methodOf RestaurantsFilterController
   * @private
   *
   * @description
   * get count of products for each category
   */
  categoryProductsCount(category) {
    this.list = this.list.filter((item) => {
      return item.cat_id == category.id;
    });
    return this.list.length;
  }
}

export const restaurantsFilter = {
  templateUrl: 'app/components/store/restaurants/filter/restaurants.filter.html',
  controller: RestaurantsFilterController,
  bindings: {
  }
};

