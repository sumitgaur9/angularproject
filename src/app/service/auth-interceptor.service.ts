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
            if(request.url=='https://api.roazorpay.com/v1/orders')
            {
                var headerobj={
                Username:"rzp_test_S6Oc7OAUlNhPz3",
                Password:"9oad02hYU3YABqDfrd3msZfW"
                }

                var abc = {
                    "rzp_test_S6Oc7OAUlNhPz3": "9oad02hYU3YABqDfrd3msZfW"
                }
                request = request.clone({
                    setHeaders: {
//                        'Authorization': `Basic Auth ${headerobj}`
                        'Authorization': `Basic cnpwX3Rlc3RfUzZPYzdPQVVsTmhQejM6OW9hZDAyaFlVM1lBQnFEZnJkM21zWmZX`
                        // headers_object.append("Authorization", "Basic " + btoa("username:password"));

                    } 

            //         setHeaders: {
            //             'Authorization': 'Basic Auth',
            //             'Username': "rzp_test_S6Oc7OAUlNhPz3",
            //             'Password': '9oad02hYU3YABqDfrd3msZfW'
            //    }

                 });
            }
            else{
                request = request.clone({
                    setHeaders: {
                         'Authorization': `Bearer ${currentUser.token}`
                    } 
                 });
            }
           
        }

        return next.handle(request);
    }    
}