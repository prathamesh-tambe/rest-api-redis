import schema from 'jsonschema';
import redis from 'redis';
import etag from 'etag';

var client = redis.createClient();
import { planSchema } from '../models/planModel';

const Plan = schema.Validator;
const schemaValidator = new Plan();

export const addNewPlan = (req,res) => {
    schemaValidator.addSchema(planSchema, '/planCostShares');
    //console.log(req.body);
    var validate = schemaValidator.validate(req.body, planSchema);
    if(validate.errors.length > 0){
        var errmsg = [];
        validate.errors.forEach(element => {
            errmsg.push(element.stack);
        });
        res.send(errmsg);
    }
    let reqId = JSON.stringify(req.body.planCostShares.objectId);    
    let reqBody = JSON.stringify(req.body);
    var rep = client.hset("plans",reqId, reqBody, redis.print);
    if(rep){
        res.setHeader('ETag', etag(reqBody))
        res.json({'message':'Object created Successfully'});
    }    
}

export const getPlans = (req,res) => {
    /*client.hgetall("plans", function (err, obj) {
        res.json(obj);
        //client.quit();
    });*/
    client.hkeys("plans", function (err, replies) {
        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
            //console.log(JSON.parse(reply));
            //res.json(JSON.parse(reply));    
        });
        //client.quit();
    });
}

export const getContactsWithId = (req,res) => {
    client.hget("plans",req.params.planId, function(error, result) {
        if (error){
            throw error;
        }else{
            console.log("----",result,req.params.planId.trim());
            if(result == null){
                res.status(204).json({'message':'No Content'});
            }else{
                res.json(JSON.parse(result));    
            } 
        } 
    });
}

/*export const updateContact = (req,res) => {
    Contact.findOneAndUpdate({_id : req.params.contactId},req.body,{ new:true,useFindAndModify:false }, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    })
}*/

export const deleteContact = (req,res) => {
    client.hdel('plans',req.params.planId, function(error, result) {
        if (error) throw error;
        console.log('GET result ->', result)
        res.json({'message':'Object deleted successfully'});
    });
}