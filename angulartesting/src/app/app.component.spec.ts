import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    var testingConfig = TestBed.configureTestingModule({
      declarations: [AppComponent]
    })

    testingConfig.compileComponents()
  }
  );

  it('should create the app', () => {
    const app = TestBed.createComponent(AppComponent).componentInstance
    expect(app).toBeTruthy()
  });

  it(`should have as title 'angulartesting'`, () => {
    const app = TestBed.createComponent(AppComponent).componentInstance
    expect(app.title).toBe('angulartesting')
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h1").textContent).toContain('angulartesting')
  });
  it('should render changed title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges();
    fixture.componentInstance.title = "typescript"
    fixture.detectChanges();
    console.log("🚀 ~ file: app.component.spec.ts ~ line 32 ~ it ~ fixture", fixture.componentInstance.m1(1,2,3))
    expect(fixture.componentInstance.m1(1,2,3)).toBe(6)
  });

  afterEach(() => {
    console.log('afterEach')
  })

});
