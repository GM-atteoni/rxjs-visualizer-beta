import { Injectable } from '@angular/core';
import Pizza from 'src/models/pizza';
import SavoryPizza from 'src/models/savoryPizza';
import SweetPizza from 'src/models/sweetPizza';
import { Observable, Observer, Subject, Subscription, BehaviorSubject, ReplaySubject } from 'rxjs'
import { debounceTime, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  public coldService: Observable<Pizza>;

  public hotService: Observable<SavoryPizza | SweetPizza>;

  private kitchen: Kitchen = new Kitchen();

  public waiter: Waiter;

  table01: Subject<Pizza>;
  table02: Subject<Pizza>;

  table03: BehaviorSubject<Pizza>;

  table04: ReplaySubject<Pizza>;

  constructor() {

    //cold observable will produce different flavours of pizza for each customer. They are like private service.
    this.coldService = new Observable<Pizza>((observer: Observer<Pizza>) => {
      setInterval(() => {
        observer.next(this.kitchen.getPizza())
      }, 3000)
    })

    //hot observable will produce the same flavours of pizza for each customer. They are like all-you-can-eat.
    //we need to have a waiter to serve the same pizza for each customer
    this.waiter = new Waiter();
    //the waiter needs to be inside the kitchen to get the same pizza for all customers.
    this.kitchen.addWaiter(this.waiter)
    //then the kitchen can produce pizza for the waiter
    this.kitchen.startCookingForWaiters();

    //At this moment, when a customer asks for this service, he will receive the same pizza as every other customer in this service. 
    this.hotService = new Observable<SavoryPizza | SweetPizza>((observer: Observer<SavoryPizza | SweetPizza>) => {
     this.waiter.receiveCustomer((pizza) => observer.next(pizza));
    });

    //Sometimes our establishment receives a group of customers asking for a table. Then, our waiter starts serving the produced pizza from the kitchen, 
    //this group need to be able to enter the hot or the cold service. i.e. table 1 asks for cold service and table 2 asks for hot service
    this.table01 = new Subject<SavoryPizza | SweetPizza>();
    this.coldService.subscribe(this.table01);

    this.table02 = new Subject<SavoryPizza | SweetPizza>();
    this.hotService.subscribe(this.table02);

    this.table03 = new BehaviorSubject<SavoryPizza | SweetPizza>(new Pizza('', '', ''));
    this.hotService.subscribe(this.table03);

    this.table04 = new ReplaySubject<SavoryPizza | SweetPizza>();
    this.hotService.subscribe(this.table04);
  }

}


//This is the kitchen, it doesn't matters about what is going on outside. It just produce random pizza.
class Kitchen {

  private waiters: Waiter[] = [];

  //let a waiter to enter the kitchen and receives the pizza before it is delivered
  public addWaiter(waiter){
    this.waiters.push(waiter);
  }

  public startCookingForWaiters(){
    setInterval(() => {
      for(let waiter of this.waiters){
        waiter.getPizzaForCustomers(this.getPizza());
      }
    }, 2000)
  }

  //produce random pizza
  private producePizza(): SavoryPizza | SweetPizza {
    let min = Math.ceil(1);
    let max = Math.floor(15);
      switch (Math.floor(Math.random() * (max - min)) + min) {
        case 1:
          return new SavoryPizza('Pepperoni', '../../assets/Pepperoni.png', '../../assets/PepperoniBig.png');
        case 2:
          return new SavoryPizza('Cheese', '../../assets/Cheese.png', '../../assets/CheeseBig.png');
        case 3:
          return new SavoryPizza('Veggie', '../../assets/Veggie.png', '../../assets/VeggieBig.png');
        case 4: 
          return new SavoryPizza('Barbecue', '../../assets/barbecue.png', '../../assets/barbecueBig.png');
        case 5:
          return new SavoryPizza('Sausage', '../../assets/sausage.png', '../../assets/sausageBig.png');
        case 6:
          return new SavoryPizza('Hawaiian', '../../assets/Hawaiian.png', '../../assets/HawaiianBig.png');
        case 7:
          return new SavoryPizza('Shrimp', '../../assets/shrimp.png', '../../assets/shrimpBig.png');
        case 8:
          return new SavoryPizza('Broccoli', '../../assets/broccoli.png', '../../assets/broccoliBig.png');
        case 9:
          return new SavoryPizza('Margherita', '../../assets/Margherita.png', '../../assets/MargheritaBig.png');
        case 10:
          return new SavoryPizza('Bacon', '../../assets/Bacon.png', '../../assets/BaconBig.png');
        case 11:
          return new SweetPizza('Chocolate', '../../assets/Chocolate.png', '../../assets/ChocolateBig.png');
        case 12:
          return new SweetPizza('Cookie', '../../assets/Cookie.png', '../../assets/CookieBig.png');
        case 13:
          return new SweetPizza('Marshmallow', '../../assets/marshmallow.png', '../../assets/marshmallowBig.png');
        case 14:
          return new SweetPizza('Strawberry', '../../assets/Chocolate_Strawberry.png', '../../assets/Chocolate_StrawberryBig.png');
      }
  }

  //deliver the pizza to anyone who asks for
  public getPizza(): SavoryPizza | SweetPizza{
    return this.producePizza();
  }

}


//this is the waiter
class Waiter{

  customers = [];

  receiveCustomer(customer){
    this.customers.push(customer)
  }

  getPizzaForCustomers(pizza: SavoryPizza | SweetPizza){
    for(let customer of this.customers){
      customer(pizza);
    }
  }

  askRandomDrink(): string{
    return Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1))) + Math.ceil(1) == 1 ? 'coke' : 'orange'
  }

}
