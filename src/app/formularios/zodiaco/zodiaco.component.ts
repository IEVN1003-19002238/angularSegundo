import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})
export default class ZodiacoComponent {
  formulario!: FormGroup;
  resultado: any = null;
 
  signosZodiacales = this.getSignosZodiacales(); // Mover los signos a un método separado
 
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }
 
  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      sexo: ['', Validators.required]
    });
  }
 
  onSubmit() {
    if (this.formulario.valid) {
      this.procesarFormulario();
    }
  }
 
  procesarFormulario() {
    const { nombre, apaterno, amaterno, dia, mes, anio, sexo } = this.formulario.value;
    const edad = this.calcularEdad(dia, mes, anio);
    const signoZodiacal = this.obtenerSignoZodiacal(anio);
    this.resultado = this.crearResultado(nombre, apaterno, amaterno, edad, signoZodiacal);
  }
 
  crearResultado(nombre: string, apaterno: string, amaterno: string, edad: number, signoZodiacal: any) {
    return {
      nombre,
      apaterno,
      amaterno,
      edad,
      signoZodiacal: signoZodiacal ? signoZodiacal.signo : 'No encontrado',
      imgSigno: signoZodiacal ? signoZodiacal.img : 'ruta_imagen_default'
    };
  }
 
  calcularEdad(dia: number, mes: number, anio: number): number {
    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const diferenciaMs = Date.now() - fechaNacimiento.getTime();
    const edadFecha = new Date(diferenciaMs);
    return Math.abs(edadFecha.getUTCFullYear() - 1970);
  }
 
  obtenerSignoZodiacal(anio: number) {
    return this.signosZodiacales.find(signo => signo.años.includes(anio));
  }
 
  getSignosZodiacales() {
    return [
      { signo: 'Rata', img: 'https://www.clarin.com/2023/09/23/SrOtpEeIU_360x240__1.jpg', años: [1912, 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020] },
      { signo: 'Buey', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSGrFUvYT68aVAMAaToJ23wef4vxKbv8Moxw&s', años: [1913, 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021] },
      { signo: 'Tigre', img: 'https://imgmedia.larepublica.pe/640x371/larepublica/migration/images/2W5EBLZYLZG2PLFN4XEZHFSSFM.webp', años: [1914, 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022] },
      { signo: 'Conejo', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeSZA9a_iMd9QMldlGrs_W_yyBWXChzkpo2A&s', años: [1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023] },
      { signo: 'Dragón', img: 'https://peopleenespanol.com/thmb/blSccuj1LqAcyBOI-SNWH1k_9LE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165942305-2000-8fe379790e0e4ccba8ea80e33697647e.jpg', años: [1916, 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024] },
      { signo: 'Serpiente', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWgJ8UtCLnTBELXvtlWwij9F7rWCc335pdEw&s', años: [1917, 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025] },
      { signo: 'Caballo', img: 'https://www.clarin.com/2023/09/23/mK2ciWGXe_2000x1500__1.jpg', años: [1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026] },
      { signo: 'Cabra', img: 'https://www.hola.com/horizon/landscape/e13172afb3f6-cabra.jpg?im=Resize=(640),type=downsize', años: [1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027] },
      { signo: 'Mono', img: 'https://peopleenespanol.com/thmb/Wpxezb6zTd3sJ4sB90GtyUfFPpo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165967347-2000-141e78d49c344d73a216c09df52f7fcb.jpg', años: [1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028] },
      { signo: 'Gallo', img: 'https://revistasocialmente.mx/wp-content/uploads/2017/02/gallo-fondo-blanco-1024x915.jpg', años: [1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029] },
      { signo: 'Perro', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2-0PDXeDGlp71cxA05l6kWjub7Pv33focWQ&s', años: [1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030] },
      { signo: 'Cerdo', img: 'https://peopleenespanol.com/thmb/3_4ezJWMT8DtQSEuV5vMg3X8DUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165969332-2000-eea5e27d3f4145c9b01121f4c61ccaef.jpg', años: [1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031] }
    ];
  }
 
}
