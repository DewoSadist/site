class HeaderController {
  public text: string;

  constructor(public $scope) {
    this.text = 'My brand new component!';
  }
}

export const header = {
  templateUrl: 'app/components/layout/header/header.html',
  controller: HeaderController
};

