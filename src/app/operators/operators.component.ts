  import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
  import { PizzaService } from 'src/services/pizza.service';
  import Pizza from 'src/models/pizza';
  import { filter, tap, take, last, first, debounceTime, takeWhile } from 'rxjs/operators';
  import { MatDialog } from '@angular/material/dialog';
  import { IntroDialogComponent } from './intro-dialog/intro-dialog.component';
  import { Subscription, interval, Observable, Observer } from 'rxjs';
  import { MatSnackBar } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-operators',
    templateUrl: './operators.component.html',
    styleUrls: ['./operators.component.scss']
  })
  export class OperatorsComponent implements AfterViewInit, OnDestroy {

    pizzaAllYouCanEat$: Pizza[] = [];
    currentPizza: Pizza;

    avatarPizza: Pizza;

    inIntro: boolean = true;

    selectedOperator: string = 'Filter';

    operatorSubscription: Subscription;

    showCode: boolean = false;

    filterText:string = "Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate. In that case our operator is filtering for savory pizza only.";
    tapText: string = 'Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source. In our case, the consumer is emmiting a snack bar every time sweet pizza come.';
    takeText: string = 'Take returns an Observable that emits only the first count values emitted by the source Observable. If the source emits fewer than count values then all of its values are emitted. After that, it completes, regardless if the source completes. In our case, the consumer will receive 3 pizzas after clicking the subscribe button.';
    firstText: string = 'Emits only the first value (or the first value that meets some condition) emitted by the source Observable. In our case, the consumer will wait for the first, and only the first, pizza.';
    lastText: string = 'Returns an Observable that emits only the last item emitted by the source Observable. It optionally takes a predicate function as a parameter, in which case, rather than emitting the last item from the source Observable, the resulting Observable will emit the last item from the source Observable that satisfies the predicate. In our case, the consumer is receiving the 3 pizzas after the click (take(3)) and will choose the last (last()) of it.';
    debouceTimeText: string= 'Emits a value from the source Observable only after a particular time span has passed without another source emission. In our case, the kitchen is generating pizzas after 2 seconds and our operator is looking for a 1 second gap without pizzas beeing generated to get the last source value.'
    takeWhileText: string = 'Emits values emitted by the source Observable so long as each value satisfies the given predicate, and then completes as soon as this predicate is not satisfied. In our case the consumer is getting pizzas while only savory pizzas are comming.';

    textToBeShown: string = '';

    imgSource: string = '../../assets/filter-code.PNG';

    progressbarValue = 0;
    progressBarSubscription: Subscription;

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
          this.startTyping();
        })
    }  
    
    ngAfterViewInit(){
        console.log(document.getElementById('text'));
    }

    ngOnDestroy(){
      this.progressBarSubscription.unsubscribe();
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
        this.startTimer();   
      })
    }

    i = 0;
    startTyping(){
      let text = '';
      switch (this.selectedOperator) {
        case 'Filter':
          text = this.filterText;
          this.imgSource = '../../assets/filter-code.PNG'
        break;
        case 'Tap':
          text = this.tapText;
          this.imgSource = '../../assets/tap-code.PNG'
        break;
        case 'Take':
          text = this.takeText;
          this.imgSource = '../../assets/take-code.PNG'
        break;
        case 'First':
          text = this.firstText;
          this.imgSource = '../../assets/first-code.PNG'
        break;
        case 'Last':
          text = this.debouceTimeText;
          this.imgSource = '../../assets/last-code.PNG'
        break;
        case 'DebounceTime':
          text = this.debouceTimeText;
          this.imgSource = '../../assets/debounceTime-code.PNG'
        break;
        case 'TakeWhile':
          text = this.takeWhileText;
          this.imgSource = '../../assets/takeWhile-code.PNG'
        break;
      }
      if (this.i < text.length) {
        this.textToBeShown += text.charAt(this.i);
        this.i++;
        setTimeout(() => {
          this.startTyping();
        }, 50);
      }
    }

    avatarIn(){
      
      if(this.operatorSubscription){
        return false;
      }

      if(this.selectedOperator == 'Filter'){
        this.operatorSubscription = this.pizzaService.hotService.pipe(
          filter((pizza) => {
          return pizza.constructor.name == 'SavoryPizza';
        })).subscribe((pizza) => {
          this.avatarPizza = pizza;
        })
      }
      else if(this.selectedOperator == 'Tap'){
        this.operatorSubscription = this.pizzaService.hotService.pipe(
          filter((pizza) => {
          return pizza.constructor.name == 'SweetPizza';
        }),tap(() => {
            this.openSnackBar();
        })).subscribe((pizza) => {
          this.avatarPizza = pizza;
        })
      }
      else if(this.selectedOperator == 'Take'){
        this.operatorSubscription = this.pizzaService.hotService.pipe(
          take(3)
          ).subscribe((pizza) => {
          this.avatarPizza = pizza;
        })
      }
      else if(this.selectedOperator == 'First'){
        this.operatorSubscription = this.pizzaService.hotService.pipe(
          first()
          ).subscribe((pizza) => {
          this.avatarPizza = pizza;
        })
      }
      else if(this.selectedOperator == 'Last'){
        this.operatorSubscription = this.pizzaService.hotService.pipe(
          take(3),
          last()
          ).subscribe((pizza) => {
          this.avatarPizza = pizza;
        })
      }
      else if(this.selectedOperator == 'DebounceTime'){
        this.operatorSubscription = this.pizzaService.hotService.pipe(
          debounceTime(1000)
          ).subscribe((pizza) => {
          this.avatarPizza = pizza;
        })
      }
      else if(this.selectedOperator == 'TakeWhile'){
        this.operatorSubscription = this.pizzaService.hotService.pipe(
          takeWhile(pizza => pizza.constructor.name == 'SavoryPizza')
          ).subscribe((pizza) => {
          this.avatarPizza = pizza;
        })
      }
    }

    changeOperator(type){
      if(this.selectedOperator != type){
        this.showCode = false;
        this.i = 0;
        this.textToBeShown = '';
        this.selectedOperator = type;
        this.resetOperator();
        this.avatarPizza = null;
        this.startTyping();
      }
    }

    resetOperator(){
      if(this.operatorSubscription){
        this.operatorSubscription.unsubscribe();
      }
    }

    openSnackBar() {
      this.snackBar.open("Dessert time!", null, {
        duration: 2000,
      });
    }

    timer = new Observable<number>((observer: Observer<number>) => {
      interval(250).subscribe(res => {
        observer.next(res == 0 ? 1 : 15 + (15 * res));
        if(res == 7){
          observer.complete();
        }
      })
    })

    //progress bar
    startTimer() {
      this.progressBarSubscription = this.timer.subscribe((sec) => {
        this.progressbarValue = sec;
      });
    }

  }
