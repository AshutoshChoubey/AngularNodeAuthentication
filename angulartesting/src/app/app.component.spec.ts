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
import { Component } from '@angular/core';

describe('App Component', () => {
  let fixture: ComponentFixture<AppComponent>;
  let genericService: jasmine.SpyObj<GenericService>;
  let spyApi: jasmine.SpyObj<ApiService>=jasmine.createSpyObj("ApiService",['postData'])
  spyApi.postData.and.returnValue(of({
    status: 205,
    data: { user: '205worldgyan', pass: '205345Ad@sdf' },
  }))
  
  const setup = (
    genericServiceReturnValue?: jasmine.SpyObjMethodNames<GenericService>
  ) => {
    genericService = jasmine.createSpyObj<GenericService>('GenericService', {
      postData: of({
        status: 202,
        data: { user: 'worldgyan', pass: '345Ad@sdf' },
      }),
      ...genericServiceReturnValue,
    });
  };

  beforeEach(async () => {
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
  it('check generic service postData', () => {
    let component = fixture.componentInstance;
    let returnMockData;

    setup();
    genericService.postData(component.initForm.value).subscribe((val) => {
      returnMockData = val;
    });
    expect(returnMockData).toEqual({
      status: 202,
      data: { user: 'worldgyan', pass: '345Ad@sdf' },
    });
  });

  it('check generic Service postData method with return value', () => {
    let component = fixture.componentInstance;
    let returnMockData;

    setup({
      postData: of({
        status: 505,
        data: { user: '505worldgyan', pass: '505345Ad@sdf' },
      }),
    });
    genericService.postData(component.initForm.value).subscribe((val) => {
      returnMockData = val;
    });
    expect(returnMockData).toEqual({
      status: 505,
      data: { user: '505worldgyan', pass: '505345Ad@sdf' },
    });
  });
  it('check form control from template to component', () => {
    let component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    const user: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#user');
    const pass: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#pass');
    user.value = 'ashutosh';
    pass.value = 'A23@sdfdf';
    user.dispatchEvent(new Event('input'));
    pass.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.initForm.value).toEqual({
      user: 'ashutosh',
      pass: 'A23@sdfdf',
    });
  });

  it('check from component tro template', () => {
    let component = fixture.componentInstance;
    // component.ngOnInit();

    component.initForm.setValue({
      user: 'userName',
      pass: 'User@Name1',
    });
    fixture.detectChanges();
    const user: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#user');
    const pass: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#pass');
    //console.log(user.value,pass.value)
    expect(fixture.componentInstance.initForm.value.user).toBe(user.value);
    expect(component.initForm.value.pass).toBe(pass.value);
  });
  it("submit the form successfully",()=>{
    const user: HTMLInputElement =
    fixture.debugElement.nativeElement.querySelector('#user');
  const pass: HTMLInputElement =
    fixture.debugElement.nativeElement.querySelector('#pass');
    const submit: HTMLInputElement =
    fixture.debugElement.nativeElement.querySelector('#submit');
    user.value="test";
    pass.value="passP@12"
    fixture.detectChanges()
    user.dispatchEvent(new Event('input'));
    pass.dispatchEvent(new Event('input'));
    submit.click();
    submit.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    console.log(fixture.componentInstance.data)
    expect(fixture.componentInstance.data).toEqual(
      {
        "status": 205,
        "data": {
            "user": "205worldgyan",
            "pass": "205345Ad@sdf"
        }
    })

  })
  it("form should not submit if invalid",()=>{
    const data={
      user:"inValidUser",
      pass:"sdfsdf"
    }
    let component=fixture.componentInstance
    component.initForm.setValue(data);
    fixture.detectChanges()
    component.submit();
    fixture.detectChanges()
    expect(component.initForm.invalid).toEqual(true)
    expect(spyApi.postData).toHaveBeenCalledTimes(0);
    // expect(spyApi.postData).toHaveBeenCalled();
  })
});
