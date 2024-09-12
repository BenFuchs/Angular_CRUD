import { Component } from '@angular/core';
import { CarsService } from './services/cars.service';
import { Car } from './models/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
  carList: Car[] = []; // Array to hold the list of cars

  // For update
  updateCarId?: number;
  updateModel: string = '';
  updateYear: number = 0;
  updateColor: string = '';

  constructor(private cs: CarsService) {
    this.loadCars(); // Load cars when the component is initialized
  }

  addCar(model: string, year: number, color: string): void {
    const newCar: Car = {
      color: color,
      model: model,
      year: year
    };

    this.cs.addCar(newCar).subscribe(
      (car) => {
        console.log('Car added successfully:', car);
        this.loadCars(); // Refresh the car list after adding a new car
      },
      (error) => {
        console.error('Error adding car:', error);
      }
    );
  }

  delCar(id: string): void {
    this.cs.delCar(id).subscribe(
      () => {
        console.log('Car deleted successfully:', id);
        this.loadCars(); // Refresh the car list after deleting a car
      },
    );
  }

  updCar(id: string, model: string, year: number, color: string): void {
    const updatedCar: Car = {
      color: color,
      model: model,
      year: year,
    };

    this.cs.updCar(id, updatedCar).subscribe(
      () => {
        console.log('Car updated successfully:', id);
        this.loadCars(); // Refresh the car list after updating a car
      },
      (error) => {
        console.error('Error updating car:', error);
      }
    );
  }

  loadCars(): void {
    this.cs.getCars().subscribe(
      (cars) => {
        this.carList = cars;
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }
}
