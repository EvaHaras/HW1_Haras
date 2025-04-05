const fs = require('fs')

fs.readFile("oldFile.txt", "utf8", (error, data)=>{
    if(error){
        console.log({error})
    }else{
        const newText = data.replaceAll("Node", "NODE.JS")
        console.log({newText})
        fs.writeFile("newFile.txt", newText, (errorNewText)=>{
            if(errorNewText){
                console.log({errorNewText})
            }else{
                console.log('done')
            }
        })
    }
})