import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resistencia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencia.component.html',
  styles: ``
})
export default class ResistenciaComponent implements OnInit {
  colors: string[] = ['Negro', 'Café', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
  colorCodes: { [key: string]: string } = {
    'Negro': 'black', 'Café': '#8B4513',
    'Rojo': 'red', 'Naranja': 'orange',
    'Amarillo': 'yellow', 'Verde': 'green',
    'Azul': 'blue', 'Violeta': 'violet',
    'Gris': 'gray', 'Blanco': 'white'
  };

  formulario!: FormGroup;
  valor: number = 0;
  valorMaximo: number = 0;
  valorMinimo: number = 0;
  resultado: boolean = false;
  registros: any[] = [];

  ngOnInit(): void {
    this.formulario = new FormGroup({
      color1: new FormControl('', Validators.required),
      color2: new FormControl('', Validators.required),
      color3: new FormControl('', Validators.required),
      tolerancia: new FormControl('', Validators.required)
    });
    // Cargar registros almacenados localmente
    const datosGuardados = localStorage.getItem('registros');
    if (datosGuardados) {
      this.registros = JSON.parse(datosGuardados);
    }
  }

  calcular(): void {
    const color1 = this.formulario.get('color1')?.value;
    const color2 = this.formulario.get('color2')?.value;
    const color3 = this.formulario.get('color3')?.value;
    const tolerancia = this.formulario.get('tolerancia')?.value;

    // Guardar el registro sin calcular aún
    const nuevoRegistro = {
      color1, color2, color3, tolerancia,
      valor: 0,
      valorMaximo: 0,
      valorMinimo: 0
    };
    this.registros.push(nuevoRegistro);
    localStorage.setItem('registros', JSON.stringify(this.registros));
    
    this.resultado = false; // Evitar mostrar el resultado inmediatamente
    this.formulario.reset(); // Reiniciar el formulario
  }

  imprimirTabla(): void {
    // Calcular valores antes de mostrar la tabla
    this.registros.forEach((registro) => {
      const valorColor1 = this.colors.indexOf(registro.color1);
      const valorColor2 = this.colors.indexOf(registro.color2);
      const multiplicador = Math.pow(10, this.colors.indexOf(registro.color3));

      if (valorColor1 !== -1 && valorColor2 !== -1 && multiplicador !== -1) {
        // Calcular el valor de la resistencia
        registro.valor = (valorColor1 * 10 + valorColor2) * multiplicador;

        // Determinar el factor de tolerancia
        const toleranceFactor = registro.tolerancia === 'oro' ? 0.05 : 0.10;

        // Calcular los valores mínimo y máximo
        registro.valorMaximo = registro.valor * (1 + toleranceFactor);
        registro.valorMinimo = registro.valor * (1 - toleranceFactor);
      }
    });

    this.resultado = true; // Mostrar la tabla al presionar el botón
  }

  getColorCode(color: string): string {
    return this.colorCodes[color] || 'transparent';
  }

  getToleranceColor(tolerancia: string): string {
    if (tolerancia === 'oro') {
      return 'gold';
    } else if (tolerancia === 'plata') {
      return 'silver';
    }
    return 'transparent';
  }
}
