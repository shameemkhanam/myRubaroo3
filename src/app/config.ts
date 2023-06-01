export let config={
    //doctors
    API_AUTH_URL : 'https://myrubaruapi.dev.pacewisdom.in/pharma/authenticate',
    API_TOT_DOCS: 'https://myrubaruapi.dev.pacewisdom.in/user/countForDoctors',
    API_SURVEYS: 'https://myrubaruapi.dev.pacewisdom.in/survey/getCountofSurveys',
    API_PHARMA_ADMIN: 'https://myrubaruapi.dev.pacewisdom.in/survey/getCountsForPharmaAndAdmin',
    API_ALL_DOCTORS_LIST: 'https://myrubaruapi.dev.pacewisdom.in/user/getAlldoctors?page=1&limit=50/',
    // API_ALL_DOCTORS_LIST: 'https://myrubaruapi.dev.pacewisdom.in/user/getAlldoctors',
    API_SPECIALITIES: 'https://myrubaruapi.dev.pacewisdom.in/masters/getSepcialities',
    API_LOCATION:'https://myrubaruapi.dev.pacewisdom.in/masters/getCityAndStates',
    API_UPDATED_PROFILE: 'https://myrubaruapi.dev.pacewisdom.in/user/getAllUpdatedProfile?page=1&limit=50',
    API_QUALIFICATIONS:'https://myrubaruapi.dev.pacewisdom.in/masters/getQualifications',
    API_DOCTORS_NOT_VERIFIED: 'https://myrubaruapi.dev.pacewisdom.in/user/getAlldoctorsFilter?cityName=&specialisation=null&page=1&limit=50&createdAt=&isVerified=false',
    API_ALL_DOCTORS_FILTER:'https://myrubaruapi.dev.pacewisdom.in/user/getAlldoctorsFilter',
    API_UPDATE_DOCTOR:'https://myrubaruapi.dev.pacewisdom.in/user/update',

    //brand messages
    // API_ALL_QUESTIONS:'https://myrubaruapi.dev.pacewisdom.in/survey/getAllQuestions?page=1&limit=50',
    API_ALL_QUESTIONS:'https://myrubaruapi.dev.pacewisdom.in/survey/getAllQuestions',

    API_ALL_ANSWER_TYPES:'https://myrubaruapi.dev.pacewisdom.in/masters/getAllAnswerType',
    API_ALL_ACTIVE_PHARMA:'https://myrubaruapi.dev.pacewisdom.in/pharma/getAllActivePharma',
    API_CREATE_QUESTION:'https://myrubaruapi.dev.pacewisdom.in/questions/createQuestion',
    // API_UPDATE_QUESTION:'https://myrubaruapi.dev.pacewisdom.in/questions/645f75ea59e77400387a12ba/updateQuesions',
    API_UPDATE_QUESTION:'https://myrubaruapi.dev.pacewisdom.in/questions/',

    API_SAVE_AUDIT:'https://myrubaruapi.dev.pacewisdom.in/audit/saveAudit',
    API_DELETE_QUESTION:'https://myrubaruapi.dev.pacewisdom.in/questions/delete/'

};