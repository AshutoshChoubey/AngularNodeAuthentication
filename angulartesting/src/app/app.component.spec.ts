import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { GenericService } from './generic.service';

describe('ChildComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  // const fillForm = () => {
  //   fixture.debugElement.query(By.css(".user")).nativeElement.value ="quickBrownFox";
  //   fixture.debugElement.query(By.css(".pass")).nativeElement.value ="Wg@123";
  //   var event = new MouseEvent('change', { 
  //     'view': window, 
  //     'bubbles': true, 
  //     'cancelable': true 
  //   });
  //   fixture.debugElement.query(By.css("pass")).nativeElement.dispatchEvent(event);
  // };

  beforeEach(async () => {

    let fixture: ComponentFixture<AppComponent>;
  let genericService: jasmine.SpyObj<GenericService>;

  const setup = async (
    signupServiceReturnValues?: jasmine.SpyObjMethodNames<GenericService>
  ) => {
    genericService = jasmine.createSpyObj<GenericService>('GenericService', {
      // Successful responses per default
      postData: of({ status: 402, data: fixture.debugElement.componentInstance.initForm.value }),
      // Overwrite with given return values
      ...signupServiceReturnValues,
    });
  }
  // apiServiceSpy = jasmine.createSpyObj('ApiService', ['sendResetPasswordEmail']);
  // routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ChildComponent,AppComponent ],
      // schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: GenericService, useValue: genericService },{provide: FormBuilder},],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
   
   
    // fixture.componentInstance.initForm.setValue({
    //   user:"quickBrownFox",
    //   pass:"Wg@123"
    // })
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      // fixture.debugElement.query(By.css(".user")).nativeElement.value ="quickBrownFox";
      // fixture.debugElement.query(By.css(".pass")).nativeElement.value ="Wg@123";
      // var event = new Event('input');
      // fixture.debugElement.query(By.css(".user")).nativeElement.dispatchEvent(new Event('input'))
      // fixture.debugElement.query(By.css(".pass")).nativeElement.dispatchEvent(new Event('input'))

      // const input = fixture.debugElement.query(By.css('input'));
      // input.triggerEventHandler('input', { target: fixture.debugElement.query(By.css(".user")).nativeElement });
      // input.triggerEventHandler('input', { target: fixture.debugElement.query(By.css(".pass")).nativeElement });
      // const user:HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#user")
      // const pass:HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#pass")
      // user.value = 'ashutosh',
      // pass.value = 'ASHUTOSH@123',

      // user.dispatchEvent(new Event('input'));
      // pass.dispatchEvent(new Event('input'));

      // fixture.detectChanges();
    //   fixture.whenStable().then(() => {
    //     expect(component.initForm.value).toEqual({
    //       user: 'ashutosh',
    //       pass: 'ASHUTOSH@123'
    //     })
    //   })
    // });
    // fixture.detectChanges();
    
    // await setup();
    // await setup({
    //   // Let the API report a failure
    //   postData:of({ status: 500, data: fixture.debugElement.componentInstance.initForm.value }),
    // });
    // genericService.postData(fixture.debugElement.componentInstance.initForm.value).subscribe(console.log)
   // console.log("genericService",genericService.postData(fixture.debugElement.componentInstance.initForm.value));
  });
    });

  it('renders the app Child Component', () => {
    const fixture1 = TestBed.createComponent(AppComponent);
    console.log(fixture1.debugElement.query(By.css("app-child")))
    expect(fixture1.debugElement.query(By.css("app-child"))).toBeTruthy();
  });
  it('check the form controls inside a form group', async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.initForm.setValue({
      user:"quickBrownFox",
      pass:"Wg@123"
    })
    component.ngOnInit();
    fixture.detectChanges();
    const user:HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#user")
      const pass:HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#pass")
      const submit:HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#submit")
      const button = fixture.debugElement.nativeElement.querySelector("button")
       const form = fixture.debugElement.query(By.css('#submit'));
      user.value = 'ashutosh',
      pass.value = 'ASHUTOSH@123',
      // fixture.detectChanges();
      // form.triggerEventHandler('click', { target: fixture.debugElement.query(By.css("#submit")).nativeElement });
      
      console.log(user.value);
      // var event = new MouseEvent('submit', { 
      //   'view': window, 
      //   'bubbles': true, 
      //   'cancelable': true 
      // });
      // submit.dispatchEvent(event);
      // button.click()
      // button.dispatchEvent(new Event('click'));
      // form.triggerEventHandler('submit', {});
      // pass.dispatchEvent(event);
      user.dispatchEvent(new Event('input'));
      pass.dispatchEvent(new Event('input'));

      
     fixture.detectChanges();
      //fixture.whenStable().then(() => {
        console.log("fixture.debugElement.componentInstance.initForm.value",fixture.componentInstance.initForm.value)
        expect(component.initForm.value).toEqual({
          user: 'ashutosh',
          pass: 'ASHUTOSH@123'
        })
     // })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
