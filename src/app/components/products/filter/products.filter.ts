import './products.filter.scss';
class ProductsFilterController {
  public restaurant;
  public categories;
  public productsList;
  public selected;
  public products;
  public productsCount;
  public text: string;

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
  constructor(public $scope, public $location, public $anchorScroll, public $element) {
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

    angular.element(window).bind("scroll", function() {
      // console.log('this=',angular.element);
      // window.getSelection()
    });

    this.text = 'My brand new component!';
    this.selectItem(this.categories[0]);
  }
  /**
   * @ngdoc method
   * @name initScrollable
   * @methodOf ProductsFilterController
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
   * @methodOf ProductsFilterController
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
   * @methodOf ProductsFilterController
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
    // $('#cat'+selected.id).scrollTop();
    // window.scrollTo(0, $('#cat'+selected.id).offsetTop - 100);
    this.$location.hash(selected.id);
    this.$anchorScroll();
    let hash = location.hash.match(/#(\w+)/)[1];
    console.log(hash);


    this.toggleCategories(false);
    this.filterProducts();
  }
  /**
   * @ngdoc method
   * @name toggleCategories
   * @methodOf ProductsFilterController
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
   * @methodOf ProductsFilterController
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
   * @methodOf ProductsFilterController
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
   * @methodOf ProductsListController
   *
   * @description
   * Filters products by selected category
   *
   */
  filterProducts() {
    if (this.productsList) {
      // if (this.selected && this.selected.id != 'all') {
      //   this.products = this.productsList.filter((item) => {
      //     return item.cat_id == this.selected.id;
      //   });
      // } else {
        this.products = this.productsList.map((item) => {
          return item;
        });
      // }
    }
    this.isProductsLoading = false;
  }
  /**
   * @ngdoc method
   * @name handleScroll
   * @methodOf ProductsFilterController
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
   * @methodOf ProductsFilterController
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
   * @methodOf ProductsFilterController
   * @private
   *
   * @description
   * get count of products for each category
   */
  categoryProductsCount(category) {
    this.productsCount = this.productsList.filter((item) => {
      return item.cat_id == category.id;
    });
    return this.productsCount.length;
  }
}

export const productsFilter = {
  templateUrl: 'app/components/products/filter/products.filter.html',
  controller: ProductsFilterController,
  bindings: {
    categories: '<',
    productsList: '<',
    restaurant: '<'
  }
};

