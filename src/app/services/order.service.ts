import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { OrderData } from 'src/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderDataSource = new BehaviorSubject<OrderData | null>(null);
  orderData$ = this.orderDataSource.asObservable();

  constructor(private http: HttpClient) {
    // Retrieve the orderData object from local storage
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      this.orderDataSource.next(JSON.parse(storedOrderData));
    }
    console.log(this.orderData$);
  }

  updateOrderData(orderData: OrderData) {
    // Update the value of the orderDataSource BehaviorSubject
    this.orderDataSource.next(orderData);

    // Store the orderData object in local storage
    localStorage.setItem('orderData', JSON.stringify(orderData));
  }

  createOrder(orderData: OrderData) {
    return this.http.post('http://127.0.0.1:8000/accounts/orders/', orderData, {
      withCredentials: true,
    });
  }

  getCookie(name: string) {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const cookieStr = cookie.trim();
        if (cookieStr.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(
            cookieStr.substring(name.length + 1)
          );
          break;
        }
      }
    }
    return cookieValue;
  }

  addOrderData(orderData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });
    return this.http.post(
      'http://127.0.0.1:8000/accounts/addorders/',
      orderData,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  getOrders() {
    return this.http.get('http://127.0.0.1:8000/accounts/get-orders/');
  }
}
