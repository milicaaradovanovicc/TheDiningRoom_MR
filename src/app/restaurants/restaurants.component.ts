import { Component } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantsList } from '../model/restaurant.model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent {
  restaurants: RestaurantsList = new RestaurantsList();

  priceFromControl = new FormControl(1);
  priceToControl = new FormControl(5);

  queryParams = {
    page: 1,
    pageSize: 9,
    filter: {
      cuisine: '',
      priceFrom: 1,
      priceTo: 5,
    },
  };

  constructor(
    private service: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      let cuisine = params['cuisine'];
      if (cuisine == 'All') cuisine = '';
      this.queryParams.filter.cuisine = cuisine;
      this.getRestaurants();
    });
  }

  getRestaurants() {
    this.service
      .getAll(this.queryParams)
      .subscribe((restaurants: RestaurantsList) => {
        this.restaurants = restaurants;
        console.log(restaurants);
      });
  }

  onPriceChanged(): void {
    console.log('ovo radi kad se klikne');
    this.queryParams.filter.priceFrom = this.priceFromControl.value || 1;
    this.queryParams.filter.priceTo = this.priceToControl.value || 5;
    this.getRestaurants();
  }

  onPageChanged(newPage: number) {
    this.queryParams.page = newPage;
    this.getRestaurants();
  }
}
