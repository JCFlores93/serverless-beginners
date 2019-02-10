'use strict'

const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = process.env.ITEMS_DYNAMO_TABLE

module.export.saveItem = item => {
    const params = {
         TableName: TABLE_NAME,
         Item: item
    }
    return dynamo.put(params).promise().then(() => {
        return item.itemId
    })

    // let item1
    // try { 
    //     item1 = await dynamo.put(params).promise()
    // }catch(e){
    //     console.log('====================================');
    //     console.log(e);
    //     console.log('====================================');
    // }
    // return item1.itemId
}

module.export.getItem = itemId => {
    const params = {
        Key: { 
            itemId: itemId
        },
         TableName: TABLE_NAME
    }
    return dynamo.get(params).promise().then(result => {
        return result.Item
    })
}

module.export.deleteItem =itemId => {
    const params = {
        Key: { 
            itemId: itemId
        },
         TableName: TABLE_NAME
    }

    return dynamo.delete(params).promise()
}

module.export.updateItem = (itemId, paramsName, paramsValue) => {
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
    return dynamo.update(params).promise().then(response => {
        return response.Attributes
    })
}