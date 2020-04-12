import {postCommentInPod} from "../../services/PODExtractor"
const dateFormat = require('dateformat')

export function getEmptyCommentsJsonString(){
    let emptyCommentsFile = {
        "@context": {
            "@version": 1.1,
            "comments": {
                "@container": "@list",
                "@id": "viade:comments"
            },
            "comment":{
                "@id": "viade:comment",
                "@type": "@id"
            },
            "dateCreated": {
                "@id": "viade:dateCreated",
                "@type": "xsd:date"
            },
            "text": {
                "@id": "viade:text",
                "@type": "xsd:string"
            },
            "viade": "http://arquisoft.github.io/viadeSpec/",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
        },
        "comments": []
    
    }
    return emptyCommentsFile;
}

function getCommentJson(){
    let date = new Date()
    date = dateFormat(date, "yyyy-mm-dd h:MM:ss TT");
    let comment = {
        "text": "This is just a example !!",
        "dateCreated": date
    }
    return comment;
}

export function postNewComment(text, routeCommentsFileURI, callback){
    let jsonSkeleton = getCommentJson();
    jsonSkeleton.text = text;
    postCommentInPod(jsonSkeleton, routeCommentsFileURI, callback)


    

}
