import {addNewPlan,getPlans,getContactsWithId,updateContact,deleteContact} from '../controllers/planController';

const routes = (app) =>{
    app.route('/plan')
        .get(getPlans)
        .post(addNewPlan);        
    
    app.route('/plan/:planId')
        .get(getContactsWithId)
        /*.put((req,res,next) => {
            console.log("This is middleware request");
            console.log(`Request from : ${req.originalUrl}`);
            console.log(`Request from : ${req.method}`);
            next();
        },updateContact)*/
        .delete(deleteContact);        

} 

export default routes;