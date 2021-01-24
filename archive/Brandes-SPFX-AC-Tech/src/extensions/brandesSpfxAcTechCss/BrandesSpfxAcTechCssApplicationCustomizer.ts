import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'BrandesSpfxAcTechCssApplicationCustomizerStrings';

//  from https://stackoverflow.com/questions/43783307/how-to-import-jquery-into-a-typescript-file
import * as $ from 'jquery';

const LOG_SOURCE: string = 'BrandesSpfxAcTechCssApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IBrandesSpfxAcTechCssApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BrandesSpfxAcTechCssApplicationCustomizer
  extends BaseApplicationCustomizer<IBrandesSpfxAcTechCssApplicationCustomizerProperties> {

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
            s.onload = Brandes365TechCSS;
            d.body.appendChild(s);
          }
        }
        l("//code.jquery.com/jquery-3.2.1.min.js", "jquery");
      })();

    return Promise.resolve();
  }
}

// Global format function
function Brandes365TechCSS() {
  // JQuery ready
  $(document).ready(function () {
    // Define CSS
    // var css = '.ms-HubNav {background-color: rgb(21, 71, 52) !important;} \r\n.ms-HubNav-link {color:white !important;font-weight: 700 !important;} \r\n.ms-HubNav .ms-HorizontalNav .ms-HorizontalNavItem-link.is-not-selected, .ms-HubNav .ms-HorizontalNav .ms-HorizontalNavItem-link.is-header {cursor: pointer !important;} \r\n.ms-HorizontalNavItem-link.is-not-selected, .ms-HorizontalNavItem-link.is-header {color: white !important;font-weight: 600 !important;} \r\n.ms-HubNav{line-height: 15px !important;} \r\n.ms-Menu-item {line-height: 24px !important;} \r\n.ms-Menu-section a {color: white !important;} \r\n.ms-MegaMenu-gridLayout.withDivider {background-color: rgb(21, 71, 52) !important;} \r\n.ms-HubNav .ms-HorizontalNav .ms-ContextualMenu-itemText {color: white !important;} \r\n.ms-Menu-item .ms-Nav-link {-webkit-text-decoration-color: white !important;text-decoration-color: white !important;} \r\n.ms-Menu-item:hover .ms-Nav-link:hover {text-decoration: underline !important;}';
    // var css = '.ms-HubNav {background-color: rgb(21, 71, 52) !important;} \r\n.ms-HubNav-link {color:white !important;font-weight: 700 !important;} \r\n.ms-HubNav .ms-HorizontalNav .ms-HorizontalNavItem-link.is-not-selected, .ms-HubNav .ms-HorizontalNav .ms-HorizontalNavItem-link.is-header {cursor: pointer !important;} \r\ndiv.ms-HubNav .ms-HorizontalNavItem-link.is-not-selected,div.ms-HubNav .ms-HorizontalNavItem-link.is-header {color: white !important;font-weight: 600 !important;} \r\n.ms-HubNav{line-height: 15px !important;} \r\n.ms-Menu-item {line-height: 24px !important;} \r\n.ms-Menu-section a {color: white !important;} \r\n.ms-MegaMenu-gridLayout.withDivider {background-color: rgb(21, 71, 52) !important;} \r\n.ms-HubNav .ms-HorizontalNav .ms-ContextualMenu-itemText {color: white !important;} \r\n.ms-Menu-item .ms-Nav-link {-webkit-text-decoration-color: white !important;text-decoration-color: white !important;} \r\n.ms-Menu-item:hover .ms-Nav-link:hover {text-decoration: underline !important;}';
    // var css = '.ms-HubNav {background-color: rgb(21, 71, 52) !important;} \r\n.ms-HubNav-link {color:white !important;font-weight: 700 !important;} \r\n.ms-HubNav .ms-HorizontalNav .ms-HorizontalNavItem-link.is-not-selected, .ms-HubNav .ms-HorizontalNav .ms-HorizontalNavItem-link.is-header {cursor: pointer !important;} \r\ndiv.ms-HubNav .ms-HorizontalNavItem-link.is-not-selected,div.ms-HubNav .ms-HorizontalNavItem-link.is-header {color: white !important;font-weight: 600 !important;} \r\n.ms-HubNav{line-height: 15px !important;} \r\n.ms-Menu-item {line-height: 24px !important;} \r\n.ms-Menu-section a {color: white !important;} \r\n.ms-MegaMenu-gridLayout.withDivider {background-color: rgb(21, 71, 52) !important;} \r\n.ms-HubNav .ms-HorizontalNav .ms-ContextualMenu-itemText {color: white !important;} \r\n.ms-Menu-item .ms-Nav-link {-webkit-text-decoration-color: white !important;text-decoration-color: white !important;} \r\n.ms-Menu-item:hover .ms-Nav-link:hover {text-decoration: underline !important;}; .ms-MegaMenu-Callout .ms-MegaMenu-gridLayoutItem .ms-FocusZone ul.ms-Menu-section {margin: 15px 15px 10px 15px !important;}; .ms-Menu-section {margin: 15px 15px 10px 15px !important;};';

    // Header CSS
    var css = '.ms-HubNav {background-color: rgb(21, 71, 52) !important;} \r\n.ms-HubNav-link {color:white !important;font-weight: 700 !important;} \r\n.ms-HubNav .ms-HorizontalNav .ms-HorizontalNavItem-link.is-not-selected, .ms-HubNav .ms-HorizontalNav .ms-HorizontalNavItem-link.is-header {cursor: pointer !important;} \r\ndiv.ms-HubNav .ms-HorizontalNavItem-link.is-not-selected,div.ms-HubNav .ms-HorizontalNavItem-link.is-header {color: white !important;font-weight: 600 !important;} \r\n.ms-HubNav{line-height: 15px !important;} \r\n.ms-Menu-item {line-height: 24px !important;} \r\n.ms-Menu-section a {color: white !important;} \r\n.ms-MegaMenu-gridLayout.withDivider {background-color: rgb(21, 71, 52) !important;} \r\n.ms-HubNav .ms-HorizontalNav .ms-ContextualMenu-itemText {color: white !important;} \r\n.ms-Menu-item .ms-Nav-link {-webkit-text-decoration-color: white !important;text-decoration-color: white !important;} \r\n.ms-Menu-item:hover .ms-Nav-link:hover {text-decoration: underline !important;}; .ms-MegaMenu-Callout .ms-MegaMenu-gridLayoutItem .ms-FocusZone ul.ms-Menu-section {margin: 15px 15px 10px 15px !important;}; .ms-Menu-section {margin: 15px !important;}; .section-263 {margin: 15px !important;};';
    $('head').append('<style type="text/css">' + css + '</style>');

    // Header CSS
    var css = '.ms-Menu-section .section-218 {margin: 15px !important;};';
    $('head').append('<style type="text/css">' + css + '</style>');
  });
}
