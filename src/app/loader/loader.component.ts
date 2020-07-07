import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service'; 
import { LoaderState } from 'src/app/shared/loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  show : boolean = false;
  private subscription : Subscription;

  constructor(private loaderService: LoaderService) {
    this.subscription = this.loaderService.loaderState.subscribe((state : LoaderState) => {
      this.show = state.show;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
