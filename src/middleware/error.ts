import { NextFunction, Request,Response } from "express";

export default function catchAllErrors(err:Error,req:Request,res:Response,next:NextFunction){
    console.log('Unhandled Error caught')
    console.error(err)
    return res.status(500).json({ error:  "Something went wrong"  })
  }

  export function errorHandler(err:Error,req:Request,res:Response,next:NextFunction){
    console.log(err)
    return res.status(500).json({ error:  `An error occured for the ${req.method} request to users`  })
  }