import Cookie from 'js-cookie';
import { SAVE_FORM_DATA } from '../constants/FormConstant';


interface FormStateI {
data:any | null;
}

const DEFAULT_STATE :FormStateI ={
data:JSON.parse(localStorage.getItem('formData') || '')
};

const FormReducer = (
  state:FormStateI = DEFAULT_STATE,
  action:any ): FormStateI =>{
  switch (action.type) {
    case SAVE_FORM_DATA:
      localStorage.setItem('formData',JSON.stringify(action.payload));
      return { data:action.payload };
    default:
      return state;
  }
};

export default FormReducer;
