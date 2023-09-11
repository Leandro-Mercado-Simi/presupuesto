class Ingreso extends Dato{
    static ingresoID = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Ingreso.ingresoID;
    }

    get getId(){
        return this._id;
    }
}