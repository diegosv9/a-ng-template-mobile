import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

export const clientUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const urls = 'clientUrls' in environment ? environment.clientUrls : undefined;

  if (urls) {
    Object.entries(urls).forEach(([key, value]) => {
      if (req.url.includes(key)) {
        req = req.clone({
          url: req.url.replace(
            `$${key}-client$`,
            value || `undefined url for ${key}`,
          ),
        });
      }
    });
  }
  return next(req);
};
