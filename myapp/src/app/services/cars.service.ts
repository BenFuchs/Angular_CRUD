import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private SERVER = 'http://localhost:3000/cars'
  constructor(private http: HttpClient) { }

  //get cars
  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.SERVER)
  }

  //add car
  addCar(newCar: Car): Observable<Car>{
    return this.http.post<Car>(this.SERVER, newCar)
  }

  //delete car
  delCar(id:string): Observable<void>{
    return this.http.delete<void>(`${this.SERVER}/${id}`);
  }

  //update car
  updCar(id:string, newCar:Car): Observable<Car>{
    return this.http.put<Car>(`${this.SERVER}/${id}`, newCar)
  }
}
