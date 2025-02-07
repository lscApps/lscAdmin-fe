import { Component, OnInit } from '@angular/core';
import { RecordType } from '../../enums/record_type';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.css'
})
export class EntriesComponent implements OnInit{

  title: string = "Entries"
  recordType!: number;

  ngOnInit(): void {
    this.recordType = RecordType.ENTRY.valueOf()
  }

  



}
