/** @ngInject */
function clearErrors() {
    return {
        restrict: 'A',
        // todo: refactor this crap, so that directive takes an output method from controller, not blindsidedlr calling reserErrors() method
        link: (scope, element, attrs) => {
            element.bind('keydown', function (event) {
                if (scope.$ctrl) {
                    scope.$ctrl.resetErrors();
                } else if (scope.$parent.$ctrl) {
                    scope.$parent.$ctrl.resetErrors();
                } else if (scope.$parent.$parent.$ctrl) {
                    scope.$parent.$parent.$ctrl.resetErrors();
                }

                element.removeAttr('has-errors');
            });
        }

    };
}
export default clearErrors;

