const { andWhere } = require('../db/dbconfig');
const db = require('../db/dbconfig')


module.exports = {
	findUser,
  addUser,
  searchUser,
  usersExist,
  update_user
}

function findUser(filter){
	return  db('users').where(filter);
}

function usersExist(from,to){
  return db('users')
  .where(from)
  .orWhere(to)
  
}


function searchUser(filter){
  return  db('users')
  .where('users.username', "<>", `${filter.username}`)
  .andWhere('users.username',"like", `${filter.receiver}%`)
  .select('users.username')
}



function addUser(user) {
    return db('users')
      .insert(user)
      .then(id =>{
         return {username:user.username}
    });
}


function update_user(username,chatted_last) {
  return db("users")
    .where({username})
    .update({chatted_last})
    .then(result=>{
        return {success:'pass'}
  })
}