import { useState } from "react";



const useInput = (initialState) => {

    const [userName , setName] = useState(initialState);
    const [userId , setUserId] = useState(initialState);
    const [userPassword , setUserPassword] = useState(initialState);
    const [checkPassword , setCheckPassword] = useState(initialState);
    const [userEmail , setUserEmail] = useState(initialState);


    const onChangeValue = (e) => {
        const userInput = e.target;

        switch (userInput.id) {
            case "user-form__name" :
                setName(userInput.value);
                break;
            case "user-form-id" :
                setUserId(userInput.value);
                break;
            case "user-form-pw" :
                setUserPassword(userInput.value);
                break;
            case "user-form__pw-check" :
                setCheckPassword(userInput.value);
                break;
            case "user-form__email" :
                setUserEmail(userInput.value);
                break;
            default:
        }
    }

    return [
        userName,
        userId,
        userPassword,
        checkPassword,
        userEmail,
        onChangeValue
    ];
}


export default useInput;