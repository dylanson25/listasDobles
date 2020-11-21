var code = document.getElementById("iptCod")
var nom = document.getElementById("iptNom")
var desc = document.getElementById("iptDes")
var cant = document.getElementById("iptCant")
var cost = document.getElementById("iptCost")
var codeB = document.getElementById("iptCodeB")
var busCod = document.getElementById("iptBuscar")
var borrarP = document.getElementById('iptBorrarPrimero')

class Producto {
    constructor(codigo, nombre, descripcion, cantidad, costo) {
        this._codigo = codigo
        this._nombre = nombre
        this._descripcion = descripcion
        this._cantidad = cantidad
        this._costo = costo
        this._siguiente = null
        this._anterior = null
    }
    MSiguiente() {
        return this._siguiente
    }
    MAnterior() {
        return this._anterior
    }
    MCodigo() {
        return this._codigo
    }
    CSiguiente(siguiente) {
        this._siguiente = siguiente
    }
    CAnterior(anterior) {
        this._anterior = anterior
    }
    mostrar(producto) {
        return this._codigo + ' ' + this._nombre + ' ' + this._descripcion + ' ' + this._cantidad + ' ' + this._costo
    }
}
class Almacen {
    constructor() {
        this._inicio = null
        this._final = null
    }
    addProduct(producto) {
        if (this._inicio === null) {
            this._inicio = producto
        }
        else if (this._inicio.MCodigo() > producto.MCodigo()) {
            let aux = this._inicio
            this._inicio = producto
            this._inicio.CSiguiente(aux)
            aux.CAnterior(this._inicio)
        }
        else {
            let aux, aux2
            aux = this._inicio
            while (aux.MSiguiente() != null && aux.MSiguiente().MCodigo() < producto.MCodigo()) {
                aux = aux.MSiguiente()
            }

            if (aux.MSiguiente() === null) {
                aux.CSiguiente(producto)
                producto.CAnterior(aux)
                this._final = producto
            } else {
                aux2 = aux.MSiguiente()
                aux.CSiguiente(producto)
                aux2.CAnterior(producto)
                producto.CSiguiente(aux2)
                producto.CAnterior(aux)
            }
        }
        return true
    }
    buscarProducto(codigo) {
        if (this._inicio === null) {
            return false
        }
        else if (this._inicio.MCodigo() == codigo) {
            return this._inicio
        }
        else {
            let aux = this._inicio
            while (aux.MSiguiente() != null && aux.MSiguiente().MCodigo() != codigo) {
                aux = aux.MSiguiente()
            }
            if (aux.MSiguiente() === null) {
                return false
            } else {
                return aux.MSiguiente()
            }
        }
    }
    borrarProducto(codigo) {
        let producto = this.buscarProducto(codigo), aux
        if (producto === false) {
            return false
        } else if (this._inicio.MCodigo() === codigo) {
            if (this._inicio.MSiguiente() != null) {
                this._inicio = this._inicio.MSiguiente()
                this._inicio.CAnterior(null)
            } else {
                this._inicio = null
            }
        } else if (producto.MSiguiente() != null) {
            aux = producto.MAnterior()
            aux.CSiguiente(producto.MSiguiente())
            aux.MSiguiente().CAnterior(aux)

            producto.CAnterior(null)
            producto.CSiguiente(null)
        } else {
            aux = producto.MAnterior()
            aux.CSiguiente(producto.MSiguiente())

            producto.CAnterior(null)
            producto.CSiguiente(null)
        }
        return producto
    }
    listar() {
        if (this._inicio === null) {
            return false
        } else {
            let aux = this._inicio
            let ls2 = document.querySelector('#listaForm')
            while (aux != null) {
                let objeto = document.createElement('li')
                objeto.textContent = aux.mostrar()
                ls2.appendChild(objeto)
                aux = aux.MSiguiente()
            }
            return true
        }
    }
    listarInver() {
        if (this._inicio === null) {
            return false
        } else if (this._final === null) {
            let ls2 = document.querySelector('#listaForm2')
            let objeto = document.createElement('li')
            objeto.textContent = this._inicio.mostrar()
            ls2.appendChild(objeto)
            return true
        } else {
            let aux = this._final 
            let ls2 = document.querySelector('#listaForm2')
            while (aux != null) {
                let objeto = document.createElement('li')
                objeto.textContent = aux.mostrar()
                ls2.appendChild(objeto)
                aux = aux.MAnterior()
            }
            return true
        }
    }
    borrarPrimero(){
        if(this._inicio === null){
            return false
        }else{
            this._inicio = this._inicio.MSiguiente()
            if(this._inicio != null){
                this._inicio.CAnterior(null)
            }
            return this._inicio
        }
    }
}

var Bodega1 = new Almacen()
btnAgregar.addEventListener('click', () => {
    let newProduct = new Producto(code.value, nom.value, desc.value, cant.value, cost.value)
    Bodega1.addProduct(newProduct)
    alert('Producto agregado')
})

btnBorrar.addEventListener('click', () => {
        let x = Bodega1.borrarProducto(codeB.value)
    if (x === false) {
        alert('El elemento no existe')
    } else (
        alert(x.mostrar())
    )
})

btnBuscar.addEventListener('click', () => {
    let x = Bodega1.buscarProducto(busCod.value)
    if (x === false) {
        alert('el producto no exixte')
    } else {
        alert(x.mostrar())
    }
})

btnRecuperar.addEventListener('click', () => {
    if (Bodega1.listar() === false) {
        alert('No hay productos que mostrar')
    } else {
        alert('producto mostrado')
    }
})

btnRinverso.addEventListener('click', () => {
    if (Bodega1.listarInver() === false) {
        alert('No hay productos que mostrar')
    } else {
        alert('producto mostrado')
    }
})
btnEliminarPrimero.addEventListener('click', ()=>{
    x = Bodega1.borrarPrimero()
    if(x === false){
        alert('no hay productos')
    }else{
        alert(x.mostrar())
    }
})
