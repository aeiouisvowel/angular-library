import { Location } from '@angular/common';
import { NgModuleFactoryLoader } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BookService } from './shared/book/book.service';

describe('Router: App', () => {

  let location: Location;
  let router: Router;

  // Configure router testing module
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        CoreModule,
        UserModule,
        AdminModule,
        AppRoutingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent
      ],
      providers: [Location,
      BookService]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('navigate to "user" redirects to /user', fakeAsync(() => {
    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = { lazyModule: UserModule };
    const fixture = TestBed.createComponent(UserHomeComponent);
    router.resetConfig([
      { path: 'user', loadChildren: 'lazyModule' },
    ]);
    router.navigateByUrl('/user');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/user');
  }));

  it('navigate to "admin" redirects to /admin', fakeAsync(() => {
    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = { lazyModule: AdminModule };
    const fixture = TestBed.createComponent(AdminHomeComponent);
    router.resetConfig([
      { path: 'admin', loadChildren: 'lazyModule' },
    ]);
    router.navigateByUrl('/admin');
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/admin');
  }));

});
