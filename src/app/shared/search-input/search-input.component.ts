import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isArrayOfObjects } from 'src/app/core/utils/data-managment.utils';
import { MultiKeyObjectSearchStrategy, PrimitiveSearchStrategy, SearchContext } from 'src/app/core/utils/search/search-strategy';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  public glassSvg: string = 'assets/images/icons/glass-solid.svg';
  public searchTerm:string;

  @Input() placeholder:string;
  @Input() data: any[];
  @Input() keys: string[] = []
  @Input() searchFunction?:(term:string) => any[]; 
  @Output() emitSearch: EventEmitter<any[]> = new EventEmitter<any[]>;

  public onSearch(): void {
    let filtered: any[] = [];

    if (!Array.isArray(this.data)) {
      throw new Error("SearchInputComponent: data must be an array.");
    }

    if (this.searchFunction) {
      filtered = this.searchFunction(this.searchTerm);
    } else {
      const searchContext = new SearchContext(
        isArrayOfObjects(this.data)
          ? new MultiKeyObjectSearchStrategy(this.keys)
          : new PrimitiveSearchStrategy()
      );

      filtered = searchContext.executeSearch(this.data, this.searchTerm);
    }

    this.emitSearch.emit(filtered);
  }
}
