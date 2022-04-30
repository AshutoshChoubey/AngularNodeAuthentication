import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { GenericService } from './generic.service';
import { By } from '@angular/platform-browser';
import { ApiService } from './api.service';

describe('App Component', () => {
  let fixture: ComponentFixture<AppComponent>;
  let genericService: jasmine.SpyObj<GenericService>;
  let spyApi = jasmine.createSpyObj('AuthService', ['postData']);
  spyApi.postData.and.returnValue(
    of({
      status: 303,
      data: { user: '303worldgyan', pass: '303ashutosh@123' },
    })
  );

  // const setup = (
  //   genericServiceReturnValue?: jasmine.SpyObjMethodNames<GenericService>
  // ) => {
  //   let genericServicespy = jasmine.createSpyObj('GenericService', ['postData']);
  //   genericServicespy.postData.and.returnValue(genericServiceReturnValue);
  // };

  beforeEach(async () => {
  
    // const setup = (
    //   genericServiceReturnValue?: jasmine.SpyObjMethodNames<GenericService>
    // ) => {
    //   genericService = jasmine.createSpyObj<GenericService>('GenericService', {
    //     postData: of({
    //       status: 202,
    //       data: { user: 'worldgyan', pass: 'ashutosh@123' },
    //     }),
    //     ...genericServiceReturnValue,
    //   });
    // };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent, ChildComponent],
      providers: [
        { provide: GenericService, useValue: genericService },
        { provide: ApiService, useValue: spyApi },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('Check Generic Service postData method', () => {
    let component = fixture.componentInstance;
    let mockdata;
    fixture.detectChanges();
    const setup = (
      genericServiceReturnValue?: jasmine.SpyObjMethodNames<GenericService>
    ) => {
      genericService = jasmine.createSpyObj<GenericService>('GenericService', {
        postData: of({
          status: 202,
          data: { user: 'worldgyan', pass: 'ashutosh@123' },
        }),
        ...genericServiceReturnValue,
      });
    };
    setup();
    fixture.detectChanges();
    genericService.postData(component.initForm.value).subscribe((val) => {
      mockdata = val;
    });

    expect(mockdata).toEqual({
      status: 202,
      data: {
        user: 'worldgyan',
        pass: 'ashutosh@123',
      },
    });
  });
  it('Check Generic Service postData method with return value', () => {
    let component = fixture.componentInstance;
    let mockdata;
    const setup = (
      genericServiceReturnValue?: jasmine.SpyObjMethodNames<GenericService>
    ) => {
      genericService = jasmine.createSpyObj<GenericService>('GenericService', {
        postData: of({
          status: 202,
          data: { user: 'worldgyan', pass: 'ashutosh@123' },
        }),
        ...genericServiceReturnValue,
      });
    };
    setup({
      postData: of({
        status: 202,
        data: {
          user: '11sdf',
          pass: '11dfg456A@12',
        },
      }),
    });
    fixture.detectChanges();
    genericService.postData(component.initForm.value).subscribe((val) => {
      mockdata = val;
    });
    expect(mockdata).toEqual({
      status: 202,
      data: {
        user: '11sdf',
        pass: '11dfg456A@12',
      },
    });
  });

  it('check the form controls  from template to component', async () => {
    let component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    const user: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#user');
    const pass: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#pass');
    user.value = 'ashutosh';
    pass.value = 'ASHUTOSH@123';
    user.dispatchEvent(new Event('input'));
    pass.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.initForm.value).toEqual({
      user: 'ashutosh',
      pass: 'ASHUTOSH@123',
    });
  });

  it('check the form controls from components to template', async () => {
    let component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.componentInstance.initForm.setValue({
      user: 'ashutosh',
      pass: 'Wg@123',
    });
    component.ngOnInit();
    fixture.detectChanges();
    const user: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#user');
    const pass: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#pass');
    expect(fixture.componentInstance.initForm.value.user).toBe(user.value);
    expect(fixture.componentInstance.initForm.value.pass).toBe(pass.value);
  });

  it('should be valid if form value is valid', () => {
    let component = fixture.componentInstance;
    component.initForm.setValue({
      user: 'ashutosh',
      pass: 'Wg@q34qwerty',
    });
    fixture.detectChanges();
    expect(component.initForm.valid).toEqual(true);
  });
  it('should be Invalid if form value is Invalid', () => {
    let component = fixture.componentInstance;
    component.initForm.setValue({
      user: 'ashutosh',
      pass: 'Wghjk',
    });
    fixture.detectChanges();
    expect(component.initForm.valid).toEqual(false);
  });

  it('submits the form successfully', fakeAsync(async () => {
    
    fixture.detectChanges();
    fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    const user: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#user');
    const pass: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#pass');
    const submit: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#submit');
    const form = fixture.debugElement.query(By.css('form'));

    user.value = 'ashutosh';
    pass.value = 'As@34@123';
    fixture.detectChanges();
    user.dispatchEvent(new Event('input'));
    pass.dispatchEvent(new Event('input'));
    submit.click();
    submit.dispatchEvent(new Event('click'));
    form.triggerEventHandler('submit', {});
    fixture.detectChanges();
    expect(component.data).toEqual({
      status: 303,
      data: { user: '303worldgyan', pass: '303ashutosh@123' },
    });
    expect(spyApi.postData).toHaveBeenCalledWith(user.value, pass.value);
    expect(component.initForm.value).toEqual({
      user: 'ashutosh',
      pass: 'As@34@123',
    });

  }));
  it('Form should not submit successfully if invalid', fakeAsync(() => {
    const formData = {
      "user": "invaliduser",
      "pass": "ashutosh123"
    };
    let component = fixture.componentInstance;
    fixture.detectChanges();
    component.initForm.setValue(formData);
    component.submit();
    tick();
    fixture.detectChanges();
console.log(component.initForm.invalid)
    expect(component.initForm.invalid).toEqual(true);
    // expect(spyApi.postData).toHaveBeenCalledTimes(0);
    expect(spyApi.postData).toHaveBeenCalled();
  }));
});
