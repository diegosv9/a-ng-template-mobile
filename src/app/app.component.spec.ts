import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  DefaultTranspiler,
  TRANSLOCO_TRANSPILER,
  TRANSLOCO_MISSING_HANDLER,
  TRANSLOCO_INTERCEPTOR,
  TRANSLOCO_FALLBACK_STRATEGY,
} from '@jsverse/transloco';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: TRANSLOCO_TRANSPILER, useClass: DefaultTranspiler },
        { provide: TRANSLOCO_MISSING_HANDLER, useValue: (key: string) => key },
        { provide: TRANSLOCO_INTERCEPTOR, useValue: [] },
        { provide: TRANSLOCO_FALLBACK_STRATEGY, useValue: 'all' },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
