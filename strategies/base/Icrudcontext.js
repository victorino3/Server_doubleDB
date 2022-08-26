
//Extending all methods of the base class ERROR
class NotimplementedException extends Error {
    constructor(){
        super("ERROR: Not implemented functionality");
    };


};



class Icrud {

    Create(item){
        throw new NotimplementedException
    }

    read(item){
        throw new NotimplementedException

    }
    update(id,item){
        throw new NotimplementedException

    }
    delete(id){
        throw new NotimplementedException
    }
    Isconnected() {
        throw new NotimplementedException
    }
    readAll(name,skip,limit){
        throw new NotimplementedException
    }
    deleteUser(query) {
        throw new NotimplementedException
    };
};

module.exports = Icrud