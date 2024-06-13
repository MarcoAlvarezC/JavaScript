document.addEventListener('DOMContentLoaded', (event) => {
    let nombre = prompt("Bienvenido!!! , ingresa su nombre de usuario:")
    let bienvenido = document.getElementById("bienvenido")
    bienvenido.innerText = "Bienvenido " + nombre
    alert("Este Programa tiene como objetivo ingresar las entradas y salidas de cada producto existente para calcular el existente actual")
    let e1 = prompt("Ingrese la entrada del motor1peladora");
    let s1 = prompt("Ingrese la salida del motor1peladora");
    let e2 = prompt("Ingrese la entrada del motor2peladora");
    let s2 = prompt("Ingrese la salida del motor2peladora");
    let e3 = prompt("Ingrese la entrada del motor3peladora");
    let s3 = prompt("Ingrese la salida del motor3peladora");
    let Categoria1 = [
        {id: "motor1peladora", entrada: e1, salida: s1},
        {id: "motor2peladora", entrada: e2, salida: s2},
        {id: "motor3peladora", entrada: e3, salida: s3}
    ];
    let Categoria2 = [
        {id: "Union3/4", entrada: 9, salida: 7},
        {id: "Codo1/2", entrada: 190, salida: 100},
        {id: "Reducción de 2a4", entrada: 10, salida: 0}
    ];
    
    function diferencia(entrada, salida) {
        return entrada - salida;
    }

    function OrganizacionArray(Categoria){
        Categoria.forEach(element => {
            element.existente = diferencia(element.entrada, element.salida);
        });

        Categoria.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
    }

    OrganizacionArray(Categoria1);
    OrganizacionArray(Categoria2);

    let tableBody = document.getElementById('table-body');
    
    function llenarTabla(categoria) {
        categoria.forEach(producto => {
            let row = document.createElement('tr');

            let cellProducto = document.createElement('td');
            cellProducto.textContent = producto.id;
            row.appendChild(cellProducto);

            let cellEntrada = document.createElement('td');
            cellEntrada.textContent = producto.entrada;
            row.appendChild(cellEntrada);

            let cellSalida = document.createElement('td');
            cellSalida.textContent = producto.salida;
            row.appendChild(cellSalida);

            let cellExistente = document.createElement('td');
            cellExistente.textContent = producto.existente;
            row.appendChild(cellExistente);

            tableBody.appendChild(row);
        });
    }

    llenarTabla(Categoria1);
    llenarTabla(Categoria2);

    let info = document.getElementById('info');
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString();
    let formattedTime = currentDate.toLocaleTimeString();
    info.textContent += ` Fecha y hora de ingreso: ${formattedDate} ${formattedTime}`;
});