$(document).ready(function() {
    let $nombre = $("#nombre");
    $nombre.on('input', function() {
        let bienvenido = $("#bienvenido");
        bienvenido.text("Bienvenido " + $nombre.val());
    });

    let $btnmenu = $('#btnmenu');
    $btnmenu.on("click", function() {
        $('#form-container').show();

        $('#product-form').on('submit', function(event) {
            event.preventDefault();
            let productId = $('#product-id').val();
            let productEntrada = parseInt($('#product-entrada').val());
            let productSalida = parseInt($('#product-salida').val());

            let newProduct = {
                id: productId,
                entrada: productEntrada,
                salida: productSalida,
                existente: productEntrada - productSalida
            };

            let Categoria1 = JSON.parse(localStorage.getItem('Categoria1')) || [];
            Categoria1.push(newProduct);

            localStorage.setItem('Categoria1', JSON.stringify(Categoria1));

            mostrarInventario(Categoria1);
        });
    });

    async function fetchData(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }

    $('#load-data').on('click', async function() {
        let data = await fetchData('inventario.json');
        localStorage.setItem('Categoria1', JSON.stringify(data));
        mostrarInventario(data);
    });

    $('#fetch-api').on('click', async function() {
        let data = await fetchData('https://api.example.com/inventario');
        localStorage.setItem('Categoria1', JSON.stringify(data));
        mostrarInventario(data);
    });

    function mostrarInventario(Categoria1) {
        function diferencia(entrada, salida) {
            return entrada - salida;
        }

        function OrganizacionArray(Categoria) {
            Categoria.forEach(element => {
                element.existente = diferencia(element.entrada, element.salida);
            });

            Categoria.sort((a, b) => {
                if (a.id > b.id) {
                    return -1;
                }
                if (a.id < b.id) {
                    return 1;
                }
                return 0;
            });
        }

        OrganizacionArray(Categoria1);

        let $tableBody = $('#table-body');
        $tableBody.empty();

        Categoria1.forEach((producto, index) => {
            let $row = $('<tr></tr>');

            $row.append(`<td>${producto.id}</td>`);
            $row.append(`<td>${producto.entrada}</td>`);
            $row.append(`<td>${producto.salida}</td>`);
            $row.append(`<td>${producto.existente}</td>`);

            let $editInput = $('<input type="number" value="' + producto.salida + '">');
            $editInput.on('change', function(event) {
                producto.salida = parseInt($editInput.val());
                producto.existente = diferencia(producto.entrada, producto.salida);
                localStorage.setItem('Categoria1', JSON.stringify(Categoria1));
                mostrarInventario(Categoria1);
            });
            $row.append($('<td></td>').append($editInput));

            let $deleteButton = $('<button class="btn btn-danger">Eliminar</button>');
            $deleteButton.on('click', function() {
                Categoria1.splice(index, 1);
                localStorage.setItem('Categoria1', JSON.stringify(Categoria1));
                mostrarInventario(Categoria1);
            });
            $row.append($('<td></td>').append($deleteButton));

            $tableBody.append($row);
        });

        let $info = $('#info');
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleDateString();
        let formattedTime = currentDate.toLocaleTimeString();
        $info.text(`Fecha y hora de ingreso: ${formattedDate} ${formattedTime}`);
    }

    if (localStorage.getItem('Categoria1')) {
        let Categoria1 = JSON.parse(localStorage.getItem('Categoria1'));
        mostrarInventario(Categoria1);
    }
});
