class Egreso extends Dato{
    
    static egresoId = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Egreso.egresoId;
    }

    get getId(){
        return this._id;
    }
}