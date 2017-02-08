import { Version } from '@microsoft/sp-core-library';
import { Guid } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import 'reflect-metadata';
import 'zone.js';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { AppModule, App, BOOTSTRAP_COMPONENTS_TOKEN } from './app/app';



import * as strings from 'helloWorldStrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = '<my-app id="' + this.properties.description + '">loading 1...</my-app>';
    var selector = 'my-app#' + this.properties.description;
    var platform = platformBrowserDynamic([
      { provide: BOOTSTRAP_COMPONENTS_TOKEN, useValue: this.domElement.ownerDocument }
    ]);
    platform.bootstrapModule(AppModule);
  }
  protected onPropertyPaneConfigurationStart(): void {
    console.log('property pan  configuration start.. ');
  }

  protected get isRenderAsync(): boolean {
    return false;
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
