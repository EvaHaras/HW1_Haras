
const fs = require("fs")

fs.readFile("source.txt", "utf8", (errorReadSource, dataReadSource)=>{
    if(errorReadSource){
    
        console.error("помилка при читанні файлу source.txt:", errorReadSource)
    }else{
      
        console.log("дані з файлу source.txt",dataReadSource)
        
        fs.writeFile('copy.txt', dataReadSource , (errorWriteCopy)=>{
            if(errorWriteCopy){
                
                console.error("помилка при записі у файл copy.txt:",errorWriteCopy)
            }else{
               
                console.log("дані з файлу source.txt записані у файл copy.txt")
              
                fs.readFile("copy.txt","utf8",(errorReadCopy, dataReadCopy)=>{
                    if(errorReadCopy){
                      
                        console.error("помилка при читанні файлу copy.txt:", errorReadCopy)
                    }else{
                       
                        console.log("дані з файлу copy.txt",dataReadCopy)
                    }
                })
            }
        })
    }
})

//можливо ще скопіювати через copyFile

fs.copyFile("source.txt", "copy.txt", (err) => {
    if (err) {
      console.error('помилка копіювання:', err);
    } else {
      console.log('файл скопійовано');
    }
  });