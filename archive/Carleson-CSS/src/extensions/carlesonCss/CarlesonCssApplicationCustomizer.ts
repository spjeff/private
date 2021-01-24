import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'CarlesonCssApplicationCustomizerStrings';

// from https://stackoverflow.com/questions/43783307/how-to-import-jquery-into-a-typescript-file
// from https://sharepoint.stackexchange.com/questions/194299/cannot-find-module-jquery
import * as $ from 'jquery';

const LOG_SOURCE: string = 'CarlesonCssApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICarlesonCssApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CarlesonCssApplicationCustomizer
  extends BaseApplicationCustomizer<ICarlesonCssApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {

      // Single page only
      // Inject JQuery
      (function() {
        function l(u, i) {
          var d = document;
          if (!d.getElementById(i)) {
            var s = d.createElement("script");
            s.src = u;
            s.id = i;
            s.onload = CarlesonCSS;
            d.body.appendChild(s);
          }
        }
        l("//code.jquery.com/jquery-3.2.1.min.js", "jquery");
      })();

    return Promise.resolve();
  }
}

// Global format function
function CarlesonCSS() {
  // Define CSS
  var css = '.carleson {background-color:fuchsia}';

  // Header CSS
  $('head').append('<style type="text/css>' + css + '</style>');
}
