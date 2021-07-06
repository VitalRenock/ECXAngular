export interface Note {
    id? : number
    title? : string
    isPublic? : boolean
    reviewState? : string
    reviewCommentary? : string
    parentNote_Id? : number
    user_Id? : number
    category_Id? : number
}