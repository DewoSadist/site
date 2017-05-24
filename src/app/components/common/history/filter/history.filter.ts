class HistoryFilterController {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}

export const historyFilter = {
  templateUrl:'app/components/common/history/filter/history.filter.html',
  controller: HistoryFilterController
};

