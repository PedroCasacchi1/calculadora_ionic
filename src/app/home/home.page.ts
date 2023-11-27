import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado: string = "0";
  memoria: string = "";
  verifica_zero: boolean = true;
  operador_inserido: boolean = false;
  is_segundo_elemento: boolean = false;
  primeiro_elemento: string = "";
  segundo_elemento: string = "";
  operador: string = "";
  is_novo_calculo: boolean = false;

  
  constructor() { }

  digitos(valor: string) {
    if (this.is_novo_calculo) {
      this.resetar();
      if(this.is_segundo_elemento){
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    } else {
      if(this.is_segundo_elemento){
        this.segundo_elemento += valor;
        this.resultado += valor;
      } else {
        if (this.verifica_zero) {
          this.resultado = valor;
          this.verifica_zero = false;
        } else {
          this.resultado += valor;
        }
      }
    }

  }

  operadores(operador: string) {
    if (!this.operador_inserido && this.verifica_zero == false) {
      this.primeiro_elemento = this.resultado;
      this.resultado += operador;
      this.operador_inserido = true;
      this.operador = operador;
      this.is_segundo_elemento = true;
    }
  }
  calcular() {
  if (this.is_novo_calculo) {
    this.resetar();
    this.primeiro_elemento = this.resultado;
    this.resultado += this.operador;
    this.operador_inserido = true;
    this.operador = this.operador;
    this.is_segundo_elemento = true;
    this.is_novo_calculo = false; // Definindo para falso após usar novo cálculo
  } else {
    if (this.operador == "+" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
    } else if (this.operador == "-" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
    } else if (this.operador == "*" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
    } else if (this.operador == "/" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
    } else if (this.operador == "√") {
      this.resultado = (Math.sqrt(parseFloat(this.primeiro_elemento))).toString();
    } else if (this.operador == "²") {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.primeiro_elemento)).toString();
    } else if (this.operador == "%") {
      if (this.segundo_elemento != "") {
        this.resultado = (parseFloat(this.primeiro_elemento) / 100 * parseFloat(this.segundo_elemento)).toString();
      } else {
        this.resultado = (parseFloat(this.primeiro_elemento) / 100).toString();
      }
    } else {
      if (this.operador == "") {
        alert("Nenhum operador foi selecionado.")
      } else {
        alert("O segundo elemento não foi definido.")
      }
    }
    this.memoria = this.primeiro_elemento + this.operador + this.segundo_elemento + "=" + this.resultado;
    this.primeiro_elemento = this.resultado;
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.segundo_elemento = "";
  }
}


  backspace() {
    if (this.resultado.length > 0) {
      this.resultado = this.resultado.slice(0, -1);
      if (this.resultado.endsWith('+') || this.resultado.endsWith('-') || this.resultado.endsWith('*') || this.resultado.endsWith('/')) {
        this.operador_inserido = false;
        this.is_segundo_elemento = false;
        this.operador = '';
      }
    }
  }

  resetar() {
    this.resultado = "0";
    this.verifica_zero = true;
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operador = "";
    this.is_novo_calculo = false;
  }
}
