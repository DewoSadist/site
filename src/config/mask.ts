/// <reference path="../../typings/index.d.ts" />

export default maskConfig;

/** @ngInject */
function maskConfig(uiMaskConfigProvider: any) {
	uiMaskConfigProvider.allowInvalidValue = false;
	uiMaskConfigProvider.clearOnBlur = false;
	uiMaskConfigProvider.clearOnBlurPlaceholder = false;
    // var isAndroid = /(android)/i.test(navigator.userAgent);
    // if (isAndroid) {
    //     var index = uiMaskConfigProvider.eventsToHandle.indexOf('input');
    //     uiMaskConfigProvider.eventsToHandle.splice(index, 1);
    // }
}
