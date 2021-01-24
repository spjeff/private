import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'BiomarinCssApplicationCustomizerStrings';

import * as CSS from 'csstype';
// from https://stackoverflow.com/questions/43783307/how-to-import-jquery-into-a-typescript-file
// from https://sharepoint.stackexchange.com/questions/194299/cannot-find-module-jquery
import * as $ from 'jquery';


const LOG_SOURCE: string = 'BiomarinCssApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IBiomarinCssApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BiomarinCssApplicationCustomizer
  extends BaseApplicationCustomizer<IBiomarinCssApplicationCustomizerProperties> {

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
            s.onload = BiomarinCSS;
            d.body.appendChild(s);
          }
        }
        l("//code.jquery.com/jquery-3.2.1.min.js", "jquery");
      })();

    return Promise.resolve();
  }
}

// Global format function
// from https://stackoverflow.com/questions/1212500/create-a-css-rule-class-with-jquery-at-runtime

function BiomarinCSS() {
  // Define CSS color pallete
  let css:CSSStyleSheet = (document as any).styleSheets[0];


  // Background tiles
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(3) div.CanvasSection:nth-child(1) { background-color: #27629C !important; }', 0);
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(3) div.CanvasSection:nth-child(2) { background-color: #7E76C5 !important; }', 0);

  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(4) div.CanvasSection:nth-child(1) { background-color: #F37F55 !important; }', 0);
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(4) div.CanvasSection:nth-child(2) { background-color: #A92A90 !important; }', 0);

  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(5) div.CanvasSection:nth-child(1) { background-color: #27629C !important; }', 0);
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(5) div.CanvasSection:nth-child(2) { background-color: #7E76C5 !important; }', 0);

  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(6) div.CanvasSection:nth-child(1) { background-color: #A92A90 !important; }', 0);
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(6) div.CanvasSection:nth-child(2) { background-color: #F37F55 !important; }', 0);


  // Headers
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(3) div.CanvasSection:nth-child(1) span.fontColorThemeDarkAlt {color : white !important;}', 0);

  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(4) div.CanvasSection:nth-child(1) span[role=heading] {color : white !important;}', 0);
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(4) div.CanvasSection:nth-child(2) span[role=heading] {color : white !important;}', 0);

  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(5) div.CanvasSection:nth-child(1) span[role=heading] {color : white !important;}', 0);
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(5) div.CanvasSection:nth-child(2) span[role=heading] {color : white !important;}', 0);

  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(6) div.CanvasSection:nth-child(1) span[role=heading] {color : white !important;}', 0);
  css.insertRule('div.Canvas div.CanvasZoneContainer:nth-child(6) div.CanvasSection:nth-child(2) span[role=heading] {color : white !important;}', 0);


  // Border tiles
  css.insertRule('div.CanvasSection { border:2px solid white !important;}', 0);
}
