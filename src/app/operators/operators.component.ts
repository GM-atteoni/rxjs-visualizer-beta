import { Component } from '@angular/core';
import { PizzaService } from 'src/services/pizza.service';
import Pizza from 'src/models/pizza';
import { filter, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { IntroDialogComponent } from './intro-dialog/intro-dialog.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent {

  pizzaAllYouCanEat$: Pizza[] = [];
  currentPizza: Pizza;

  avatarPizza: Pizza;

  inIntro: boolean = true;

  selectedOperator: string = 'Filter';

  operatorSubscription: Subscription;

  constructor(
    private pizzaService: PizzaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {
      const dialogRef = this.dialog.open(IntroDialogComponent, {
          height: '80vh',
          width: '50vw'
      })

      dialogRef.afterClosed().subscribe(res => {
        this.startStream();
      })
   }

   startStream(){
     this.inIntro = false;
    this.pizzaService.hotService.subscribe((pizza) => {
      if(this.currentPizza){
        this.pizzaAllYouCanEat$.splice(0, 0 , this.currentPizza);
        this.currentPizza = pizza; 
      }else{
        this.currentPizza = pizza;
      }      
    })
   }

   avatarIn(){
     if(this.selectedOperator == 'Filter'){
      this.operatorSubscription = this.pizzaService.hotService.pipe(filter((pizza) => {
        return pizza.constructor.name == 'SavoryPizza';
      })).subscribe((pizza) => {
        this.avatarPizza = pizza;
      })
     }else if(this.selectedOperator == 'Tap'){
      this.operatorSubscription = this.pizzaService.hotService.pipe(filter((pizza) => {
        return pizza.constructor.name == 'SweetPizza';
      }),tap(() => {
          this.openSnackBar();
      })).subscribe((pizza) => {
        this.avatarPizza = pizza;
      })
     }
     
   }

   changeOperator(type){
    this.selectedOperator = type;
    this.resetOperator();
    this.avatarPizza = new Pizza('', '', '');
   }

   resetOperator(){
    this.operatorSubscription.unsubscribe();
   }

   openSnackBar() {
    this.snackBar.open("Dessert time!", null, {
      duration: 2000,
    });
  }

}
