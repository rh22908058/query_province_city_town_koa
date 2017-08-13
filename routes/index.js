const router = require('koa-router')()
const data=require('../data.json')
router.prefix('/getData')
//获取所有省份
router.get('/', ctx => {
  let provinces=[]
  data.forEach((item,index)=>{
    let name
    name=item.region.name
    provinces.push(name)
  })
  ctx.body={
    err:0,
    data:provinces
  }
})
//获取pname省下的所有市
router.get('/:pname',ctx=>{
  let pname=ctx.params.pname
  let citys=[]
  let temp=[]
  for(let i=0;i<data.length;i++){
    if(data[i].region.name==pname){
      temp=data[i].region.state
      break
    }
  }
  temp.forEach((item,index)=>{
    citys.push(item.name)
  })
  ctx.body={
    err:0,
    data:citys
  }
})
//获取pname省cname市下的所有区
router.get('/:pname/:cname',ctx=>{
  let {pname,cname}=ctx.params
  let towns=[]
  let temp1=[]
  let temp2=[]
  for(let i=0;i<data.length;i++){
    if(data[i].region.name==pname){
      temp1=data[i].region.state
      break
    }
  }
  for(let i=0;i<temp1.length;i++){
    if(temp1[i].name==cname){
      temp2=temp1[i].city
      break
    }
  }
  temp2.forEach((item,index)=>{
    towns.push(item.name)
  })
  ctx.body={
    err:0,
    data:towns
  }
})
module.exports = router
