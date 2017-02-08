//our root app component
import { Component, NgModule, Inject, OpaqueToken } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, Type } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
    </div>
  `,
})
export class App {
  name: string;
  constructor() {
    this.name = 'Angular2'
  }
}

export const BOOTSTRAP_COMPONENTS_TOKEN = new OpaqueToken('bootstrap_components');

@NgModule({
  imports: [BrowserModule],
  declarations: [App],
  entryComponents: [App]
})
export class AppModule {
  constructor(
    @Inject(BOOTSTRAP_COMPONENTS_TOKEN) private document
  ) { }

  ngDoBootstrap(appRef: ApplicationRef) {

    this.document.querySelectorAll('my-app').forEach(element => {
      var resolver: ComponentFactoryResolver = appRef['_componentFactoryResolver'];
      const factory = resolver.resolveComponentFactory(App);
      factory.selector = "my-app#"+element.id;
      appRef.bootstrap(factory);
    });


  }
}


