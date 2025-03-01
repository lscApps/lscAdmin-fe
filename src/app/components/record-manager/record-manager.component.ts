import { Component, Input, OnInit } from '@angular/core';
import { Record } from '../../models/record';
import { RecordService } from '../../services/record/record.service';
import { RecurrentType } from '../../enums/recurent_type';

@Component({
  selector: 'app-record-manager',
  templateUrl: './record-manager.component.html',
  styleUrl: './record-manager.component.css'
})
export class RecordManagerComponent implements OnInit{


  ngOnInit(): void {
  }

}
