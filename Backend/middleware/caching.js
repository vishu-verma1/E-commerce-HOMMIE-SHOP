const NodeCache = require("node-cache");
const myCache = new NodeCache({stdTTL:60});


const cacheMiddleware = (req, res, next)=>{

  
    const key = req.originalUrl;
    const cachedResponse = myCache.get(key);
    
    if(cachedResponse)
    {
        // console.log("catche Hit");
        res.setHeader("X-Cache", "HIT");
        return res.send(cachedResponse);
    }

    // console.log("catche MIS")

    res.setHeader("X-Cache", "MIS");
    
    const originalSend = res.send.bind(res);
    res.send = (body)=>{
        myCache.set(key, body);
        originalSend(body);
    };


    next();

}


module.exports =  cacheMiddleware