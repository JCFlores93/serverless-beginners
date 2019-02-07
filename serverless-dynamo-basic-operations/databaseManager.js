'use strict'

const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = process.env.ITEMS_DYNAMO_TABLE

module.export.saveItem = async item => {
    const params = {
         TableName: TABLE_NAME,
         Item: item
    }
    let item
    try { 
        item = await dynamo.put(params).promise()
    }catch(e){
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
    return item.itemId
}

module.export.getItem = async itemId => {
    const params = {
        Key: { 
            itemId: itemId
        },
         TableName: TABLE_NAME
    }

    let item
    try { 
        item = await dynamo.get(params).promise()
    }catch(e){
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
    return item.Item
}

module.export.deleteItem = async itemId => {
    const params = {
        Key: { 
            itemId: itemId
        },
         TableName: TABLE_NAME
    }

    let item
    try { 
        item = await dynamo.delete(params).promise()
    }catch(e){
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
    return item
}

module.export.updateItem = async (itemId, paramsName, paramsValue) => {
    const params = {
        Key: { 
            itemId
        },
         TableName: TABLE_NAME,
         ConditionExpression: 'attribute_exists(imteId)',
         UpdateExpression: 'set ' + paramsName + " = :v",
         ExpressionAttributes: { 
             ':v': paramsValue
         },
         ReturnValues: 'ALL_NEW'
    }

    let item
    try { 
        item = await dynamo.update(params).promise()
    }catch(e){
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
    return item.Attributes
}