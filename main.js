
let suma = 0;
let i = 1; 
function pagar (item){
    let c = 0;
    if(item == 1){
        c = 3400
    }
    else if(item == 2){
        c = 28000
    }
    else if (item == 3){
        c = 54000
    }
    else if (item == 0){
        alert("Tu Compra a terminado Satisfatoriamente")
    }
    else{
        alert("El numero ingresado no corresponde al menu")
    }
return c
}

let bienvenido = prompt("Bienvenido A la Tienda virtual 'Ingeniería A la Medida', Ingresa tu nombre Porfavor")
while(i!=0){
    let menu = prompt(
         bienvenido + ",\n" +
        "¿Deseas comprar algun producto?\n" +
        "Escoge el ítem asociado a tu compra:\n\n" +
        "0) SALIR\n" +
        "1) ESP32\n" +
        "2) MOTORREDUCTOR24Vdc\n" +
        "3) ARDUINO_UNO"
      );   
    i = menu;
    suma = pagar(menu) + suma ;
    alert("Tú compra tiene un costo total Neto de: " + suma) ;
    
}

