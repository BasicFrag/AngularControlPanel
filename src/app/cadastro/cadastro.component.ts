import { Component, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProfissional } from '../shared/profissional.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
  pessoa!: IProfissional;
  statusValidacao: EventEmitter<IProfissional> = new EventEmitter<IProfissional>();

  constructor() {
    this.cadastroForm = new FormGroup({
      'nome': new FormControl(null, {
        validators: [Validators.required]
      }),
      'email': new FormControl(null, {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'
      }),
      'idade': new FormControl(null, {
        validators: [Validators.min(18),Validators.required]
      }),
      'profissao': new FormControl(null, {
        validators: [Validators.required]
      }),
      'especialidades': new FormArray([], {
        validators: Validators.required
      })
    })
  }

  get nome() {
    return this.cadastroForm.get('nome');
  }
  get email() {
    return this.cadastroForm.get('email');
  }
  get idade() {
    return this.cadastroForm.get('idade');
  }
  get profissao() {
    return this.cadastroForm.get('profissao');
  }
  
  controleInvalido(controlName: string, index: number = 0) {
    const control = this.cadastroForm.get(controlName);

    switch(controlName) {
      case 'email': 
        return (control?.hasError('email') || control?.hasError('required')) && 
        control.touched ? 'is-invalid' : '';
      case 'idade' :
        return (control?.hasError('min') || control?.hasError('required')) && 
        control.touched ? 'is-invalid' : '';
      case 'especialidades': 
        const especialidades = (<FormArray>control)?.at(index)
        return (especialidades?.hasError('required') && especialidades?.touched ? 'is-invalid' : ''); 
      default:
        return control?.hasError('required') && control.touched ? 'is-invalid' : '';
    }
  }

  onCadastrar() {
    
    console.log();
    this.onLimpar();
  }

  onLimpar() {
    this.cadastroForm.reset();
    this.onLimparEspecialidades();
  }

  onLimparEspecialidades() {
    (<FormArray>this.cadastroForm.get('especialidades')).clear();
  }

  onRemoverEspecialidade(index: number) {
    (<FormArray>this.cadastroForm.get('especialidades')).removeAt(index)
  }

  onAddEspecialidade() {
    const especialidadeControl = new FormControl(null, {validators: Validators.required});
    (<FormArray>this.cadastroForm.get('especialidades')).push(especialidadeControl);
  }
  getEspecialidades() {
    return (<FormArray>this.cadastroForm.get('especialidades')).controls;
  }
}
