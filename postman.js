let express = require("express");
let axios = require("axios")
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port =2410
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

app.post("/posts",async function(req,res){
    let body= req.body;
    let {url,method,headerKey1,headerKey2,headerKey3,headerValue1,headerValue2,headerValue3} = body;
    let headers= headerKey1 ? {[headerKey1]:headerValue1} : {}
    if(method==="GET"){
       console.log(headers);
        try{
            let response = await axios.get(url,{headers:headers});
            let {data,header} = response;
            console.log(header);
            let data1 = typeof data==="number" ? JSON.stringify(data) : data ;
            let data2={data:data1 , status:200 ,statusText : "OK"}
            res.send(data2); 
        }
        catch(err){
            if(err.response){
                let {status,statusText} =err.response;

                let error = {status : 401 , data:"Not Found" , statusText: "Unauthorized"};
                res.send(error)

            }else res.status(404).send(err)
        }
    }
    if(method==="POST"){
        try{
          let data1= JSON.parse(body.body);
            let response = await axios.post(url,data1 ,{headers:headers});
            let {data} = response;
           
           
           
            let data2={data:data , status:200 ,statusText : "OK"}
            res.send(data2);
        }
        catch(err){
            if(err.response){
                let {status,statusText} =err.response;
                let error={status : 401 , data : "Not Found",statusText: "Unauthorized" }

                res.send(error)
            }else res.status(404).send(err)
        }
    }
    if(method==="PUT"){
        try{
          let data1= JSON.parse(body.body);
            let response = await axios.put(url,data1 ,{headers:headers});
            let {data} = response;
           
            let data2={data:data , status:200 ,statusText : "OK"}
           
            res.send(data2);
        }
        catch(err){
            if(err.response){
                let {status,statusText} =err.response;
                let error={status : 401 , message : "Not Found",statusText: "Unauthorized"}

                res.send(error)
            }else res.status(404).send(err)
        }
    }
    if(method==="DELETE"){
        try{
          
            let response = await axios.delete(url ,{headers:headers});
            let {data} = response;
           console.log(data);
            let data2={data:data , status:200 ,statusText : "OK"}
          
            res.send(data2);
        }
        catch(err){
            if(err.response){
                let {status,statusText} =err.response;
                let error={status : 401 , message : "Not Found",statusText: "Unauthorized"}

                res.send(error)
            }else res.status(404).send(err)
        }
    }

})