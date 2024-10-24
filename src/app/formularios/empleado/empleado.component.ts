import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  horasPagar?: number;
  horasExtras?: number;
  subTotal?: number;
}

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './empleado.component.html'
})
export default class EmpleadoComponent implements OnInit {
  formGroup!: FormGroup;
  empleados: Empleado[] = [];
  matriculaParaModificar: string | null = null;
  mostrarTabla = false;
  mostrarBuscador = false;
  matriculaBusqueda = '';
  total: number = 0;  // Nueva variable para almacenar el total de subtotales

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarEmpleados();
  }

  inicializarFormulario(): void {
    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', Validators.required],
      horasTrabajadas: ['', Validators.required],
    });
  }

  cargarEmpleados(): void {
    const empleadosGuardados = localStorage.getItem('empleados');
    this.empleados = empleadosGuardados ? JSON.parse(empleadosGuardados) : [];
  }

  registrarEmpleado(): void {
    const nuevoEmpleado = this.formGroup.value as Empleado;
    nuevoEmpleado.edad = parseInt(nuevoEmpleado.edad.toString());
    nuevoEmpleado.horasTrabajadas = parseInt(nuevoEmpleado.horasTrabajadas.toString());

    this.cargarEmpleados();

    this.matriculaParaModificar
      ? this.actualizarEmpleado(nuevoEmpleado)
      : this.agregarNuevoEmpleado(nuevoEmpleado);

    this.guardarEmpleados();
    this.resetFormulario();
  }

  actualizarEmpleado(empleadoModificado: Empleado): void {
    const index = this.empleados.findIndex(e => e.matricula === this.matriculaParaModificar);
    if (index !== -1) {
      this.empleados[index] = { ...empleadoModificado };
    } else {
      alert('No se pudo modificar el empleado, matrícula no encontrada.');
    }
  }

  agregarNuevoEmpleado(nuevoEmpleado: Empleado): void {
    this.empleados.push(nuevoEmpleado);
  }

  guardarEmpleados(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  resetFormulario(): void {
    this.formGroup.reset();
    this.matriculaParaModificar = null;
    this.mostrarBuscador = false;
  }

  buscarParaModificar(): void {
    const empleado = this.empleados.find(e => e.matricula === this.matriculaBusqueda);
    if (empleado) {
      this.formGroup.patchValue(empleado);
      this.matriculaParaModificar = empleado.matricula;
      this.matriculaBusqueda = '';
      this.mostrarBuscador = false;
    } else {
      alert('Empleado no encontrado.');
    }
  }

  buscarYEliminar(): void {
    const index = this.empleados.findIndex(e => e.matricula === this.matriculaBusqueda);
    if (index !== -1) {
      this.empleados.splice(index, 1);
      this.guardarEmpleados();
      this.matriculaBusqueda = '';
      alert('Empleado eliminado correctamente.');
    } else {
      alert('Empleado no encontrado.');
    }
  }

  imprimirTabla(): void {
    this.empleados = this.empleados.map(empleado => {
      const horasNormales = Math.min(empleado.horasTrabajadas, 40);
      const horasExtras = Math.max(empleado.horasTrabajadas - 40, 0);
      const subTotal = (horasNormales * 70) + (horasExtras * 140);
      return {
        ...empleado,
        horasPagar: horasNormales * 70,
        horasExtras: horasExtras * 140,
        subTotal,
      };
    });

    // Calcular el total sumando los subtotales de cada empleado
    this.total = this.empleados.reduce((sum, empleado) => sum + (empleado.subTotal || 0), 0);

    this.mostrarTabla = true;
  }

  
  activarBuscador(): void {
    this.mostrarBuscador = true;
  }
}
