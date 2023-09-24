import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

formularioLogin:FormGroup;
constructor(public fb: FormBuilder){
  this.formularioLogin=this.fb.group({
    'nombre': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required)
  })
}
  ngOnInit() {
  }

}
