// //async
// const fs = require('fs');
// const f = fs.readFile("./explanation.txt", "This file was created to explain the code completion task.",(err,result)=>{
//     if(err){
//         console.log("Error found",err);
//     }else{
//         console.log("File created successfully");
//     }
// });
// // console.log("File created successfully");
// fs.appendFileSync("./explanation.txt",newData().getData().toLocaleString());
// fs=cpsync("./explanation.txt","explanantioncopy.txt");

// console.log(fs.statSync("./explanation.txt"));
// fs.mkdirSync("ABC");


// fs.readdir

//What sir sent in class
const fs = require("fs");
// Create and Write to a File
// Sync
// fs.writeFileSync("./explain.txt", "Hello World!");

// Async
// fs.writeFile("./explain.txt", "Hello World Again!", (err) => {});

// Read File
// Sync
// const result = fs.readFileSync("./unknown.txt", "utf8");
// console.log(result);

// async
// fs.readFile("./unknown.txt", "utf8", (err, result) => {
//     if (err) {
//         console.log("Error", err);
//     }   else{
//         console.log(result);
//     }
// });

// To be print present date in explain.txt file
// fs.appendFileSync("./explain.txt", new Date().getDate().toLocaleString());
// fs.appendFileSync("./explain.txt", `${Date.now()} Hey There! \n `);

// copy file
// fs.cpSync("./explain.txt", "./explain_copy.txt");

// delete file
// fs.unlinkSync("./explain_copy.txt");

// Getting File/Directory Statistics
// console.log(fs.statSync("./explain.txt"));
// console.log(fs.statSync("./explain.txt").isFile());

// create directory
//fs.mkdirSync("./NewFolder");

// Removing Directories
// fs.rmdirSync("./NewFolder");

// Reading Directory with File Details
fs.readdir("./", (err, files) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Files", files);
    }
});