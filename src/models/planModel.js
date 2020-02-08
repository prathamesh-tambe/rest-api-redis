export const planSchema = {
        id : "/planCostShares",
        type : Object,
        properties : {
            planCostShares : { 
                type : Object,
                properties : {
                    deductible:{ "type" : "Integer"},
                    _org: { "type" : "String"},
                    copay: { "type" : "Integer"},
                    objectId: { "type" : "String"},
                    objectType: { "type" : "String"}
                },
                required : ["deductible","_org","copay","objectId","objectType"]
            },
            linkedPlanServices : { 
                type : Array,
                items : {
                    type : Object,
                    properties : {
                        linkedService:{ 
                            type: Object,
                            properties:{
                                _org:  { "type" : "String"},
                                objectId:  { "type" : "String"},
                                objectType:  { "type" : "String"},
                                name:  { "type" : "String"}    
                            },
                            required : ["name","_org","objectId","objectType"]
                        },
                        planserviceCostShares: { 
                            type : Object,
                            properties: {
                                deductible: { "type" : "Integer"},
                                _org: { "type" : "String"},
                                copay: { "type" : "Integer"},
                                objectId: { "type" : "String"},
                                objectType: { "type" : "String"}
                            },
                            required : ["deductible","_org","copay","objectId","objectType"]
                        },
                        _org: { "type" : "String"},
                        objectId: { "type" : "String"},
                        objectType: { "type" : "String"}
                    },
                    required : ["linkedService","planserviceCostShares","_org","objectId","objectType"]
                }
            },
            _org: { "type" : "String"},
            objectId: { "type" : "String"},
            objectType: { "type" : "String"},
            planType: { "type" : "String"},
            creationDate: { "type" : "String"}
        },
        required : ["planCostShares","linkedPlanServices","_org","objectId","objectType","planType","creationDate"]
};