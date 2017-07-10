class HistoryItemController {
  public text: string;
  /** @ngInject */
  constructor() {
    this.text = 'My brand new component!';
  }
}

export const historyItem = {
  templateUrl: 'app/components/common/history/item/history.item.html',
  controller: HistoryItemController
};

