class HistoryDetailsController {
  public text: string;
  /** @ngInject */
  constructor() {
    this.text = 'My brand new component!';
  }
}

export const historyDetails = {
  templateUrl: 'app/components/common/history/details/history.details.html',
  controller: HistoryDetailsController
};

