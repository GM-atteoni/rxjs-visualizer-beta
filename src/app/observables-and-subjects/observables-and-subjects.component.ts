import { Component, OnInit, OnDestroy } from '@angular/core';
import { PizzaService } from 'src/services/pizza.service';
import SavoryPizza from 'src/models/savoryPizza';
import { delay, concatMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-observables-and-subjects',
  templateUrl: './observables-and-subjects.component.html',
  styleUrls: ['./observables-and-subjects.component.scss']
})
export class ObservablesAndSubjectsComponent implements OnDestroy {

  kitchenShowcase = 'Cooking...';

  pizza4Customer1 = 'Empty';

  pizza4Customer2 = 'Empty';

  pizza4Customer3 = 'Empty';

  pizza4Customer4 = 'Empty';

  constructor(public pizzaService: PizzaService) {

    pizzaService.hotService.subscribe((pizza) => {
      this.kitchenShowcase = pizza.flavor;
    })

  }
  ngOnDestroy(): void {
    this.endServiceTable01();
    this.endServiceTable02();
    this.endServiceTable03();
    this.endServiceTable04();
  }

  customer1OrderSheet;
  customer2OrderSheet;
  customer3OrderSheet;
  customer4OrderSheet;

  customer1() {
    if(!this.customer1OrderSheet){
      this.pizza4Customer1 = 'Waiting...'
      this.customer1OrderSheet = this.pizzaService.coldService.subscribe(pizza => {
        this.pizza4Customer1 = pizza.flavor;
      })
    }
  }

  customer2() {
    if(!this.customer2OrderSheet){
      this.pizza4Customer2 = 'Waiting...'
      this.customer2OrderSheet = this.pizzaService.coldService.subscribe(pizza => {
        this.pizza4Customer2 = pizza.flavor;
      })
    }
  }

  customer3() {
    if(!this.customer3OrderSheet){
      this.pizza4Customer3 = 'Waiting...'
      this.customer3OrderSheet = this.pizzaService.hotService.subscribe(pizza => {
        this.pizza4Customer3 = pizza.flavor;
      })
    }
  }

  customer4() {
    if(!this.customer4OrderSheet){
      this.pizza4Customer4 = 'Waiting...'
      this.customer4OrderSheet = this.pizzaService.hotService.subscribe(pizza => {
        this.pizza4Customer4 = pizza.flavor;
      })
    }
  }

  pizza4Table1Customer1 = 'Empty'
  pizza4Table1Customer2 = 'Empty'
  pizza4Table1Customer3 = 'Empty'
  pizza4Table1Customer4 = 'Empty'
  
  table01OrderSheet = [];

  table01(){
    this.pizza4Table1Customer1 = 'Waiting...'
    this.pizza4Table1Customer2 = 'Waiting...'
    this.pizza4Table1Customer3 = 'Waiting...'

    this.table01OrderSheet.push(this.pizzaService.table01.subscribe((pizza4Table1Customer1) => {
      this.pizza4Table1Customer1 = pizza4Table1Customer1.flavor;
    }))
    this.table01OrderSheet.push(this.pizzaService.table01.subscribe((pizza4Table1Customer2) => {
      this.pizza4Table1Customer2 = pizza4Table1Customer2.flavor;
    }))
    this.table01OrderSheet.push(this.pizzaService.table01.subscribe((pizza4Table1Customer3) => {
      this.pizza4Table1Customer3 = pizza4Table1Customer3.flavor;
    }))
  }

  table01Ask4Pepperoni(){
       this.pizzaService.table01.next(new SavoryPizza('Pepperoni', '../../assets/Pepperoni.png', '../../assets/PepperoniBig.png'));
  }

  endServiceTable01(){
      this.pizza4Table1Customer1 = 'Empty'
      this.pizza4Table1Customer2 = 'Empty'
      this.pizza4Table1Customer3 = 'Empty'
      this.pizza4Table1Customer4 = 'Empty'

      this.table01OrderSheet.forEach(customer => {
        customer.unsubscribe();
      });

      this.table01OrderSheet = [];
    
  }

  pizza4Table2Customer1 = 'Empty'
  pizza4Table2Customer2 = 'Empty'
  pizza4Table2Customer3 = 'Empty'
  pizza4Table2Customer4 = 'Empty'

  table02OrderSheet = [];

  table02(){
    this.pizza4Table2Customer1 = 'Waiting...'
    this.pizza4Table2Customer2 = 'Waiting...'
    this.pizza4Table2Customer3 = 'Waiting...'
    this.pizza4Table2Customer4 = 'Waiting...'

    this.table02OrderSheet.push(this.pizzaService.table02.subscribe((pizza4Table2Customer1) => {
      this.pizza4Table2Customer1 = pizza4Table2Customer1.flavor;
    }))
    this.table02OrderSheet.push(this.pizzaService.table02.pipe(filter((pizza) => {
      return pizza.flavor != 'Cheese'
    })).subscribe((pizza4Table2Customer2) => {
      this.pizza4Table2Customer2 = pizza4Table2Customer2.flavor;
    }))
    this.table02OrderSheet.push(this.pizzaService.table02.subscribe((pizza4Table2Customer3) => {
      this.pizza4Table2Customer3 = pizza4Table2Customer3.flavor;
    }))
    this.table02OrderSheet.push(this.pizzaService.table02.subscribe((pizza4Table2Customer4) => {
      this.pizza4Table2Customer4 = pizza4Table2Customer4.flavor;
    }))

  }

  table02Ask4Pepperoni(){
      this.pizzaService.table02.next(new SavoryPizza('Pepperoni', '../../assets/Pepperoni.png', '../../assets/PepperoniBig.png'))
  }

  endServiceTable02(){

      this.pizza4Table2Customer1 = 'Empty'
      this.pizza4Table2Customer2 = 'Empty'
      this.pizza4Table2Customer3 = 'Empty'
      this.pizza4Table2Customer4 = 'Empty'

      this.table02OrderSheet.forEach(customer => {
        customer.unsubscribe();
      });

      this.table02OrderSheet = [];
    
  }


  pizza4Table3Customer1 = 'Empty'
  pizza4Table3Customer2 = 'Empty'
  pizza4Table3Customer3 = 'Empty'
  pizza4Table3Customer4 = 'Empty'

  table03OrderSheet = [];

  table03(){
    this.pizza4Table3Customer1 = 'Waiting...'
    this.pizza4Table3Customer2 = 'Waiting...'
    this.pizza4Table3Customer3 = 'Waiting...'
    this.pizza4Table3Customer4 = 'Waiting...'

    this.table03OrderSheet.push(this.pizzaService.table03.subscribe((pizza4Table3Customer1) => {
      this.pizza4Table3Customer1 = pizza4Table3Customer1.flavor;
    }))
    this.table03OrderSheet.push(this.pizzaService.table03.subscribe((pizza4Table3Customer2) => {
      this.pizza4Table3Customer2 = pizza4Table3Customer2.flavor;
    }))
    this.table03OrderSheet.push(this.pizzaService.table03.subscribe((pizza4Table3Customer3) => {
      this.pizza4Table3Customer3 = pizza4Table3Customer3.flavor;
    }))
    this.table03OrderSheet.push(this.pizzaService.table03.subscribe((pizza4Table3Customer4) => {
      this.pizza4Table3Customer4 = pizza4Table3Customer4.flavor;
    }))

  }

  table03Ask4Pepperoni(){
      this.pizzaService.table03.next(new SavoryPizza('Pepperoni', '../../assets/Pepperoni.png', '../../assets/PepperoniBig.png'))
  }

  endServiceTable03(){

      this.pizza4Table3Customer1 = 'Empty'
      this.pizza4Table3Customer2 = 'Empty'
      this.pizza4Table3Customer3 = 'Empty'
      this.pizza4Table3Customer4 = 'Empty'

      this.table03OrderSheet.forEach(customer => {
        customer.unsubscribe();
      });

      this.table03OrderSheet = [];
    
  }

  pizza4Table4Customer1 = 'Empty'
  pizza4Table4Customer2 = 'Empty'
  pizza4Table4Customer3 = 'Empty'
  pizza4Table4Customer4 = 'Empty'

  table04OrderSheet = [];

  table04(){
    this.table04OrderSheet.push(this.pizzaService.table04.pipe(
      concatMap(value => of(value).pipe(delay(500)))
    ).subscribe((pizza4Table4Customer1) => {
      this.pizza4Table4Customer1 = pizza4Table4Customer1.flavor;
    }))
    this.table04OrderSheet.push(this.pizzaService.table04.pipe(
      concatMap(value => of(value).pipe(delay(500)))
    ).subscribe((pizza4Table4Customer2) => {
      this.pizza4Table4Customer2 = pizza4Table4Customer2.flavor;
    }))

  }

  table04Ask4Pepperoni(){
      this.pizzaService.table04.next(new SavoryPizza('Pepperoni', '../../assets/Pepperoni.png', '../../assets/PepperoniBig.png'))
  }

  endServiceTable04(){

      this.pizza4Table4Customer1 = 'Empty'
      this.pizza4Table4Customer2 = 'Empty'
      this.pizza4Table4Customer3 = 'Empty'
      this.pizza4Table4Customer4 = 'Empty'
      this.table04OrderSheet.forEach(customer => {
        customer.unsubscribe();
      });

      this.table04OrderSheet = [];
    
  }

}
