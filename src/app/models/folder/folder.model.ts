interface FileInterface{
    ID:number,
    fileName:string,
}

interface Folder{
    ID:number,
    nameFolder : string,
    files:FileInterface[]
}

export{FileInterface,Folder}