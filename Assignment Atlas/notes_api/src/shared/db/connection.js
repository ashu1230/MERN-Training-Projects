import mongoose from 'mongoose';
//console.log('DB URL is ', process.env.DBURL);
export function createConnection(){
const promise = mongoose.connect(process.env.DBURL,{maxPoolSize:5});
    promise.then(data=>{
        console.log('DB URL is ', process.env.DBURL);
        console.log('Connection Created...');
        
    }).catch(err=>{
        console.log('Error in Connection ', err);
        throw err;
    });
}
//export default mongoose;    
// export const connection = (request , response, next)=>{
//     const promise = mongoose.connect(process.env.DBURL,{maxPoolSize:5});
//     promise.then(data=>{
//         console.log('Connection Created...');
//         next();
//     }).catch(err=>{
//         console.log('Error in Connection ', err);
//         throw err;
//     });
   
// }

