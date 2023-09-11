const ingresos = [
    new Ingreso('Venta', 3500),
    new Ingreso('Comisión', 1350)
];

const egresos = [
    new Egreso('Compra insumos', 900),
    new Egreso('Pago proveedores', 1200)
];

// Función para cargar todos los elementos js en la carga de la página html
let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

// Función para iterar en todos los elementos del arreglo ingresos y sumar el valor de cada uno
let totalIngresos = () =>{
    let ingresosTotales = 0;
    for (let ingreso of ingresos) {
        ingresosTotales += ingreso.getValor;
        
    }
    return ingresosTotales;    
}

// Función para iterar en todos los elementos del arreglo egresos y sumar el valor de cada uno
let totalEgresos = () =>{
    let egresosTotales = 0;
    for (let egreso of egresos) {
        egresosTotales += egreso.getValor;
    }
    return egresosTotales;
}
// duda, por qué me deja ingresar al atributo valor del objeto Dato(ingreso o egreso), si no utilizo los
// métodos getter and setter en las llamadas??
// Función para inicializar los datos del presupuesto
let cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentaje = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentaje);

}

let formatoMoneda = (cifra) => {
    return cifra.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits:2});
}

let formatoPorcentaje = (cifra) =>{
    return cifra.toLocaleString('en-US', {style:'percent', minimumFractionDigits: 2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ing of ingresos) {
        ingresosHTML += crearIngresoHtml(ing);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHtml = (ingreso) =>{
    let ingresoHtml = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.getDescripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.getValor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarIngreso(${ingreso.getId})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return ingresoHtml;
}

const eliminarIngreso = (idBuscado) => {
    // findIndex recibe como parámetro una función flecha en la que se buscan las coincidencias con cada uno
    // de los elementos del arreglo que se está iterando (funciona como un for of)

    // findIndex busca en el arreglo el índice en el que exista la coincidencia con el parámetro que recibe la función
    let indiceEliminar = ingresos.findIndex(ingreso => {ingreso.getId === idBuscado});
    // Esta función, recibe la posición del array que se quiere remover, y en segundo parámetro recibe 
    // la cantidad de elementos que se van a quitar del arreglo desde el indice encontrado
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}


const cargarEgresos = () => {
    let egresosTxt = '';
    for (let egreso of egresos) {
        egresosTxt += crearEgresosHtml(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosTxt;
}

const crearEgresosHtml = (egreso) => {
    let egresoHtml = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.getDescripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.getValor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.getValor / totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarEgreso(${egreso.getId})' ></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresoHtml;
}

const eliminarEgreso = (idBuscado) => {
    let indice = egresos.findIndex(objetoEgreso => {objetoEgreso.getId === idBuscado});
    egresos.splice(indice, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () => {
    let formulario = document.forms['formulario'];
    let tipo = formulario['tipo'].value;
    let descripcion = formulario['descripcion'].value;
    let valor = formulario['valor'].value;

    if (descripcion !== '' && valor !== '') {
        if(tipo === 'ingreso'){
            ingresos.push(
                new Ingreso(descripcion, Number(valor))
            );
            alert('Ingreso cargado con éxito!');
            limpiarFormulario();
            cargarCabecero();
            cargarIngresos();
            /* 
            sintaxis simplificada: 
            new Ingreso(descripcion, +valor)
            Este simbolo + detecta si la cadena recibida pertenece a un valor numérico 
            y lo castea automáticamente y si ya es un valor numérico lo deja de la misma forma
            */
        }
        else if(tipo === 'egreso'){
            egresos.push(
                new Egreso(descripcion, +valor)
            );
            alert('Egreso cargado con éxito!');
            limpiarFormulario();
            cargarCabecero();
            cargarEgresos();
        }
    }
}

const limpiarFormulario = () => {
    let formulario = document.forms['formulario'];
    formulario['tipo'].value = '';
    formulario['descripcion'].value = '';
    formulario['valor'].value = '';
}