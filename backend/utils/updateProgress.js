exports.updateProgress=async (courseId,courseSubItemId,currentUser)=>{
    try{        
        let coursesProgress=currentUser.coursesProgress; 
        if(!coursesProgress)
            currentUser.coursesProgress={};
        let currentSubItemProgress=coursesProgress.get(courseId);
        if(!currentSubItemProgress)
            coursesProgress.set(String(courseId),String(courseSubItemId));
        else if(currentSubItemProgress.includes(String(courseSubItemId)))
            return;
        else{                        
            currentSubItemProgress=currentSubItemProgress.concat(' ',String(courseSubItemId));
            coursesProgress.set(String(courseId),String(currentSubItemProgress));
        }
        await currentUser.save();        
    }
    catch (err)
    {console.log(err);}
}