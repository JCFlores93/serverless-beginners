'use strict';

const databaseManager = require('./databaseManager')
const uuidv1 = require('uuid/v1')

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

};

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(
      message)
  }
}

module.exports.saveItem = async (event, context) => {
  const item = JSON.parse(event.body)
  console.log(item)
  item.itemId = uuidv1()
  let response
  try {
    response = await databaseManager.save(item)
  } catch (error) {

  }
  createResponse(200, response)

};

module.exports.getItem = async (event, context) => {
  const item = event.pathParameters.intemId
  console.log(item)
  item.itemId = uuidv1()
  let response
  try {
    response = await databaseManager.save(item)
  } catch (error) {

  }
  createResponse(200, response)

};