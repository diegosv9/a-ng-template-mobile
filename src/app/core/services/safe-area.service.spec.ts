import { TestBed } from '@angular/core/testing';
import { SafeAreaService } from './safe-area.service';

// Mock the Capacitor safe area plugin
jest.mock('@capacitor-community/safe-area', () => ({
  SafeArea: {
    enable: jest.fn(),
  },
  initialize: jest.fn(),
}));

jest.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: jest.fn(),
  },
}));

describe('SafeAreaService', () => {
  let service: SafeAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafeAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize safe area', async () => {
    const { initialize } = jest.requireMock('@capacitor-community/safe-area');
    await service.initializeSafeArea();
    expect(initialize).toHaveBeenCalled();
  });
});