import * as PostApi from '../api/PostRequest'


export const getTimeLinePosts =(id)=>async(dispatch)=>{
    dispatch({type:"RETREIVING_START"})
    try {
        
        await PostApi.getTimeLinePosts(id)
        dispatch({type:"RETREIVING_SUCCESS"})
    } catch (error) {
        dispatch({type:"RETREIVING_FAIL"})
        console.log(error)

    }
}