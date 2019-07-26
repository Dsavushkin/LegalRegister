import { Component, OnInit  } from '@angular/core';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

class SearchItem {
  constructor(
    public track: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

class AppComponent {
  private loading: boolean = false;
  private results: Observable<SearchItem[]>;
  private searchField: FormControl;

  constructor(private itunes: SearchService) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap(term => this.itunes.search(term)),
      tap(_ => (this.loading = false))
    );
  }

  doSearch(term: string) {
    this.itunes.search(term);
  }
}

class SearchService {
}

class AppComponent {
  private loading: boolean = false;
  private results: Observable<SearchItem[]>;
  private searchField: FormControl;

  constructor(private itunes: SearchService) {}

  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap(term => this.itunes.search(term)),
      tap(_ => (this.loading = false))
    );
  }

  doSearch(term: string) {
    this.itunes.search(term);
  }
}

