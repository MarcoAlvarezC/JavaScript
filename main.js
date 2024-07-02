document.addEventListener('DOMContentLoaded', (event) => {
    let input = document.getElementById("nombre");
    input.addEventListener('input', () => {
        let bienvenido = document.getElementById("bienvenido");
        bienvenido.innerText = "Bienvenido " + input.value;
    });

    let boton = document.getElementById('btnmenu');
    boton.addEventListener("click", respuestaClick);

    function respuestaClick() {
        document.getElementById('form-container').style.display = 'block';

        document.getElementById('inventory-form').addEventListener('submit', function(event) {
            event.preventDefault();

            let e1 = document.getElementById('e1').value;
            let s1 = document.getElementById('s1').value;
            let e2 = document.getElementById('e2').value;
            let s2 = document.getElementById('s2').value;
            let e3 = document.getElementById('e3').value;
            let s3 = document.getElementById('s3').value;

            let Categoria1 = [
                { id: "motor1peladora", entrada: e1, salida: s1 },
                { id: "motor2peladora", entrada: e2, salida: s2 },
                { id: "motor3peladora", entrada: e3, salida: s3 }
            ];

            let Categoria2 = [
                { id: "Union3/4", entrada: 9, salida: 7 },
                { id: "Codo1/2", entrada: 190, salida: 100 },
                { id: "Reducción de 2a4", entrada: 10, salida: 0 }
            ];

            // Guardar los datos en localStorage
            localStorage.setItem('Categoria1', JSON.stringify(Categoria1));
            localStorage.setItem('Categoria2', JSON.stringify(Categoria2));

            mostrarInventario(Categoria1, Categoria2);
        });
    }

    function mostrarInventario(Categoria1, Categoria2) {
        function diferencia(entrada, salida) {
            return entrada - salida;
        }

        function OrganizacionArray(Categoria) {
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
        tableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla nuevamente

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
        info.textContent = `Fecha y hora de ingreso: ${formattedDate} ${formattedTime}`;
    }

    if (localStorage.getItem('Categoria1') && localStorage.getItem('Categoria2')) {
        let Categoria1 = JSON.parse(localStorage.getItem('Categoria1'));
        let Categoria2 = JSON.parse(localStorage.getItem('Categoria2'));
        mostrarInventario(Categoria1, Categoria2);
    }
});
