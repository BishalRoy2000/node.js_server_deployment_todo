// jodi javascript er normal error classs use kore next() er modhe error pass kori tahole okhane sudhu err message send kora jbe......status code send kora jabe na tai nijer akta error class baniye nilam.... next() er modhe jokhon error pathabo tokhon ai error class ta call korbo....

class errorHandler extends Error{ // orginal error class ke inherit korlam...ai class a 
    constructor(message,statusCode){ // constructor function call korlam duto argument diye....
        super(message); // super keyword use kore parent class er constructer a message ke pass korlam....
        this.statusCode=statusCode; // ai class er constructor a status code pass korlam....
    }
}



export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error"; // next call kore jodi blank error di,...kono error message na di....tahole ai line ta cholbe....
    err.statusCode=err.statusCode || 500;
    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

export default errorHandler;