import './history.scss';
import {IUserService} from "../../../services/userService/user.service";
/**
 * @ngdoc object
 * @name HistoryBaseController
 */
export class HistoryBaseController {
  public list: any;
  public isResponsive: boolean;
  public showCount: number;
  public todayDateString: string;
  public startDateString: string;
  public endDateString: string;
  public filterSelected;
  public filterList;
  public showFilter;
  public isLoading: boolean;
  /** @ngInject */

  constructor(public $scope: ng.IScope,
              public $state: angular.ui.IStateService,
              public $filter: ng.IFilterService,
              public UserService: IUserService,
              public TemplatorService,
              public moment) {
      this.initDates();
  }
  /**
   * @ngdoc       method
   * @name        initDates
   * @methodOf    HistoryBaseController
   *
   * @description
   * Initiates the date objects for today, start and end.
   */
  initDates() {
    let today = new Date();
    let monthAgo = new Date(today.getTime() - 7 * 24 * 3600 * 1000);
    this.todayDateString = this.$filter('date')(today, 'dd.MM.yyyy');
    this.startDateString = this.$filter('date')(monthAgo, 'dd.MM.yyyy');
    this.endDateString = this.todayDateString;
  }
  /**
   * @ngdoc       method
   * @name        startLoading
   * @methodOf    HistoryBaseController
   *
   * @description
   * Start loading state method form IFormContainer interface
   */
  startLoading() {
    this.isLoading = true;
  }

  /**
   * @ngdoc       method
   * @name        startLoading
   * @methodOf    HistoryBaseController
   *
   * @description
   * Terminate loading state, IFormContainer interface
   */
  stopLoading() {
    this.isLoading = false;
  }
  /**
   * @ngdoc method
   * @name getMonthLabel
   * @methodOf HistoryBaseController
   *
   * @description
   * Returns month label by group dateKey
   * @param {string} dateKey
   * @return {string}
   */
  getMonthLabel(dateKey) {
    let dateObject = new this.moment(dateKey, 'MM.YY');
    return this.TemplatorService.getMonthLabel(dateObject.month());
  }
}


