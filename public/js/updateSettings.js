import axios from 'axios';

import { showAlert } from './alert';

export const updateSettings = async (data , type) =>

{
    try

    {
        const url = type === 'password' ? '/api/v1/users/updatePassword' : '/api/v1/users/updateMe';

        const res = await axios({


            method : 'PATCH',
    
            url,
    
            data: data
    
    
        })

        const photo = await res.data.data.user.photo;

        if(photo)

        {
            document.querySelector('.nav__user-img').src = `/img/users/${photo}`;

            document.querySelector('.form__user-photo').src = `/img/users/${photo}`;
        }

        if(res.data.status === 'success')
        
        {
            showAlert('success' , `${type.toUpperCase()} Updated Successfully`);
        }
    }

    catch(err)

    {
        // showAlert('error' , 'There Was Error Updating User Data');

        showAlert('error' , err.response.data.message);
    }
}