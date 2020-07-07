import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    'providedIn': 'root'
})
export class AuthInterceptor implements HttpInterceptor{
    intercept( request : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        let currentUser = JSON.parse(window.localStorage.getItem("userToken"));
        if(currentUser && currentUser.token){
            request = request.clone({
               setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
               } 
            });
        }

        return next.handle(request);
    }    
}