import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PagamentosService } from 'src/app/shared/service/pagamentos.service';

@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.scss']
})
export class ListarPagamentosComponent implements OnInit {

  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed'];
  dataSource = new MatTableDataSource<any>();
  linksPaginacao: any;
  page=1;
  limit=20

  length = 100;
  pageSize = 10;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pagamentosServivce: PagamentosService) { }

  ngOnInit(): void {
    this.pagamentosServivce.listarPagamentos(this.page,this.limit).subscribe(resp=>{
      //this.linksPaginacao = resp.headers.get('Link').split(',').map(x=>x.split(';').map(c=>c.replace(' rel="', '').replace(/"|_/g,'')));
     
      this.linksPaginacao = this.parseLinkHeader(resp.headers.get('Link'));
      console.log(this.linksPaginacao)
      console.log(resp.body);
      const table = new MatTableDataSource<any>(resp.body)
      this.dataSource = table
    }, error=> console.log(error))
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  parseLinkHeader( linkHeader ) {
    const linkHeadersArray = linkHeader.split( ", " ).map( header => header.split( "; " ) );
    const linkHeadersMap = linkHeadersArray.map( header => {
       const thisHeaderRel = header[1].replace( /"/g, "" ).replace( "rel=", "" );
       const thisHeaderUrl = header[0].slice( 1, -1 );
       return [ thisHeaderRel, thisHeaderUrl ]
    } );
   return this.toObject(linkHeadersMap);
 }

 toObject(pairs) {
  return Array.from(pairs).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: value }),
    {},
  );
}
onPaginateChange(event){
  console.log(event);
}

nextPage(){
  this.page = this.page + 1;
  this.pagamentosServivce.listarPagamentos(this.page, this.limit).subscribe(resp=> {
    const table = new MatTableDataSource<any>(resp.body)
    this.dataSource = table
  })
}


previousPage(){
  this.page = this.page - 1;
  this.pagamentosServivce.listarPagamentos(this.page, this.limit).subscribe(resp=> {
    const table = new MatTableDataSource<any>(resp.body)
    this.dataSource = table
  })
}


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];