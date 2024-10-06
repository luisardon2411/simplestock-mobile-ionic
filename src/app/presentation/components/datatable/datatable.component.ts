import { NgClass, NgFor, NgIf } from "@angular/common";
import { Component, Input, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";


@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        NgFor,
        NgIf,
        NgClass
    ]
})
export class DataTableComponent{

    @Input() data: any[] = [];
    @Input() columns: string[] = [];
  
    form!: FormGroup;
    filteredData: any[] = [];
    paginatedData: any[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 10;
    Math = Math;

    get pages() {
        return Array.from({ length: Math.ceil(this.filteredData.length / this.itemsPerPage) }, (_, i) => i + 1);
    }
    constructor(private fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.filteredData = this.data;
      this.paginateData();
      this.createForm();
    }
    
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['data']) {
        this.filteredData = this.data;
        this.paginateData();
        this.search();
      }
    }

    createForm() {
      const group: any = {
        searchText: [''],
        itemsPerPage: [10],
      };
  
      this.columns.forEach(column => {
        group[column] = [''];
      });
  
      this.form = this.fb.group(group);
  
      this.form.valueChanges.subscribe( (values: any) => {
        this.search();
      });

      this.form?.get('itemsPerPage')?.valueChanges.subscribe((value) => {
        this.itemsPerPage = value;
        this.paginateData();
      });
    }
  
    paginateData(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedData = this.filteredData.slice(startIndex, endIndex);
    }
  
    search(): void {
      const values = this.form?.value;
      if (values && this.data) {
        const searchText = values.searchText?.toLowerCase() || '';
        this.filteredData = this.data.filter(row => {
          return Object.values(row).some(
            (value: any) =>
            value?.toString().toLowerCase().includes(searchText)
          );
        });
    
        this.applyColumnFilters();
        this.paginateData();
      }
    }
    applyColumnFilters(): void {
      const values = this.form.value;
  
      for (const column of this.columns) {
        const filter = values[column];
        if (filter) {
          this.filteredData = this.filteredData.filter(row =>
            row[column].toString().toLowerCase().includes(filter.toLowerCase())
          );
        }
      }
    }
}